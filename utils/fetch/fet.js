class CustomFetch {
    serverUrl;

    constructor(serverUrl) {
        this.serverUrl = serverUrl;
    }

    get = async (endpoint) => {
        const response = await fetch(this.serverUrl+endpoint, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store"
        })

        return response;
    }

    post = async (endpoint, data) => {
        const response = await fetch(this.serverUrl+endpoint, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store",
            body: JSON.stringify(data)
        })

        return response;
    }

    patch = async (endpoint, data) => {
        const response = await fetch(this.serverUrl+endpoint, {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store",
            body: JSON.stringify(data)
        })

        return response;
    }

    delete = async (endpoint) => {
        const response = await fetch(this.serverUrl+endpoint, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store",
        })

        return response;
    }
}

export const fet = new CustomFetch(process.env.SERVER_URL);