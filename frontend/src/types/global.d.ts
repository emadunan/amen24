export {};

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
