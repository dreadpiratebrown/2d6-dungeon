export const useTrackersStore = (set) => ({
  prisoners: 0,
  rations: 3,
  bloodied: 0,
  soaked: 0,
  grakada: 0,
  intuneric: 0,
  maduva: 0,
  murataynie: 0,
  nevazator: 0,
  radacina: 0,
  legend_status: 0,

  setTrackers: (partial) => set(partial),
  resetTrackers: () => {
    set({
      prisoners: 0,
      rations: 3,
      bloodied: 0,
      soaked: 0,
      grakada: 0,
      intuneric: 0,
      maduva: 0,
      murataynie: 0,
      nevazator: 0,
      radacina: 0,
      legend_status: 0,
    });
  },
});
