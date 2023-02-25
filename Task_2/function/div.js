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

function div(a, b) {
  /*try {
    b = notZero(b);
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log('InvalidValue: ' + err.message);
    }
  }*/
  if (b == '0' || b == 0) return 'InvalidValue: Делитель не может быть равен 0';

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


  return (+xSlice) ? (`${sign + result.join('')} (остаток: ${xSlice.replace(/^0+/, '')})`) 
                  : sign + result.join('');
}