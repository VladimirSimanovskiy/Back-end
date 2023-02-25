class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function notZero(num) {
  if (num == '0' || num == 0) {
    throw new ValidationError('Делитель не может быть равен 0')
  }
  return num;
}

class LongInt {
  constructor() {
    this.name = 'longInt';
  }

  add(a, b) {
    let signA;
    let signB;
    if (a[0] == '-') {
      signA = '-';
      a = a.slice(1);
    } else {
      signA = '';
    }
    if (b[0] == '-') {
      signB = '-';
      b = b.slice(1);
    } else {
      signB = '';
    }

    if (signA == '-' && signB == '') return this.sub(b, a);
    if (signA == '' && signB == '-') return this.sub(a, b);

    let maxLen = (a.length > b.length) ? a.length : b.length;

    let revA = a.split('').reverse();
    let revB = b.split('').reverse();
    let result = [];

    for (let i = 0, num = 0, exc = 0; i < maxLen; i++) {
      num = (+revA[i] || 0) + (+revB[i] || 0) + exc;
      if (num >= 10) {
        exc = 1;
        result[i] = num - 10;
      } else {
        exc = 0;
        result[i] = num;
      }
    }
    if (signA == '-' && signB == '-') {
      return '-' + result.reverse().join('');
    }
    return result.reverse().join('');
  }

  sub(a, b) {
    function minimax(a, b) {
      if (a.length == b.length) {
        for (let i = 0; i < a.length; i++) {
          if (a[i] == b[i]) {
            continue;
          } else {
            let max = (a[i] > b[i]) ? a : b;
            let min = (a[i] > b[i]) ? b : a;
            return {max: max, min: min};
          }
        }
      } else {
        let max = (a.length > b.length) ? a : b;
        let min = (a.length > b.length) ? b : a;
        return {max: max, min: min};
      }
      return {max: a, min: b};
    }
    if (a == b) return '0';

    let signA;
    let signB;
    if (a[0] == '-') {
      signA = '-';
      a = a.slice(1);
    } else {
      signA = '';
    }
    if (b[0] == '-') {
      signB = '-';
      b = b.slice(1);
    } else {
      signB = '';
    }

    if (signA == '' && signB == '-') return this.add(a, b);
    if (signA == '-' && signB == '') return this.add('-' + a, '-' + b);

    let minmax = minimax(a, b)

    let max = minmax.max.split('').reverse();
    let min = minmax.min.split('').reverse();
    let result = [];

    for (let i = 0, num = 0, les = 0; i < max.length; i++) {
      num = +max[i] - (+min[i] || 0) + les;
      if (num < 0) {
        les = -1;
        result[i] = num + 10;
      } else {
        les = 0;
        result[i] = num;
      }
    }

    return (minmax.max == a && signA == '') ? result.reverse().join('').replace(/^0+/, '') : '-' + result.reverse().join('').replace(/^0+/, '');
  }

  mult(a, b) {
    if (a == '0' || b == '0') return '0';

    let [sign, x, y] = (a[0] == '-') 
    ? ((b[0] == '-') ? ['', a.slice(1), b.slice(1)] : ['-', a.slice(1), b]) 
    : ((b[0] == '-') ? ['-', a, b.slice(1)] : ['', a, b]);

    x = x.split('').reverse();
    y = y.split('').reverse();

    let result = [];

    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < y.length; j++) {
        let num = x[i] * y[j];
        result[i + j] = (result[i + j]) ? result[i + j] + num : num; 
      }
    }

    for (let k = 0; k < result.length; k++) {
      let digit = result[k] % 10;
      let next = Math.floor(result[k] / 10);
      result[k] = digit;

      if (result[k + 1]) {
        result[k + 1] += next;
      } else if (next != 0) {
          result[k + 1] = next;
        }
      }
      return sign + result.reverse().join('');
    }
  
    div(a, b) {
      try {
        b = notZero(b);
      } catch (err) {
        if (err instanceof ValidationError) {
          return ('InvalidValue: ' + err.message);
        }
      }

      function compare(num1, num2) {
        if (num1.length > num2.length) return true;
        else if (num1.length < num2.length) return false;

        for (let i = 0; i < num1.length; i++) {
          if (+num1[i] == +num2[i]) {
            continue;
          } else {
            return (+num1[i] > +num2[i]);
          }
        }
        return true;
      }

      if (a == '0' || a == 0) return '0';
      if (b == '1' || b == 1) return a;

      let [sign, x, y] = (a[0] == '-') 
      ? ((b[0] == '-') ? ['', a.slice(1), b.slice(1)] : ['-', a.slice(1), b]) 
      : ((b[0] == '-') ? ['-', a, b.slice(1)] : ['', a, b]);

      if (!compare(x, y)) return `${sign}0 (остаток: ${x})`;

      let xSlice = x[0];
      let xEnding = x.slice(1);
      let result = [];

      while (!compare(xSlice, y)) {
        xSlice += String(xEnding[0]);
        xEnding = xEnding.slice(1);
      } 

      let counter;

      for (let i = 0, flag = xEnding.length; i <= flag; i++) {
        counter = 1;
        while ( compare(xSlice, this.mult(y, String(counter))) ) {
          counter++;
        }
        result.push(counter - 1);
        if (xEnding.length > 0) {
          xSlice = this.sub(xSlice, this.mult(y, String(counter - 1))) + xEnding[0];
        } else {
          xSlice = this.sub(xSlice, this.mult(y, String(counter - 1)));        }
        
        xEnding = xEnding.slice(1);
      }

      return (+xSlice) ? (`${sign + result.join('')} (остаток: ${xSlice.replace(/^0+/, '')}) `) 
                      : sign + result.join('');
    }
}
