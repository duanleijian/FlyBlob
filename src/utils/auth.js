const tokenKey = window.location.hostname +  window.location.port + 'dlj'
const userKey = 'UNIQUE_DUAN_LEI_JIAN'
export function getToken() {
    const result = localStorage.getItem(tokenKey)
    return result? result : null
}

export function hasToken() {
    const result = localStorage.getItem(tokenKey)
    return result? true : false
}

export function setToken(token) {    
    localStorage.setItem(tokenKey, token)
}

export function delToken() {
    localStorage.removeItem(tokenKey)
}

export function setUser(data) {
    localStorage.setItem(userKey, JSON.stringify(data))
}

export function getUser() {
    const result = localStorage.getItem(userKey)
    return result? JSON.parse(result) : null
}

export function delUser() {
    localStorage.removeItem(userKey)
}