import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  secret: 'myverystrongandrandomsecretvalue',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/auth", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (res.ok && user) {
          if (user.verified) { // Asegúrate de que este campo exista en tu modelo de usuario
            return { ...user };
          } else {
            // Aquí puedes manejar usuarios no verificados
            throw new Error("Por favor, verifica tu correo electrónico antes de iniciar sesión.");
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Agregar campos al token aquí
      if (user) {
        token.id = user.id;  
        token.businessName = user.businessName;
        token.fullName = user.fullName;
        token.timezone = user.timezone;
        token.languagePreference = user.languagePreference;
        token.verified = user.verified; 
      }
      return token;
    },
    async session({ session, token }) {
      // Casting explícito
      const typedSession: any = session;
      const typedToken: any = token;
      typedSession.user.id = typedToken.id;
      typedSession.user.businessName = typedToken.businessName;
      typedSession.user.fullName = typedToken.fullName;
      typedSession.user.timezone = typedToken.timezone;
      typedSession.user.languagePreference = typedToken.languagePreference;
      typedSession.user.verified = typedToken.verified;
    
      return typedSession;
    }
  },
});
