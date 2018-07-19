
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