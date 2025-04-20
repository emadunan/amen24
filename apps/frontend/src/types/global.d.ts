export {};

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      targetId: string,
      options?: Record<string, unknown>,
    ) => void;
  }
}
