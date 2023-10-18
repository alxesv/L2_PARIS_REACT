export function getUserId () {
    if(localStorage.getItem('userId') === null) {
        return false
    } else {
        return localStorage.getItem('userId')
    }
}