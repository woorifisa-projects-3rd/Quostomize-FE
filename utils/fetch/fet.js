import { auth } from "../../auth";

class CustomFetch {
    serverUrl;
    session;
    header;

    constructor(serverUrl) {
        this.serverUrl = serverUrl;
        this.header = {
            "Content-Type": "application/json",
        };
    }

    init = async() => {
        try {
            const session = await auth();
            if (session) {
                this.session = session;
                this.header["Authorization"] = `Bearer ${session.accessToken}`;
            }
        } catch (error) {
            console.error("아직 로그인하지 않았습니다.", error);
        }
    }

    get = async (endpoint) => {
        console.log(this.session);
        const response = await fetch(this.serverUrl+endpoint, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: this.header,
            cache: "no-store"
        })
        console.log(response);

        return response;
    }

    post = async (endpoint, data) => {
        const response = await fetch(this.serverUrl+endpoint, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: this.header,
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
            headers: this.header,
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
            headers: this.header,
            cache: "no-store",
        })

        return response;
    }
}


export const initFet = async () => {
    const Fet = new CustomFetch(`${process.env.SERVER_URL}`)
    try {
        const session = await auth();
        console.log(session)
        if (session && session.accessToken) {
          Fet.header['Authorization'] = `Bearer ${session.accessToken}`;
        }
    } catch (error) {
        console.error('Session initialization error:', error);
    }
    return Fet;
};