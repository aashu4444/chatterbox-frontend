export const config = {
    backend_host: "http://127.0.0.1:8000",
    site_name: "ChatterBox",
}

export const url = given_url => {
    return `${config.backend_host}${given_url}`;
}

export const loggedin = () => {
    const auth_token = localStorage.getItem("auth_token");

    if (auth_token !== null || auth_token !== ""){
        return true;
    }

    return false;
}