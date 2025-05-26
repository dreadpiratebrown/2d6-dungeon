import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { useBoundStore } from "./store/boundStore";

describe("App Component", () => {
  test("renders StartMenu on initial load", () => {
    render(<App />);
    expect(screen.getByText(/New Game/i)).toBeInTheDocument();
    expect(screen.getByText(/Load Game/i)).toBeInTheDocument();
  });

  test("transitions to Setup when New Game is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/New Game/i));
    expect(screen.getByText(/New Game/i)).toBeInTheDocument();
    expect(screen.getByText(/Venture Forth/i)).toBeInTheDocument();
  });

  test("transitions to main game when Venture Forth is clicked", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/New Game/i));
    fireEvent.click(screen.getByText(/Venture Forth/i));
    expect(screen.getByText("Dungeon")).toBeInTheDocument();
    expect(screen.getByText("Character")).toBeInTheDocument();
  });

  test("switches to Character tab", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/New Game/i));
    fireEvent.click(screen.getByText(/Venture Forth/i));
    fireEvent.click(screen.getByText(/Character/i));
    expect(screen.getByText(/Discipline/i)).toBeInTheDocument(); // Adjust to unique Inventory text
  });

  test("game log renders messages from store", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/New Game/i));
    fireEvent.click(screen.getByText(/Venture Forth/i));
    act(() => {
      useBoundStore.setState({ messages: ["A dark force stirs..."] });
    });
    expect(screen.getByText(/A dark force stirs/i)).toBeInTheDocument();
  });
});
