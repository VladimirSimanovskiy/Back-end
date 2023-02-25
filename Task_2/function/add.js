function add(a, b) {
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
