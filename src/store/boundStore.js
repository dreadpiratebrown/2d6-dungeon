import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { useGameStore } from "./game";
import { useCharacterStore } from "./character";
import { useEquipmentStore } from "./equipment";
import { useTrackersStore } from "./trackers";
import { useInventoryStore } from "./inventory";
import { useNotesStore } from "./notes";

export const useBoundStore = create(
  devtools(
    persist(
      (...a) => ({
        ...useGameStore(...a),
        ...useCharacterStore(...a),
        ...useEquipmentStore(...a),
        ...useTrackersStore(...a),
        ...useInventoryStore(...a),
        ...useNotesStore(...a),
      }),
      { name: "2d6-store" }
    )
  )
);
