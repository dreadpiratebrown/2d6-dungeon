import { drawDoor, drawRoom, render } from "./gridRenderer";
import { clamp } from "../../utils/utils";

let redrawDoorById = null;

export const setRedrawDoorHandler = (fn) => {
  redrawDoorById = fn;
};

export const triggerRedrawDoor = (id) => {
  if (typeof redrawDoorById === "function") {
    redrawDoorById(id);
  }
};

export function createRoom(
  grid,
  gridX,
  gridY,
  w,
  h,
  fromDirection = null,
  CELL_SIZE,
  ctx,
  doors,
  rooms,
  store
) {
  // add room to grid array
  for (let y = gridY; y < gridY + h; y++) {
    for (let x = gridX; x < gridX + w; x++) {
      grid[y][x] = true;
    }
  }

  const isCorridor = w === 1 || h === 1;
  const px = gridX * CELL_SIZE;
  const py = gridY * CELL_SIZE;
  const room = {
    gridX,
    gridY,
    w,
    h,
    x: px,
    y: py,
    width: w * CELL_SIZE,
    height: h * CELL_SIZE,
    isCorridor,
    doors: [],
    name: "Entrance",
    description: "This is the entrance to the dungeon.",
    doorType: "archways",
    doorsLocked: false,
    roomNumber: rooms.length + 1,
  };
  drawRoom(room, ctx, CELL_SIZE);

  const finalDirs = ["left", "top", "right", "bottom"];

  for (let dir of finalDirs) {
    const door = createDoor(room, dir, CELL_SIZE);
    room.doors.push(door);
    drawDoor(door, ctx);
    doors.push(door);
    store.setDungeon({ doors });
  }

  rooms.push(room);
  store.setDungeon({ rooms });
  return room;
}

function createDoor(room, dir, CELL_SIZE) {
  let x = 0,
    y = 0,
    w = CELL_SIZE,
    h = CELL_SIZE;
  let gx = room.gridX,
    gy = room.gridY;

  const centerX = room.x + Math.floor(room.w / 2) * CELL_SIZE;
  const centerY = room.y + Math.floor(room.h / 2) * CELL_SIZE;

  if (dir === "top") {
    x = centerX - w / 2;
    y = room.y - h;
    gx += Math.floor(room.w / 2);
    gy -= 1;
  } else if (dir === "bottom") {
    x = centerX - w / 2;
    y = room.y + room.height;
    gx += Math.floor(room.w / 2);
    gy += room.h;
  } else if (dir === "left") {
    x = room.x - w;
    y = centerY - h / 2;
    gx -= 1;
    gy += Math.floor(room.h / 2);
  } else if (dir === "right") {
    x = room.x + room.width;
    y = centerY - h / 2;
    gx += room.w;
    gy += Math.floor(room.h / 2);
  }

  x = Math.floor(x / CELL_SIZE) * CELL_SIZE;
  y = Math.floor(y / CELL_SIZE) * CELL_SIZE;

  return {
    x,
    y,
    w,
    h,
    gridX: gx,
    gridY: gy,
    used: false,
    direction: dir,
    type: room.doorType,
  };
}

export function isAreaOccupied(x, y, w, h, grid) {
  for (let gy = y; gy < y + h; gy++) {
    for (let gx = x; gx < x + w; gx++) {
      if (grid[gy]?.[gx]) {
        return true;
      }
    }
  }
  return false;
}

export function positionFloatingRoom(
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
) {
  if (!floatingRoom || !floatingRoom.direction || !floatingRoom.doorOrigin)
    return;

  const w = floatingRoom.w;
  const h = floatingRoom.h;

  const door = floatingRoom.doorOrigin;
  const dir = floatingRoom.direction;

  // First, get mouse position in grid coords
  let gx = Math.floor(mx / CELL_SIZE);
  let gy = Math.floor(my / CELL_SIZE);

  if (dir === "top") {
    gy = door.gridY - h; // Top edge of room h tiles above door
    gx = clamp(gx, door.gridX - w, door.gridX); // Horizontal alignment so one tile aligns to door
  } else if (dir === "bottom") {
    gy = door.gridY + 1; // Top edge just below door
    gx = clamp(gx, door.gridX - w, door.gridX);
  } else if (dir === "left") {
    gx = door.gridX - w; // Left edge w tiles left of door
    gy = clamp(gy, door.gridY - h, door.gridY);
  } else if (dir === "right") {
    gx = door.gridX + 1; // Left edge just right of door
    gy = clamp(gy, door.gridY - h, door.gridY);
  }

  floatingRoom.gridX = gx;
  floatingRoom.gridY = gy;

  render(
    ctx,
    canvas,
    CELL_SIZE,
    GRID_SIZE,
    rooms,
    doors,
    pendingDoors,
    currentRoom,
    floatingRoom
  );
}
