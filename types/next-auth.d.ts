import 'next-auth';

declare module 'next-auth' {
  interface User {
    businessName?: string;
    fullName?: string;
    timezone?: string;
    languagePreference?: string;
    id: number;
    email: string;
    verified: number;  
  }
  interface Session {
    user: User;
  }
  interface JWT {
    businessName?: string;
    fullName?: string;
    timezone?: string;
    languagePreference?: string;
  }
}
