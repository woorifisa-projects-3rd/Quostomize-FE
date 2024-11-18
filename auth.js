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
        console.log("authorize 실행")
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
          const accessToken = result.accessToken;
          const refreshToken = result.refreshToken;
          const maxAge = result.maxAge;
          const expires = result.expires;z
          const path = result.path;
          
          return { accessToken, refreshToken, maxAge, expires, path };
      }
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,

  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires = account.expires;
        token.refreshToken = account.refreshToken;
        return token;
      }
      // refresh 전략
      if (Date.now() >= token.expires) {

      }

      return token;
    },
    async session({session, token}) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },

    pages: {
      signIn: "/login"
    }
  }
};

export const { signIn, signOut, auth } = NextAuth(authConfig);