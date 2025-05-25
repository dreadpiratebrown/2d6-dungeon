export const useEquipmentStore = (set) => ({
  weapon: "",
  runes: [],
  maneuvers: [],
  armor: [],
  scrolls: [],
  potions: ["Potion of Healing"],

  setEquipment: (partial) => set(partial),
  resetEquipment: () => {
    set({
      weapon: "",
      runes: [],
      maneuvers: [],
      armor: [],
      scrolls: [],
      potions: ["Potion of Healing"],
    });
  },
});
