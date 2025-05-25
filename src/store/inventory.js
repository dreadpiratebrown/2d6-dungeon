export const useInventoryStore = (set) => ({
  gold: 0,
  silver: 0,
  copper: 0,
  treasure: "",
  small_items: "Flint and steel\nLantern\nPouch\nWax sealing kit",
  large_items: [],
  loot_lockup: "",

  setInventory: (partial) => set(partial),
  resetInventory: () => {
    set({
      gold: 0,
      silver: 0,
      copper: 0,
      treasure: "",
      small_items: "Flint and steel\nLantern\nPouch\nWax sealing kit",
      large_items: [],
      loot_lockup: "",
    });
  },
});
