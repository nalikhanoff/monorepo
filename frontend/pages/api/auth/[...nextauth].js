import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const { BACKEND_URL } = process.env;

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'credentials',
      // The credentials are used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        login: {
          label: 'Логин',
          type: 'text',
          placeholder: 'johndoe',
        },
        password: { label: 'Пароль', type: 'password' },
      },
      async authorize(creds, req) {
        try {
          const res = await fetch(`${BACKEND_URL}/user/login`, {
            method: 'POST',
            body: JSON.stringify(creds),
            headers: { 'Content-Type': 'application/json' },
          });
          if (!res.ok) {
            // credentials are invalid
            return null;
          }
          const parsedResponse = await res.json();
          return parsedResponse;
        } catch (err) {
          console.log(err);
          return null;
        }
        // here you write logic that takes the credentials and
        // submit to backend server and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // user is only available the first time a user signs in authorized
      if (user) {
        return {
          ...token,
          jwt: user.jwt,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.jwt = token.jwt;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
