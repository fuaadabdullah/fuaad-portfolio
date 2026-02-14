// React's public types are declared in the global `React` namespace (and then
// exported from the `"react"` module). Augment the namespace directly so JSX
// intrinsic element props (e.g. `div`, `style`) pick this up.

export {};

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      // Used by @vercel/og for Tailwind-style classes in ImageResponse JSX.
      tw?: string;
    }

    interface StyleHTMLAttributes<T> {
      // Used by styled-jsx in Next.js (`<style jsx>{...}</style>`).
      jsx?: boolean;
      global?: boolean;
    }
  }
}
