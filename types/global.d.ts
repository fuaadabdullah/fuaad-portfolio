declare module "*.css";

declare global {
  interface Window {
    IN?: {
      parse?: () => void;
    };
  }
}

export {};
