export default function populate(gameName) {
    switch (gameName){
        case "FP": return findPairsPopulate();
        case "RT": return setRandomTime();
        case "TT": return setRandomText();
        default: return;
        }
}

function setRandomText(){
    var randomWords = require('random-words')
    return randomWords(400);
}

function findPairsPopulate(){
    let array = [];
        let usedNumbers = [];
        let i = 0;
        while(i<10){
            let random = generateRandomNumber(20, 1);
                if(!usedNumbers.includes(random)){
                    usedNumbers.push(random)
                    array.push(random);
                    array.push(random);
                    i++;
                }
        }
        shuffle(array);
        return array;
}

function setRandomTime(){
    return generateRandomNumber(2, 5);
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

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
