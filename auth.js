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
    async session({session, token}) {
      if (token) {
        // console.log("token: ")
        // console.log(token)
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
    async jwt({token, user, session, trigger}) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },

    pages: {
      signIn: "/login"
    }
  },
};

export const { signIn, signOut, auth, update } = NextAuth(authConfig);