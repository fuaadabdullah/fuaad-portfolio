declare module "*.css";

// Allow using `tw` prop in @vercel/og JSX for Tailwind-style classes
declare namespace JSX {
	interface IntrinsicAttributes {
		tw?: string;
	}
}
