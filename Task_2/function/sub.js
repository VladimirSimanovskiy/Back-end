function sub(a, b) {
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