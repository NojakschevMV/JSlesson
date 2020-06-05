let num = '266219';
let summ;
let iMax = num.length;
let arr = [];
for (var i = 0; i < iMax; i++) {
    arr[i] = num.charAt(i);

}
console.log(arr);
summ = 1;
for (var i = 0; i < iMax; i++) {
    summ = summ*arr[i];

}
console.log(summ);
summ = String(summ**3);
console.log(summ);
console.log(summ.substring(0, 2));