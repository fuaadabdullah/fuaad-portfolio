/**
 * Read only a bounded number of UTF-8 bytes. Content-Length alone is untrusted:
 * a chunked request may omit it, and intermediaries may modify it.
 */
export type LimitedText =
  | { ok: true; text: string }
  | { ok: false; status: 400 | 413; error: string };

export async function readLimitedText(request: Request, maxBytes: number): Promise<LimitedText> {
  if (!Number.isSafeInteger(maxBytes) || maxBytes <= 0) {
    throw new Error("Invalid request byte limit");
  }

  const declared = request.headers.get("content-length");
  if (declared !== null) {
    const length = Number(declared);
    if (!Number.isSafeInteger(length) || length < 0) {
      return { ok: false, status: 400, error: "Invalid Content-Length" };
    }
    if (length > maxBytes) {
      return { ok: false, status: 413, error: "Request too large" };
    }
  }
  if (!request.body) return { ok: true, text: "" };

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) {
        await reader.cancel();
        return { ok: false, status: 413, error: "Request too large" };
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return { ok: true, text };
  } catch {
    return { ok: false, status: 400, error: "Invalid request body" };
  } finally {
    reader.releaseLock();
  }
}
