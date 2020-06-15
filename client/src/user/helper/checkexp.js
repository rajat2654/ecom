import jwtDecode from "jwt-decode"
import { signout } from "../../auth/helper"

const checkTokenExpirationMiddleware = async (next) => {
    const token =
        JSON.parse(localStorage.getItem("jwt")) &&
        JSON.parse(localStorage.getItem("jwt")).token
    if (jwtDecode(token).exp < Date.now() / 1000) {
        signout(() => {
            alert("Your session expired")
        })
        next()
    }
}

export default checkTokenExpirationMiddleware