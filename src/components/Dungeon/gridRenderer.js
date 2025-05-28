export function drawGrid(ctx, canvas, CELL_SIZE, GRID_SIZE) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;
  for (let i = 0; i <= GRID_SIZE; i++) {
    // draw vertical lines
    ctx.beginPath();
    ctx.moveTo(i * CELL_SIZE, 0);
    ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
    ctx.stroke();

    // draw horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
    ctx.stroke();
  }
}

export function drawRoom(room, ctx, CELL_SIZE) {
  if (room.isPreview) {
    ctx.globalAlpha = 0.75;
  }

  ctx.fillStyle = room.isCorridor ? "#ccc" : "#fff";
  ctx.fillRect(
    room.x || room.gridX * CELL_SIZE,
    room.y || room.gridY * CELL_SIZE,
    room.width || room.w * CELL_SIZE,
    room.height || room.h * CELL_SIZE
  );
  ctx.strokeStyle = "black";
  ctx.strokeRect(
    room.x || room.gridX * CELL_SIZE,
    room.y || room.gridY * CELL_SIZE,
    room.width || room.w * CELL_SIZE,
    room.height || room.h * CELL_SIZE
  );

  ctx.globalAlpha = 1;

  ctx.fillStyle = "#222";
  ctx.font = "12px sans-serif";
  ctx.fillText("ⓘ", room.x + room.width - 14, room.y + 14);

  // Draw centered room number
  if (room.roomNumber && !room.isPreview) {
    ctx.fillStyle = "#000";
    ctx.font = "bold 14px sans-serif";
    const number = `#${room.roomNumber}`;
    const textWidth = ctx.measureText(number).width;
    const textX = room.x + room.width / 2 - textWidth / 2;
    const textY = room.y + room.height / 2 + 5;
    ctx.fillText(number, textX, textY);
  }
}

const doorImageCache = {};

function getDoorImage(type, direction) {
  const key = `${type}-${direction}`;
  if (doorImageCache[key]) return doorImageCache[key];

  const img = new Image();
  img.src =
    direction === "left" || direction === "right"
      ? `/${type}-2.png`
      : `/${type}.png`;

  doorImageCache[key] = img;
  return img;
}

export function drawDoor(door, ctx) {
  ctx.fillStyle = "white";
  ctx.fillRect(door.x, door.y, door.w, door.h);
  ctx.strokeStyle = door.locked ? "red" : "black";
  ctx.strokeRect(door.x, door.y, door.w, door.h);
  if (door.type === "secret") {
    ctx.fillStyle = "#000";
    ctx.font = "bold 14px sans-serif";
    const letter = "S";
    const textWidth = ctx.measureText(letter).width;
    const textX = door.x + door.w / 2 - textWidth / 2;
    const textY = door.y + door.h / 2 + 5;
    ctx.fillText(letter, textX, textY);
  } else {
    const img = getDoorImage(door.type, door.direction);
    if (img.complete) {
      ctx.drawImage(img, door.x, door.y, door.w, door.h);
    } else {
      img.onload = () => {
        ctx.drawImage(img, door.x, door.y, door.w, door.h);
      };
    }
  }
}

export function drawDashedBorder(room, ctx, CELL_SIZE) {
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "blue";
  ctx.strokeRect(
    (room.gridX - 1) * CELL_SIZE,
    (room.gridY - 1) * CELL_SIZE,
    (room.w + 2) * CELL_SIZE,
    (room.h + 2) * CELL_SIZE
  );
  ctx.setLineDash([]);
}

export function render(
  ctx,
  canvas,
  CELL_SIZE,
  GRID_SIZE,
  rooms,
  doors,
  pendingDoors,
  currentRoom,
  floatingRoom
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(ctx, canvas, CELL_SIZE, GRID_SIZE);
  rooms.forEach((room) => drawRoom(room, ctx, CELL_SIZE));
  doors.forEach((door) => drawDoor(door, ctx));

  if (pendingDoors > 0 && currentRoom) {
    drawDashedBorder(currentRoom, ctx, CELL_SIZE);
  }

  if (floatingRoom) {
    drawRoom(
      {
        ...floatingRoom,
        isPreview: true,
      },
      ctx,
      CELL_SIZE
    );
  }
}
