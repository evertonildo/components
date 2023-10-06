
export const isLocalhost = (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1'));

export function toBase64Code(arg0: string): string {
  return btoa(arg0);
}
