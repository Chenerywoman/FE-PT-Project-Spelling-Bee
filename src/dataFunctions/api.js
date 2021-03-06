const API_URL = process.env.REACT_APP_API_URL;

export const findYears = () => {
    const url = `${API_URL}/years`
    return fetch(url)
        .then(res => {
            if (res.status === 404) throw new Error(res.statusText)
            else return res.json()
        })
        .then(res => res)
}

export const findCategoriesByYear = (year) => {
    const url = `${API_URL}/categories?year=${year}`
    return fetch(url)
        .then(res => {
            if (res.status === 404) throw new Error(res.statusText)
            else return res.json()
        })
}

export const findCategory = (category) => {
    const url = `${API_URL}/categories/${category.toLowerCase()}`
    return fetch(url)
        .then(res => {
            if (res.status === 404) throw new Error(res.statusText)
            else return res.json()
        })
        .then(res => res.category[0])
}

export const findList = (category) => {
    const url = `${API_URL}/${category.toLowerCase()}`
    return fetch(url)
        .then(res => {
            if (res.status === 404) throw new Error(res.statusText)
            else return res.json()
        })
        .then(res => res)
}

export const findWords = (category, letters) => {
    const label = category.endsWith('es') ? category.match(/\w+(?=es)/)[0].toLowerCase() : category.match(/\w+(?=s)/)[0].toLowerCase();
    const url = `${API_URL}/${category.toLowerCase()}?${label}=${letters}`
    return fetch(url)
    .then(res => {
        if (res.status === 404) throw new Error(res.statusText)
        else return res.json()
    })
    .then(({words}) => words)
} 