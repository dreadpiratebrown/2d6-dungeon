export const useCharacterStore = (set) => ({
  name: "",
  level: 1,
  hp: 10,
  maxHp: 10,
  xp: 0,
  shift: 2,
  discipline: 1,
  precision: 0,

  setCharacter: (partial) => set(partial),
  resetCharacter: () => {
    set({
      name: "",
      level: 1,
      hp: 10,
      maxHp: 10,
      xp: 0,
      shift: 2,
      discipline: 1,
      precision: 0,
    });
  },
});
