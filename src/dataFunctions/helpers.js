exports.notYear = (years, num) => {
    console.log('years', typeof years[0].year, 'num', typeof num)

    if (years.find(year => year.year === +num) === undefined) return true
    else return false

}