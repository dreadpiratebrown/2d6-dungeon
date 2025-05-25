import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import {
  smallRooms,
  largeRooms,
  regularRooms,
} from "../shared/rooms-level-one";
import * as tables from "../shared/tables";
import { useBoundStore } from "../store/boundStore";

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function rollRoomSize(store) {
  let x1 = new DiceRoll("d6").total,
    y1 = new DiceRoll("d6").total;
  if (x1 === y1 && x1 < 6) {
    x1 += new DiceRoll("d6").total;
    y1 += new DiceRoll("d6").total;
  }
  let size = "regular";
  if (x1 === 1 || y1 === 1) {
    size = "corridor";
  } else if (x1 * y1 <= 6) {
    size = "small";
  } else if (x1 * y1 >= 32) {
    size = "large";
  }
  store.addMessage(`Rolling for room size: ${x1} x ${y1} (${size})`);
  return { w: x1, h: y1, s: size };
}

export function rollDoors() {
  const d = new DiceRoll("d6").total;
  return [0, 1, 1, 2, 2, 3][d - 1];
}

export function rollRoomMetadata(size) {
  if (size === "corridor") {
    return {
      name: "Corridor",
      description: "Just a corridor",
      doorType: "archways",
    };
  }

  if (size === "small") {
    let roll = new DiceRoll("2d6").total;
    let smallRoom = smallRooms.find((room) => room.roll === roll);
    let exists = smallRoom.unique
      ? useBoundStore
          .getState()
          .rooms.some((room) => room.name === smallRoom.name)
      : false;
    while (exists) {
      roll = new DiceRoll("2d6").total;
      smallRoom = smallRooms.find((room) => room.roll === roll);
      exists = smallRoom.unique
        ? useBoundStore
            .getState()
            .rooms.some((room) => room.name === smallRoom.name)
        : false;
    }
    return {
      name: smallRoom.name,
      description: smallRoom.description,
      doorType: "archways",
    };
  }

  if (size === "large") {
    let roll = new DiceRoll("2d6").total;
    let largeRoom = largeRooms.find((room) => room.roll === roll);
    let exists = largeRoom.unique
      ? useBoundStore
          .getState()
          .rooms.some((room) => room.name === largeRoom.name)
      : false;
    while (exists) {
      roll = new DiceRoll("2d6").total;
      largeRoom = largeRooms.find((room) => room.roll === roll);
      exists = largeRoom.unique
        ? useBoundStore
            .getState()
            .rooms.some((room) => room.name === largeRoom.name)
        : false;
    }
    let doorsLocked = false;
    if (largeRoom.exits.search("doors") > 0) {
      const locked = new DiceRoll("d6").total;
      if (
        (locked === 4 && largeRoom.exits === "metal doors") ||
        (locked === 5 && largeRoom.exits === "reinforced doors") ||
        locked === 6
      ) {
        doorsLocked === true;
      }
    }
    return {
      name: largeRoom.name,
      description: largeRoom.description,
      doorType: largeRoom.exits,
      doorsLocked,
    };
  }

  if (size === "regular") {
    let primary = new DiceRoll("d6").total;
    let secondary = new DiceRoll("d6").total;
    let regRoom = regularRooms.find(
      (room) =>
        JSON.stringify(room.roll) === JSON.stringify([primary, secondary])
    );
    let exists = regRoom.unique
      ? useBoundStore
          .getState()
          .rooms.some((room) => room.name === regRoom.name)
      : false;
    while (exists) {
      primary = new DiceRoll("d6").total;
      secondary = new DiceRoll("d6").total;
      regRoom = regularRooms.find(
        (room) =>
          JSON.stringify(room.roll) === JSON.stringify([primary, secondary])
      );
      exists = regRoom.unique
        ? useBoundStore
            .getState()
            .rooms.some((room) => room.name === regRoom.name)
        : false;
    }
    let exits = regRoom.exits;
    if (exits === "random") {
      const roll1 = new DiceRoll("d6").total;
      const roll2 = new DiceRoll("d6").total;
      const type = tables["ext1"].data.find(
        (exit) => JSON.stringify(exit.roll) === JSON.stringify([roll1, roll2])
      );
      exits = type.result.toLowerCase();
    }
    let doorsLocked = false;
    if (exits.search("doors") > 0) {
      const locked = new DiceRoll("d6").total;
      if (
        (locked === 4 && exits === "metal doors") ||
        (locked === 5 && exits === "reinforced doors") ||
        locked === 6
      ) {
        doorsLocked = true;
      }
    }
    return {
      name: regRoom.name,
      description: regRoom.description,
      encounter: regRoom.encounter,
      doorType: exits,
      doorsLocked,
    };
  }
}

export const rollOnTable = ({ id, modifier }) => {
  const table = tables[id.toLowerCase()];
  const dice = table.dice;
  let result;
  if (dice === "d6" || dice === "2d6") {
    const roll = new DiceRoll(`${dice}${modifier ? modifier : ""}`);
    let modRoll = roll.total;
    if (dice === "d6" && modRoll < 1) {
      modRoll = 1;
    } else if (dice === "d6" && modRoll > 6) {
      modRoll = 6;
    } else if (dice === "2d6" && modRoll < 2) {
      modRoll = 2;
    } else if (dice === "2d6" && modRoll > 12) {
      modRoll = 12;
    }
    result = table.data.find((item) => item.roll[0] === modRoll);
  } else {
    const primary = new DiceRoll("d6");
    const secondary = new DiceRoll("d6");
    result = table.data.find((item) => {
      return (
        JSON.stringify(item.roll) ===
        JSON.stringify([primary.total, secondary.total])
      );
    });
  }
  useBoundStore.getState().addMessage(result.result);
  useBoundStore.getState().addMessage(table.name);
  useBoundStore.getState().addMessage("--------------------");
};

export const precisionCheck = ({ target }) => {
  const precision = useBoundStore.getState().precision;
  const roll = new DiceRoll("2d6");
  const sum = roll.total + precision;
  useBoundStore
    .getState()
    .addMessage(`Roll (${roll.total}) + Precision (${precision}): ${sum}.`);
  useBoundStore.getState().addMessage(`Target: ${target}`);
  if (sum >= parseInt(target)) {
    useBoundStore.getState().addMessage("Precision check passed!");
  } else {
    useBoundStore.getState().addMessage("Precision check failed.");
  }
  useBoundStore.getState().addMessage("--------------------");
};
