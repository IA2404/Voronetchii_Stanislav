//Напишите функцию, которая находит следующий целочисленный полный квадрат после переданного параметра.
// Если параметр сам по себе не является целым квадратом, то должно вернуться -1.
// Можно предположить, что параметр неотрицательный


function findNextSquare(num) {
    const sqrt = Math.sqrt(num);
    const floor = Math.floor(sqrt);

    if (sqrt != floor) {
        return -1;
    } else {
        const nextnum = (sqrt + 1)
        return nextnum*nextnum;
    }

}

console.log(findNextSquare(121));
console.log(findNextSquare(225));
console.log(findNextSquare(114));