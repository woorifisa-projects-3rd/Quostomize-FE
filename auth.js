import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        memberLoginId: {label: "아이디", type: "text", placeholder:"아이디를 입력해주세요."},
        memberPassword: {label: "비밀번호", type: "text"},
      },
      async authorize(credentials, req) {
          const response = await fetch(
            `${process.env.NEXT_URL}/api/auth/login`,
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
          const result = await response.json();
          console.log(result);
          
          return {
            id: result.accessToken,
            name: credentials.memberLoginId,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            maxAge: result.maxAge,
            expires: result.expires,
            path: result.path,
            };
      }
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60*30
  },

  callbacks: {
    async jwt({token, user, session, trigger}) {
      // 최초 로그인 시 (user 객체가 존재할 때)
      if (user) {
        console.log("jwt 내부, user 존재")
        console.log(user);
        console.log(user.accessToken);
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }
    
      // 세션 업데이트 시
      if (trigger === "update") {
        console.log("업데이트 일어남");
        return {
          ...token,
          ...session, // 전체 세션 데이터 spread
        };
      }
    
      // 기존 토큰 유지
      return token;
    },
    
    async session({session, token}) {
      console.log("session 관련 실행");
      console.log("기존 session:", session);
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
    
      // 토큰의 모든 정보를 세션에 복사
      return session
    },

    pages: {
      signIn: "/login"
    }
  },
};

export const { signIn, signOut, auth, unstable_update } = NextAuth(authConfig);