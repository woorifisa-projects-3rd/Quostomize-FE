import { getCsrfToken } from "next-auth/react";
import { auth, update } from "../../auth";
import { NextResponse } from "next/server";

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

    // accessToken refresh 요청
    async refreshToken() {
        console.log("refresh 요청!")
        try {
            const session = await auth();
            const refreshToken = await session.refreshToken;
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
            if (response.status >= 400) {
                return NextResponse.json({}, {status: 400})
            }
            // 새로운 토큰을 받아서 세션 업데이트
            console.log("이전 refreshTOken");
            console.log(refreshToken);
            console.log("새 refreshToken")
            console.log(newRefreshToken)
            console.log("업데이트 요청 보낼 거임");
            await fetch(`${NEXT_URL}/api/auth/session`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        csrfToken: await getCsrfToken(),
                        data: {
                            accessToken: result.accessToken,
                            refreshToken: newRefreshToken 
                        }
                    }
                )
            })
            
            return NextResponse.json({}, {status: 200});
        } catch (error) {
            console.error("Token refresh failed:", error.json());
            return NextResponse.json({}, {status: 400})
        }
    }

    async handleRequest(endpoint, options) {
        try {
            const authHeader = await this.getAuthHeader();
            const response = await fetch(this.serverUrl + endpoint, {
                ...options,
                headers: {
                    ...this.header,
                    ...authHeader,
                    ...options.headers,
                }
            });

            // 응답이 JSON이 아닐 수 있으므로 미리 클론
            const responseClone = response.clone();
            
            try {
                const data = await response.json();
                console.log(data);
                // 토큰 만료 에러 체크
                if (data.code) {
                    // 이미 리프레시 진행 중이면 대기
                    if (this.isRefreshing) {
                        return new Promise((resolve) => {
                            this.failedRequests.push(() => {
                                resolve(this.handleRequest(endpoint, options));
                            });
                        });
                    }

                    this.isRefreshing = true;
                    const refreshed = await this.refreshToken();
                    this.isRefreshing = false;

                    if (refreshed) {
                        // 실패했던 요청들 재시도
                        this.failedRequests.forEach(callback => callback());
                        this.failedRequests = [];
                        
                        // 현재 요청 재시도
                        return this.handleRequest(endpoint, options);
                    } else {
                        // 리프레시 실패 시 로그인 페이지로 리다이렉트
                        return NextResponse.json({}, {status:400});
                    }
                }
            } catch (e) {
                // JSON 파싱 에러는 무시하고 원본 응답 반환
                return responseClone;
            }

            return responseClone;
        } catch (error) {
            console.error("Request failed:", error);
            throw error;
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