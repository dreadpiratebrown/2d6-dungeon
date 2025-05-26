import { fireEvent, render, screen } from "@testing-library/react";
import { Character } from "./Character";

const mockSetCharacter = vi.fn();
vi.mock("../../store/boundStore", () => ({
  useBoundStore: () => ({
    name: "Lyra",
    level: 3,
    hp: 15,
    xp: 1200,
    shift: 2,
    discipline: 1,
    precision: 4,
    setCharacter: mockSetCharacter,
  }),
}));

describe("Character Component", () => {
  test("renders all character input fields", () => {
    render(<Character />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hp/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/xp/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/shift/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/discipline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/precision/i)).toBeInTheDocument();
  });

  test("updates name in the store", () => {
    render(<Character />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Zerath" },
    });

    expect(mockSetCharacter).toHaveBeenCalledWith({ name: "Zerath" });
  });

  test("displays initial values from the store", () => {
    render(<Character />);
    expect(screen.getByDisplayValue("Lyra")).toBeInTheDocument();
    expect(screen.getByDisplayValue("3")).toBeInTheDocument();
    expect(screen.getByDisplayValue("15")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1200")).toBeInTheDocument();
  });
});
