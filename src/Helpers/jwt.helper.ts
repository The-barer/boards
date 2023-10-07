export function parseJwt(token: string): { exp: string; iat?: string } | null {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export function jwtExp(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload) {
      const timeOut = 10000;
      const expiredIn = parseInt(payload.exp) * 1000;
      const data = Date.now() - timeOut;
      return expiredIn > data;
    } else return false;
  } catch (error) {
    return false;
  }
}
