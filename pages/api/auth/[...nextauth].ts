import  CredentialsProvider  from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { hashPassword, verifyPassword } from "../../../lib/bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      id: "signin",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "iam@awesome.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log(credentials);
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          let maybeUser = await prisma.user.findFirst({
            where: {
              email,
            },
            select: {
              id: true,
              email: true,
              password: true,
              options:true
              // name: true,
              // role: true,
            },
          });
          if (!maybeUser) {
            if (!password || !email) {
              throw new Error("Invalid Credentials");
            }
            maybeUser = await prisma.user.create({
              data: {
                email: email,
                password: await hashPassword(password),
              },
              select: {
                id: true,
                email: true,
                password: true,
                name: true,
                role: true,
              },
            });
          } else {
            const isValid = await verifyPassword(password, maybeUser!.password);

            if (!isValid) {
              throw new Error("Invalid Credentials");
            }
          }
          return {
            id: maybeUser.id,
            email: maybeUser.email,
            name: maybeUser.name,
            // role: maybeUser.role,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        // token.role = user.role;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);


// export default NextAuth({
//   // Configure one or more authentication providers
//   session: {
//     strategy: 'jwt',
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET as string,
//     }),
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       type: "credentials",
//       // The credentials is used to generate a suitable form on the sign in page.
//       // You can specify whatever fields you are expecting to be submitted.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "jsmith@awesome.com" },
//         password: { label: "Password", type: "password" }
//       },
//       authorize(credentials, req) {
//         //perform login authorization logic
//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         }
//         if(email ==="test@gmail.com" && password ==="secret"){
//           const user = {email,password}
//           return user;
//         }
//         return null;
//       }
//     }),
//   ],
//   theme: {
//     colorScheme: "light",
//   },
//   callbacks: {
//     async jwt({ token }) {
//       token.userRole = "admin"
//       return token
//     },
//   },
// })






// import { CredentialsProvider } from 'next-auth/providers/credentials';
// import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"


// export const authOptions: NextAuthOptions = {
//   // https://next-auth.js.org/configuration/providers/oauth
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials, req) {
//         // Add logic here to look up the user from the credentials supplied
//         const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }

//         if (user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null

//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       }
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID as string,
//       clientSecret: process.env.GOOGLE_SECRET as string,
//     }),

//   ],
//   theme: {
//     colorScheme: "light",
//   },
//   callbacks: {
//     async jwt({ token }) {
//       token.userRole = "admin"
//       return token
//     },
//   },
// }

// export default NextAuth(authOptions)
