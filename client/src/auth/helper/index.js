import checkTokenExpirationMiddleware from "../../user/helper/checkexp"

export const signup = async user => {
    try {
        const response = await fetch(`/api/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}

export const signin = async user => {
    try {
        const response = await fetch(`/api/signin`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        return response.json()
    }
    catch (error) {
        return console.log(error)
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const signout = async (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next()
    }

    try {
        const response = await fetch(`/api/signout`, {
            method: "GET"
        })
        return console.log("Signout success")
    }
    catch (error) {
        return console.log(error)
    }

}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    return false
}

export const updateUser = async (userId, user, token) => {
    try {
        await checkTokenExpirationMiddleware(() => {
            throw new Error("Signin again")
        })
        const response = await fetch(`/api/user/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application form",
                Authorization: `Bearer ${token}`
            },
            body: user
        })
        return response.json()
    } catch (error) {
        return console.log(error)
    }
}