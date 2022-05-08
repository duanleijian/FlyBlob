import Cookies from 'js-cookie'

const TokenKey = window.location.hostname + window.location.port + 'dlj'

export function get() {
  return Cookies.get(TokenKey)
}

export function set(val, expires) {
  return Cookies.set(TokenKey, val, {expires})
}

export function remove() {
  return Cookies.remove(TokenKey)
}
