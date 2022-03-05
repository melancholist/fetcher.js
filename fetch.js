const baseURL = ""; //input base url here

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 60 * 2 * 1000);

export default {
    get: (param, token) => 
        getRequest(`${baseURL}${param}`, token),
    put: (param, token, body) => 
        putRequest(`${baseURL}${param}`, token, body),
    post: (param, token, body) => 
        postRequest(`${baseURL}${param}`, token, body),
}

function handleResponse(response) {
    if (!response.ok && response.status != 200){
        throw response;
    } 
    return response.json();
}

async function getRequest(param, token = null){
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(param, {
                signal: controller.signal,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            const data = await handleResponse(response);
            resolve(data);
        } catch (error) {
            const errorJson = await error.json();
            reject(errorJson);
        } finally {
            clearTimeout(timeoutId);
        }
    });
}

async function putRequest(param, token = null, body = {}){
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(param, {
                signal: controller.signal,
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(body)
            });
            const data = await handleResponse(response);
            resolve(data);
        } catch (error) {
            const errorJson = await error.json();
            reject(errorJson);
        } finally {
            clearTimeout(timeoutId);
        }
    });
}

async function postRequest(param, token = null, body = {}){
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(param, {
                signal: controller.signal,
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(body)
            });
            const data = await handleResponse(response);
            resolve(data);
        } catch (error) {
            const errorJson = await error.json();
            reject(errorJson);
        } finally {
            clearTimeout(timeoutId);
        }
    });
}