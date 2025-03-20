//Напиши программу, которая анализирует текст
// и выводит статистику по частоте встречаемости слов в нем.
// Программа должна вывести топ-3 слов по частоте,
// и в случае равных частот, вывести их в порядке нахождении в предложении.

//Формат вывода: слово1=N1, слово2=N2, ...

function wordFrequency(text) {
    let lowerText = text.toLowerCase();

    let cleanedText = '';
    for (let i = 0; i < lowerText.length; i++) {
        let char = lowerText[i];
        if ((char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') || char === ' ') {
            cleanedText += char;
        } else {
            cleanedText += ' ';
        }
    }

    let words = cleanedText.split(' ');

    let filteredWords = [];
    for (let i = 0; i < words.length; i++) {
        if (words[i] !== '') {
            filteredWords.push(words[i]);
        }
    }

    let frequency = {};

    let wordOrder = {};
    let order = 0;

    for (let i = 0; i < filteredWords.length; i++) {
        let word = filteredWords[i];

        if (wordOrder[word] === undefined) {
            wordOrder[word] = order;
            order = order + 1;
        }

        if (frequency[word] === undefined) {
            frequency[word] = 1;
        } else {
            frequency[word] = frequency[word] + 1;
        }
    }

    let wordPairs = [];
    for (let word in frequency) {
        wordPairs.push([word, frequency[word], wordOrder[word]]);
    }

    wordPairs.sort(function(a, b) {
        if (a[1] !== b[1]) {
            return b[1] - a[1];
        }

        return a[2] - b[2];
    });

    let result = '';
    let count = 0;
    for (let i = 0; i < wordPairs.length && count < 3; i++) {
        if (count > 0) {
            result += ', ';
        }
        result += wordPairs[i][0] + '=' + wordPairs[i][1];
        count++;
    }

    return result;
}