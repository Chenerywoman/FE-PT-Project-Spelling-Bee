const API_URL = 'http://localhost:3000/api';

exports.findYears = () => {

    const url = `${API_URL}/years`
    return fetch(url)
    .then(res => {
        if (res.status === 404) throw new Error(res.statusText)
        else return res.json()
    })
    .then(res =>  res)
}

exports.findCategoriesByYear  = (year) => {
    const url = `${API_URL}/categories?year=${year}`
    return fetch(url)
    .then(res => {
        if (res.status === 404) throw new Error(res.statusText)
        else return res.json()
    })
}

exports.findCategory = (category) => {
category = category.toLowerCase()
    const url = `${API_URL}/categories/${category}`
    return fetch(url)
    .then(res => {
        if (res.status === 404) throw new Error(res.statusText)
        else return res.json()
    })
    .then(res => res.category[0])
}

exports.findList = (category) => {
    category = category.toLowerCase()
    const url = `${API_URL}/${category}`
    console.log('url', url)
    return fetch(url)
    .then(res => {
        if (res.status === 404) throw new Error(res.statusText)
        else return res.json()
    })
    .then(res => res)
}