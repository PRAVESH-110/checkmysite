import { apiEndpoints } from "./api";

export async function signinRequest(email: string, password: string) {
    const res = await fetch(apiEndpoints.user.signin, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Signin failed");
    }
    `                                                                                                                                               `
    return res.json();
}

export async function signupRequest(
    email: string,
    password: string,
    fname: string,
    lname: string
) {
    const res = await fetch(apiEndpoints.user.signup, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, fname, lname })
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Signup failed");
    }

    return res.json();
}
