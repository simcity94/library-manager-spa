import { userHelper } from "../utility/userHelper.js";

async function requester(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if(userHelper.hasUser()) {
        options.headers["X-Authorization"] = userHelper.getAccessToken();
    }

    if (data) {
        options.headers["Content-type"] = 'application/json'
        options.body = JSON.stringify(data);
    }

    try {
        
        const response = await fetch(url, options)
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message)
        }

        if (response.status === 204) {
            return response;
        }

        return await response.json();

    } catch (error) {
        alert(error.message);
    }
}

async function get(url) {
    return await requester("GET", url);
}

async function post(url, data) {
    return await requester("POST", url, data);
}

async function update(url, data) {
    return await requester('PUT', url, data);
}

async function del(url) {
    return await requester("DELETE", url);
}

export const api = {
    get,
    post,
    update,
    del
}