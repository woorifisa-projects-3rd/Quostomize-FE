import { auth } from "../../auth";

class CustomFetch {
    serverUrl;
    header;

    constructor(serverUrl) {
        this.serverUrl = serverUrl;
        this.header = {
            "Content-Type": "application/json",
        };
    }

    // 매 요청마다 최신 토큰을 가져오는 메서드
    async getAuthHeader() {
        try {
            const session = await auth();
            return session?.accessToken 
                ? { "Authorization": `Bearer ${session.accessToken}` }
                : {};
        } catch (error) {
            console.error("Failed to get auth token:", error);
            return {};
        }
    }

    get = async (endpoint) => {
        const authHeader = await this.getAuthHeader();
        const response = await fetch(this.serverUrl + endpoint, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                ...this.header,
                ...authHeader,
            },
            cache: "no-store"
        });
        return response;
    }

    post = async (endpoint, data) => {
        const authHeader = await this.getAuthHeader();
        const response = await fetch(this.serverUrl + endpoint, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                ...this.header,
                ...authHeader,
            },
            cache: "no-store",
            body: JSON.stringify(data)
        });
        return response;
    }

    patch = async (endpoint, data) => {
        const authHeader = await this.getAuthHeader();
        const response = await fetch(this.serverUrl + endpoint, {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
            headers: {
                ...this.header,
                ...authHeader,
            },
            cache: "no-store",
            body: JSON.stringify(data)
        });
        return response;
    }

    delete = async (endpoint) => {
        const authHeader = await this.getAuthHeader();
        const response = await fetch(this.serverUrl + endpoint, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                ...this.header,
                ...authHeader,
            },
            cache: "no-store",
        });
        return response;
    }
}

export const initFet = async () => {
    return new CustomFetch(`${process.env.SERVER_URL}`);
};