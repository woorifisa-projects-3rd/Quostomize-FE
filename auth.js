import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { redirect } from "next/dist/server/api-utils";

// Redis 또는 다른 저장소를 사용하는 것이 좋지만, 임시로 Map을 사용
// Singleton 패턴으로 토큰 갱신 상태 관리
class TokenRefreshManager {
  static instance;
  refreshPromise;
  lastRefreshTime;

  constructor() {}

  static getInstance() {
    if (!TokenRefreshManager.instance) {
      TokenRefreshManager.instance = new TokenRefreshManager();
    }
    return TokenRefreshManager.instance;
  }

  async refreshToken(token) {
    const currentTime = Date.now();
    
    // 이미 진행 중인 리프레시가 있다면 해당 Promise 반환
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    // 마지막 리프레시로부터 5초 이내라면 현재 토큰 반환
    if (currentTime - this.lastRefreshTime < 5000) {
      return token;
    }

    this.refreshPromise = this.doRefresh(token);
    
    try {
      const result = await this.refreshPromise;
      this.lastRefreshTime = Date.now();
      return result;
    } finally {
      this.refreshPromise = null;
    }
  }

  async doRefresh(token) {
    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/v1/api/auth/reissue`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Cookie: `refreshToken=${token.refreshToken}`
          },
          cache: "no-store",
          credentials: "include"
        }
      );

      if (!response.ok) {
        await signOut({
          redirect: true,
          redirectTo: "/login"
        })
        return;
      }

      const result = await response.json();
      const setCookie = response.headers.get("set-cookie")?.split(";");
      if (!setCookie) throw new Error('No cookie in response');

      const newRefreshToken = setCookie[0].split("=")[1];
      const expires = setCookie[2].split("=")[1];
      const path = setCookie[3].split("=")[1];

      return {
        ...token,
        accessToken: result.accessToken,
        refreshToken: newRefreshToken,
        accessExpires: Date.now() + 1800000,
        refreshExpires: expires,
        path: path,
      };
    } catch (error) {
      console.error('Token refresh failed:', error);
      await signOut({
        redirect: true,
        redirectTo: "/login"
      })
      return;
    }
  }
}

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        memberLoginId: { label: "아이디", type: "text", placeholder: "아이디를 입력해주세요." },
        memberPassword: { label: "비밀번호", type: "text" },
      },
      async authorize(credentials, req) {
        const response = await fetch(
          `${process.env.SERVER_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              memberLoginId: credentials.memberLoginId,
              memberPassword: credentials.memberPassword
            })
          }
        );

        if (response.status >= 400) {
          throw new Error("아이디, 비밀번호를 확인해주세요.")
        }

        const accessToken = response.headers.get("accessToken");
        const setCookie = response.headers.get("set-cookie").split(";");
        const refreshToken = setCookie[0].split("=")[1];
        const expires = setCookie[2].split("=")[1];
        const path = setCookie[3].split("=")[1];

        const user = {
          id: accessToken,
          name: credentials.memberLoginId,
          accessToken: accessToken,
          refreshToken: refreshToken,
          accessExpires: new Date().valueOf() + 1800000,
          refreshExpires: expires,
          path: path,
        }
        
        return user;
      }
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: '/login', // 명시적으로 로그인 페이지 경로 지정
  },

  callbacks: {

    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessExpires: user.accessExpires,
          refreshExpires: user.refreshExpires,
          path: user.path,
        };
      }

      // 토큰 만료 시간 체크
      const currentTime = Date.now();
      if (token.accessExpires && currentTime + 120000 < token.accessExpires) {
        return token;
      }

      // 토큰 리프레시 매니저를 통한 갱신
      try {
        return await TokenRefreshManager.getInstance().refreshToken(token);
      } catch (error) {
        await signOut({
          redirectTo: "login",
          redirect: true
        })
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.accessExpires = token.accessExpires;
        session.refreshExpires = token.refreshExpires;
        session.path = token.path;
        session.error = token.error;
      }
      return session;
    },
  },
};


export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);