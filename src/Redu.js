function generateRandomNumber() {
    return Math.floor(Math.random() * (20 - 1 + 1) + 1)
}

export default function populate() {
    let array = [];
    let usedNumbers = [];
    let i = 0;
    while (i < 10) {
        let random = generateRandomNumber();
        if (!usedNumbers.includes(random)) {
            usedNumbers.push(random)
            array.push(random);
            array.push(random);
            i++;
        }
    }
    shuffle(array);
    return array;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}