function mult(a, b) {
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