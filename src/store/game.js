export const useGameStore = (set) => ({
  messages: [],
  dungeon_level: 1,
  rooms: [],
  doors: [],
  addMessage: (msg) => {
    msg += "\n";
    set((state) => ({
      messages: [...state.messages, msg],
    }));
  },
  updateDungeonLevel: (value) => set({ dungeon_level: value }),
  updateDoor: (index, newProps) =>
    set((state) => ({
      doors: state.doors.map((door, i) =>
        i === index ? { ...door, ...newProps } : door
      ),
    })),
  setDungeon: (partial) => set(partial),
  resetGame: () => {
    set({
      messages: [],
      dungeon_level: 1,
      rooms: [],
      doors: [],
    });
  },
});
