/* eslint-disable no-console */
// Next.js currently bundles a compiled Browserslist build that emits a
// baseline-browser-mapping staleness warning unconditionally (no env opt-out).
// We suppress it here to keep CI noise at zero until Next updates its bundle.
//
// This file is loaded via NODE_OPTIONS=--require=... for `pnpm build`.
const NEEDLE = "[baseline-browser-mapping] The data in this module is over two months old.";

const origWarn = console.warn.bind(console);

console.warn = (...args) => {
  try {
    const msg = args.map((a) => (typeof a === "string" ? a : "")).join(" ");
    if (msg.includes(NEEDLE)) return;
  } catch {
    // ignore
  }
  return origWarn(...args);
};

