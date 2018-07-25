
export const notYear = (years, num) => {
    if (years.find(year => year.year === +num) === undefined) return true
    else return false
}


export const chunkArray = (array, chunk) => {

    const newArray = [...array]

    let results = [];
    
    while (newArray.length) {
        results.push(newArray.splice(0, chunk));
    }
    
    return results;
}

export const checkSpelling = (spelling, correctSpelling) => {

    const spellingArray = spelling.split('');
    const correctSpellingArray = correctSpelling.split('');

    return spellingArray.map((letter, ind) => {
        if (letter !== correctSpellingArray[ind]) { return {letter: letter, correct: false } }
        else return {letter: letter, correct: true} ;
    })

}

export const homophonesMaker = () => {

 const homophones = ['accept', 'except', 'affect', 'effect', 'ball', 'bawl', 'berry', 'bury', 'brake', 'break', 'fair', 'fare', 'grate', 'great', 'grown', 'groan','here', 'hear', 'heel', 'heal', 'heal', 'he"ll', 'he"ll': 'heel', 'knot', 'not', 'mail', 'male', 'main', 'mane', 'meat', 'meet', 'medal', 'meddle', 
 'missed', 'mist', 'peace', 'piece', 'plain', 'plane', 'rain', 'rein', 'rein', 'reign', 'reign', 'rain','scene', 'seen', 'weather', 'whether', 'whose', 'who"s']

const homophonesObjects =  homophones.map((word, ind) => {
    return {_id: ind, word}
})

return homophonesObjects;

}