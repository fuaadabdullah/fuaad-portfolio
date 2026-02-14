import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useChat } from "./useChat";

function Harness() {
  const { messages, input, setInput, sendMessage, status } = useChat();
  return (
    <div>
      <div data-testid="status">{status}</div>
      <input
        data-testid="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button data-testid="send" onClick={() => sendMessage()}>
        Send
      </button>
      <ul>
        {messages.map((m) => (
          <li key={m.id} data-testid="msg">
            {m.from}:{m.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

describe("useChat", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("adds a user message and replaces the bot placeholder with the reply", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: "hello back" }),
    });
    // @ts-expect-error test stub
    global.fetch = fetchMock;

    render(<Harness />);

    fireEvent.change(screen.getByTestId("input"), { target: { value: "hi" } });
    fireEvent.click(screen.getByTestId("send"));

    const msgs = screen.getAllByTestId("msg").map((n) => n.textContent);
    expect(msgs[0]).toBe("user:hi");
    expect(msgs[1]).toBe("bot:");

    await waitFor(() => {
      expect(screen.getAllByTestId("msg").map((n) => n.textContent)[1]).toBe(
        "bot:hello back"
      );
    });
  });

  it("handles non-OK responses gracefully", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    // @ts-expect-error test stub
    global.fetch = fetchMock;

    render(<Harness />);

    fireEvent.change(screen.getByTestId("input"), { target: { value: "hi" } });
    fireEvent.click(screen.getByTestId("send"));

    await waitFor(() => {
      const msgs = screen.getAllByTestId("msg").map((n) => n.textContent || "");
      expect(msgs.join("\n")).toContain("bot:Oops — can't reach the assistant right now");
    });
  });

  it("aborts an in-flight request when a new message is sent", async () => {
    const fetchMock = vi
      .fn()
      .mockImplementationOnce((_url: string, init?: RequestInit) => {
        const signal = init?.signal as AbortSignal | undefined;
        return new Promise((_resolve, reject) => {
          if (!signal) return;
          signal.addEventListener("abort", () => {
            reject(new DOMException("Aborted", "AbortError"));
          });
        });
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ reply: "second reply" }),
      });
    // @ts-expect-error test stub
    global.fetch = fetchMock;

    render(<Harness />);

    fireEvent.change(screen.getByTestId("input"), { target: { value: "first" } });
    fireEvent.click(screen.getByTestId("send"));

    fireEvent.change(screen.getByTestId("input"), { target: { value: "second" } });
    fireEvent.click(screen.getByTestId("send"));

    await waitFor(() => {
      const msgs = screen.getAllByTestId("msg").map((n) => n.textContent || "");
      expect(msgs).toContain("bot:Canceled.");
      expect(msgs).toContain("user:second");
      expect(msgs).toContain("bot:second reply");
    });
  });
});

