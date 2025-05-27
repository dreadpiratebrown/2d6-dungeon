import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Equipment } from "./Equipment";
import { useBoundStore } from "../../store/boundStore";

// let maneuvers = ;
// const mockSetEquipment = vi.fn((update) => {
//   if (update.maneuvers) {
//     maneuvers = update.maneuvers;
//   }
// });
// vi.mock("../../store/boundStore", () => ({
//   useBoundStore: () => ({
//     weapon: "mace",
//     runes: ["Fire Rune"],
//     maneuvers: ["Bludgeon", "Bash"],
//     armor: ["Hide Doublet"],
//     scrolls: ["Scroll of Reflexes"],
//     potions: ["Potion of Healing"],
//     setEquipment: mockSetEquipment,
//   }),
// }));

useBoundStore.setState({
  weapon: "mace",
  runes: ["Fire Rune"],
  maneuvers: ["Bludgeon", "Bash"],
  armor: ["Hide Doublet"],
  scrolls: ["Scroll of Reflexes"],
  potions: ["Potion of Healing"],
});

describe("Equipment Component", () => {
  test("displays initial values from the store", () => {
    render(<Equipment />);
    expect(screen.getByText("Heavy Mace")).toBeInTheDocument();
    expect(screen.getByText("Fire Rune")).toBeInTheDocument();
    expect(screen.getByText("Bludgeon")).toBeInTheDocument();
    expect(screen.getByText("Bash")).toBeInTheDocument();
    expect(screen.getByText("Hide Doublet")).toBeInTheDocument();
    expect(screen.getByText("Scroll of Reflexes")).toBeInTheDocument();
    expect(screen.getByText("Potion of Healing")).toBeInTheDocument();
  });

  test("opens potion dialog on Add Potion click", () => {
    render(<Equipment />);

    const addPotionButton = screen.getAllByRole("button", {
      name: /add potion/i,
    })[0];
    fireEvent.click(addPotionButton);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  test("removes a maneuver on X click", async () => {
    render(<Equipment />);
    const removeButton = screen.getAllByRole("button", { name: /X/i })[0];
    fireEvent.click(removeButton);
    await waitFor(() => {
      expect(screen.queryByText("Bludgeon")).not.toBeInTheDocument();
    });
  });
});
