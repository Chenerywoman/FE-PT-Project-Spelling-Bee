exports.notYear = (years, num) => {
    if (years.find(year => year.year === +num) === undefined) return true
    else return false

}