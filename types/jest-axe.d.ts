import "vitest";

declare module "jest-axe" {
  export const toHaveNoViolations: (...args: any[]) => any;
}

declare module "vitest" {
  interface Assertion<T = any> {
    toHaveNoViolations(): T;
  }

  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
