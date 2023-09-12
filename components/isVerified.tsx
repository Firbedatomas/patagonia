export function isVerified(session: any): boolean {
    if (!session || !session.user) {
      return false;
    }
    return session.user.verified === 1;
  }
  