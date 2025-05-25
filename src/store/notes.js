export const useNotesStore = (set) => ({
  side_quests: "",
  narrative: "",
  notes: "",

  setNotes: (partial) => set(partial),
  resetNotes: () => {
    set({
      side_quests: "",
      narrative: "",
      notes: "",
    });
  },
});
