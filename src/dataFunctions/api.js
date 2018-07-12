const API_URL = 'http://localhost:3000/api';

exports.getCategory = (category) => {
category = category.toLowerCase()
    const url = `${API_URL}/${category}`
    return fetch(url)
    .then(res => {
        console.log('res after fetch', res)
        // or should this be res.statusText????
        if (res.status === 404) throw {status: res.status}
        else return res.json()
    })
    .then(res => res[category][0])
}