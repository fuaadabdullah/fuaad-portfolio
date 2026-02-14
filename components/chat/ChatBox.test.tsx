import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ChatBox } from "./ChatBox";

const sendMessage = vi.fn();
const cancel = vi.fn();
const setInput = vi.fn();

let status: "idle" | "loading" = "idle";

vi.mock("./useChat", () => {
  return {
    useChat: () => ({
      messages: [],
      input: "",
      setInput,
      sendMessage,
      status,
      cancel,
    }),
  };
});

describe("ChatBox", () => {
  it("renders a toggle button and opens/closes the panel", () => {
    render(<ChatBox />);

    fireEvent.click(screen.getByLabelText(/open chat/i));
    expect(screen.getByText("Ask Me Anything")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/close chat/i));
    expect(screen.queryByText("Ask Me Anything")).not.toBeInTheDocument();
  });

  it("clicking a suggestion calls sendMessage", () => {
    sendMessage.mockClear();
    render(<ChatBox />);

    fireEvent.click(screen.getByLabelText(/open chat/i));
    fireEvent.click(screen.getByRole("button", { name: "Tell me about your services" }));

    expect(sendMessage).toHaveBeenCalledWith("Tell me about your services");
  });

  it("while loading, Stop calls cancel", () => {
    cancel.mockClear();
    status = "loading";

    render(<ChatBox />);
    fireEvent.click(screen.getByLabelText(/open chat/i));
    fireEvent.click(screen.getByRole("button", { name: /stop/i }));

    expect(cancel).toHaveBeenCalled();
    status = "idle";
  });
});

