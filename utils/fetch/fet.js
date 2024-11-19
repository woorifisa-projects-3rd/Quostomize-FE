import { auth, unstable_update } from "../../auth";
import { NextResponse } from "next/server";

class CustomFetch {
    serverUrl;
    header;
    isRefreshing = false;
    failedRequests = [];
    
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

    // accessToken refresh 요청
    async refreshToken() {
        console.log("refresh 요청!")
        try {
            const session = await auth();
            const refreshToken = await session.refreshToken;
            const accessToken = await session.accessToken;
            if (!refreshToken) {
                // 리프레시 실패 시 로그인 페이지로 리다이렉트
                return NextResponse.json({}, {status: 400})
            }
            console.log("요청 보낼 거야")
            const response = await fetch(this.serverUrl + "/v1/api/auth/reissue", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `refreshToken=${refreshToken}`,
                },
                credentials:"include"
            });
            
            
            const setCookie = response.headers.get("set-cookie").split(";");
            const newRefreshToken = setCookie[0].split("=")[1];
            const result = await response.json();

            const newAccessToken = result.accessToken;
            // 새로운 토큰을 받아서 세션 업데이트
            console.log("이전 refreshTOken");
            console.log(refreshToken);
            console.log("새 refreshToken")
            console.log(newRefreshToken)
            console.log("이전 accessToken")
            console.log(accessToken)
            console.log("새 accessToken")
            console.log(newAccessToken);

            await unstable_update({
                ...session,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            })
            
            return NextResponse.json({}, {status: 200});
        } catch (error) {
            console.error("Token refresh failed:", error.json());
            return NextResponse.json({}, {status: 400})
        }
    }

    async handleRequest(endpoint, options) {
        try {
            // If a refresh is in progress, wait for it
            if (this.isRefreshing) {
                return new Promise((resolve, reject) => {
                    this.failedRequests.push({ resolve, reject, endpoint, options });
                });
            }

            const authHeader = await this.getAuthHeader();
            console.log("최신 헤더")
            console.log(authHeader);
            const session = await fetch(`${process.env.NEXT_URL}/api/auth/session`);
            const res = await session.json();
            console.log(res);
            const response = await fetch(this.serverUrl + endpoint, {
                ...options,
                headers: {
                    ...this.header,
                    ...authHeader,
                    ...options.headers,
                }
            });

            const responseClone = response.clone();
            
            try {
                const data = await response.json();
                
                // Token expired error
                if (data.code === "T-001") {
                    this.isRefreshing = true;
                    const refreshResult = await this.refreshToken();

                    if (refreshResult) {
                        // Retry original request and other failed requests
                        const retryRequests = [
                            { endpoint, options },
                            ...this.failedRequests
                        ];

                        const results = await Promise.all(
                            retryRequests.map(req => 
                                this.handleRequest(req.endpoint, req.options)
                            )
                        );

                        this.failedRequests = [];
                        this.isRefreshing = false;

                        return results[0]; // Return original request result
                    } else {
                        // Refresh failed, redirect to login or handle error
                        return NextResponse.redirect(new URL('/login', request.url));
                    }
                }

                return responseClone;
            } catch (e) {
                return responseClone;
            }
        } catch (error) {
            console.error("Request failed:", error);
            throw error;
        } finally {
            this.isRefreshing = false;
        }
    }

    get = async (endpoint) => {
        return this.handleRequest(endpoint, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            cache: "no-store"
        });
    }

    post = async (endpoint, data) => {
        return this.handleRequest(endpoint, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            cache: "no-store",
            body: JSON.stringify(data)
        });
    }

    patch = async (endpoint, data) => {
        return this.handleRequest(endpoint, {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
            cache: "no-store",
            body: JSON.stringify(data)
        });
    }

    delete = async (endpoint) => {
        return this.handleRequest(endpoint, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            cache: "no-store",
        });
    }
}

export const initFet = async () => {
    return new CustomFetch(`${process.env.SERVER_URL}`);
};