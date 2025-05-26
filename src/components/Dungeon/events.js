import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { isAreaOccupied, positionFloatingRoom } from "./dungeonManager";
import { drawDashedBorder, render } from "./gridRenderer";
import { rollDoors, rollRoomSize, rollRoomMetadata } from "../../utils/utils";
import { useBoundStore } from "../../store/boundStore";

export const onMouseMove = (e, state) => {
  const {
    floatingRoom,
    CELL_SIZE,
    GRID_SIZE,
    ctx,
    canvas,
    rooms,
    doors,
    pendingDoors,
    currentRoom,
    isPlacingRoom,
  } = state;
  if (!isPlacingRoom || !floatingRoom || !floatingRoom.direction) return;

  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  positionFloatingRoom(
    mx,
    my,
    floatingRoom,
    CELL_SIZE,
    GRID_SIZE,
    ctx,
    canvas,
    rooms,
    doors,
    pendingDoors,
    currentRoom
  );
};

export const onClick = (e, state) => {
  const { canvas, ctx, CELL_SIZE, GRID_SIZE, grid, store, secretDoor } = state;
  const { rooms, doors } = useBoundStore.getState();
  if (state.pendingDoors > 0 && state.currentRoom) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const gx = Math.floor(mx / CELL_SIZE);
    const gy = Math.floor(my / CELL_SIZE);

    // Check if in dashed border area
    const inRangeX =
      gx >= state.currentRoom.gridX - 1 &&
      gx <= state.currentRoom.gridX + state.currentRoom.w;
    const inRangeY =
      gy >= state.currentRoom.gridY - 1 &&
      gy <= state.currentRoom.gridY + state.currentRoom.h;
    const isEdge =
      gx === state.currentRoom.gridX - 1 ||
      gx === state.currentRoom.gridX + state.currentRoom.w ||
      gy === state.currentRoom.gridY - 1 ||
      gy === state.currentRoom.gridY + state.currentRoom.h;

    const notInsideRoom =
      gx < state.currentRoom.gridX ||
      gx >= state.currentRoom.gridX + state.currentRoom.w ||
      gy < state.currentRoom.gridY ||
      gy >= state.currentRoom.gridY + state.currentRoom.h;

    const occupied =
      grid[gy]?.[gx] || doors.some((d) => d.gridX === gx && d.gridY === gy);

    if (inRangeX && inRangeY && isEdge && notInsideRoom && !occupied) {
      let direction = null;
      if (gx === state.currentRoom.gridX - 1) direction = "left";
      else if (gx === state.currentRoom.gridX + state.currentRoom.w)
        direction = "right";
      else if (gy === state.currentRoom.gridY - 1) direction = "top";
      else if (gy === state.currentRoom.gridY + state.currentRoom.h)
        direction = "bottom";

      const door = {
        x: gx * CELL_SIZE,
        y: gy * CELL_SIZE,
        w: CELL_SIZE,
        h: CELL_SIZE,
        gridX: gx,
        gridY: gy,
        used: false,
        direction,
        locked: state.currentRoom.doorsLocked,
        type: state.currentRoom.doorType,
        id: doors.length,
        lockQuality: new DiceRoll("2d6").total,
      };
      doors.push(door);
      store.setDungeon({ doors });
      state.currentRoom.doors.push(door);
      state.pendingDoors--;

      store.addMessage(`Doors left: ${state.pendingDoors}`);
      if (state.pendingDoors === 0) {
        if (state.currentRoom.doorType.search("doors") > 0) {
          store.addMessage(
            `Doors are: ${
              state.currentRoom.doorsLocked ? "locked" : "unlocked"
            }`
          );
        }
        store.addMessage(`Exits: ${state.currentRoom.doorType}`);
        store.addMessage(state.currentRoom.encounter);
        store.addMessage(state.currentRoom.description);
        store.addMessage(
          `Room ${state.currentRoom.roomNumber}: ${state.currentRoom.name}`
        );
        store.addMessage("--------------------");
        state.currentRoom = null;
      }

      render(
        ctx,
        canvas,
        CELL_SIZE,
        GRID_SIZE,
        rooms,
        doors,
        state.pendingDoors,
        state.currentRoom,
        state.floatingRoom
      );
    }

    return; // skip other clicks during this phase
  }

  if (secretDoor) {
    rooms.forEach((room) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const gx = Math.floor(mx / CELL_SIZE);
      const gy = Math.floor(my / CELL_SIZE);

      // Check if in dashed border area
      const inRangeX = gx >= room.gridX - 1 && gx <= room.gridX + room.w;
      const inRangeY = gy >= room.gridY - 1 && gy <= room.gridY + room.h;
      const isEdge =
        gx === room.gridX - 1 ||
        gx === room.gridX + room.w ||
        gy === room.gridY - 1 ||
        gy === room.gridY + room.h;

      const notInsideRoom =
        gx < room.gridX ||
        gx >= room.gridX + room.w ||
        gy < room.gridY ||
        gy >= room.gridY + room.h;

      const occupied =
        grid[gy]?.[gx] || doors.some((d) => d.gridX === gx && d.gridY === gy);

      if (inRangeX && inRangeY && isEdge && notInsideRoom && !occupied) {
        let direction = null;
        if (gx === room.gridX - 1) direction = "left";
        else if (gx === room.gridX + room.w) direction = "right";
        else if (gy === room.gridY - 1) direction = "top";
        else if (gy === room.gridY + room.h) direction = "bottom";

        const door = {
          x: gx * CELL_SIZE,
          y: gy * CELL_SIZE,
          w: CELL_SIZE,
          h: CELL_SIZE,
          gridX: gx,
          gridY: gy,
          used: false,
          direction,
          locked: false,
          type: "secret",
          id: doors.length,
          lockQuality: 0,
        };
        doors.push(door);
        store.setDungeon({ doors });
        state.secretDoor = false;
        render(
          ctx,
          canvas,
          CELL_SIZE,
          GRID_SIZE,
          rooms,
          doors,
          state.pendingDoors,
          state.currentRoom,
          state.floatingRoom
        );
      }
    });

    return;
  }

  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  if (state.isPlacingRoom && state.floatingRoom) {
    const { gridX, gridY, w, h } = state.floatingRoom;

    if (isAreaOccupied(gridX, gridY, w, h, grid)) {
      console.warn("Room placement blocked: area is already occupied.");
      return; // Exit early
    }

    for (let y = gridY; y < gridY + h; y++) {
      for (let x = gridX; x < gridX + w; x++) {
        if (y < 0 || x < 0 || y >= GRID_SIZE || x >= GRID_SIZE || grid[y][x]) {
          return;
        }
      }
    }

    let canPlace = true;
    for (let y = gridY; y < gridY + h; y++) {
      for (let x = gridX; x < gridX + w; x++) {
        if (y < 0 || x < 0 || y >= GRID_SIZE || x >= GRID_SIZE || grid[y][x]) {
          canPlace = false;
          break;
        }
        for (const door of doors) {
          if (door.gridX === x && door.gridY === y) {
            canPlace = false;
            break;
          }
        }
      }
      if (!canPlace) break;
    }

    if (!canPlace) return;

    const newRoom = {
      ...state.floatingRoom,
      x: gridX * CELL_SIZE,
      y: gridY * CELL_SIZE,
      width: w * CELL_SIZE,
      height: h * CELL_SIZE,
      isCorridor: w === 1 || h === 1,
      isPreview: false,
      doors: [],
    };

    rooms.push(newRoom);
    store.setDungeon({ rooms });
    for (let y = gridY; y < gridY + h; y++) {
      for (let x = gridX; x < gridX + w; x++) {
        grid[y][x] = true;
      }
    }
    state.floatingRoom.doorOrigin.used = true;
    state.floatingRoom = null;
    state.pendingDoors = rollDoors();
    state.currentRoom = newRoom;
    drawDashedBorder(newRoom, ctx, CELL_SIZE);

    if (state.pendingDoors > 0) {
      store.addMessage(`Doors left: ${state.pendingDoors}`);
    }
    if (state.pendingDoors === 0) {
      store.addMessage(state.currentRoom.encounter);
      store.addMessage(state.currentRoom.description);
      store.addMessage(
        `Room ${state.currentRoom.roomNumber}: ${state.currentRoom.name}`
      );
      store.addMessage("--------------------");
    }
    state.isPlacingRoom = false;
    render(
      ctx,
      canvas,
      CELL_SIZE,
      GRID_SIZE,
      rooms,
      doors,
      state.pendingDoors,
      state.currentRoom,
      state.floatingRoom
    );
    return;
  }

  state.activeDoor = null;

  for (const door of doors) {
    if (
      !state.isPlacingRoom &&
      !door.used &&
      mx >= door.x &&
      mx <= door.x + door.w &&
      my >= door.y &&
      my <= door.y + door.h
      // && !door.generatedRoom
    ) {
      if (door.locked) {
        store.addMessage(`Door locked! <event:picklock:${door.id}>`);
        store.addMessage("----------------");
        return;
      }
      state.activeDoor = door;
      const size = rollRoomSize(store);
      const roomMetaData = rollRoomMetadata(size.s);
      let gridX = door.gridX;
      let gridY = door.gridY;

      if (door.direction === "top") gridY -= size.h;
      else if (door.direction === "bottom") gridY += 1;
      else if (door.direction === "left") gridX -= size.w;
      else if (door.direction === "right") gridX += 1;

      state.floatingRoom = {
        w: size.w,
        h: size.h,
        gridX,
        gridY,
        doorOrigin: door,
        direction: door.direction,
        s: size.s,
        name: roomMetaData.name,
        description: roomMetaData.description,
        encounter: roomMetaData?.encounter || "",
        doorType: roomMetaData.doorType,
        doorsLocked: roomMetaData?.doorsLocked || false,
        roomNumber: rooms.length + 1,
      };

      positionFloatingRoom(
        mx,
        my,
        state.floatingRoom,
        CELL_SIZE,
        GRID_SIZE,
        ctx,
        canvas,
        rooms,
        doors,
        state.pendingDoors,
        state.currentRoom
      );

      state.isPlacingRoom = true;
      break;
    }
  }

  for (const room of rooms) {
    const infoX = room.x + room.width - 14;
    const infoY = room.y;
    if (mx >= infoX && mx <= infoX + 14 && my >= infoY && my <= infoY + 14) {
      // Show React overlay with room data
      if (room.doorType.search("doors") > 0) {
        store.addMessage(
          `Doors are: ${room.doorsLocked ? "locked" : "unlocked"}`
        );
      }
      store.addMessage(`Exits: ${room.doorType}`);
      store.addMessage(room.encounter);
      store.addMessage(room.description);
      store.addMessage(`Room ${room.roomNumber}: ${room.name}`);
      store.addMessage("--------------------");
      return;
    }
  }
};

export const onKeyDown = (e, state) => {
  const {
    store,
    ctx,
    canvas,
    CELL_SIZE,
    GRID_SIZE,
    rooms,
    doors,
    pendingDoors,
    currentRoom,
  } = state;
  if (e.key === "Escape" && state.isPlacingRoom && state.floatingRoom) {
    state.floatingRoom = null;
    state.isPlacingRoom = false;
    render(
      ctx,
      canvas,
      CELL_SIZE,
      GRID_SIZE,
      rooms,
      doors,
      pendingDoors,
      currentRoom,
      state.floatingRoom
    );
    store.addMessage("Room placement cancelled.");
  }
  if (e.key === "Escape" && state.secretDoor) {
    state.secretDoor = false;
    render(
      ctx,
      canvas,
      CELL_SIZE,
      GRID_SIZE,
      rooms,
      doors,
      pendingDoors,
      currentRoom,
      state.floatingRoom
    );
    store.addMessage("Secret door placement cancelled.");
  }
  if (e.key === "Escape" && state.pendingDoors > 0) {
    state.pendingDoors--;
    store.addMessage(`Doors left: ${state.pendingDoors}`);
    if (state.pendingDoors === 0) {
      if (state.currentRoom.doorType.search("doors") > 0) {
        store.addMessage(
          `Doors are: ${state.currentRoom.doorsLocked ? "locked" : "unlocked"}`
        );
      }
      store.addMessage(`Exits: ${state.currentRoom.doorType}`);
      store.addMessage(state.currentRoom.encounter);
      store.addMessage(state.currentRoom.description);
      store.addMessage(
        `Room ${state.currentRoom.roomNumber}: ${state.currentRoom.name}`
      );
      store.addMessage("--------------------");
      state.currentRoom = null;
    }
    render(
      ctx,
      canvas,
      CELL_SIZE,
      GRID_SIZE,
      rooms,
      doors,
      state.pendingDoors,
      state.currentRoom,
      state.floatingRoom
    );
    store.addMessage("Door placement cancelled.");
  }
};
