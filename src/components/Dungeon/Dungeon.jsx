import { useEffect, useRef, useState } from "react";
import { drawDashedBorder, drawDoor, drawGrid, render } from "./gridRenderer";
import { createRoom, setRedrawDoorHandler } from "./dungeonManager";
import { onMouseMove, onClick, onKeyDown } from "./events";
import { useBoundStore } from "../../store/boundStore";
import styles from "./styles.module.css";

export const Dungeon = () => {
  const [context, setContext] = useState({});
  const store = useBoundStore();
  const CELL_SIZE = 20;
  const GRID_SIZE = 30;
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = document.getElementById("dungeonCanvas");
    const ctx = canvas.getContext("2d");
    setContext(ctx);

    const state = {
      store,
      canvas,
      ctx,
      CELL_SIZE,
      GRID_SIZE,
      grid: Array.from({ length: 30 }, () => Array(30).fill(null)),
      rooms: store.rooms,
      doors: store.doors,
      floatingRoom: null,
      isPlacingRoom: false,
      activeDoor: null,
      pendingDoors: 0,
      currentRoom: null,
      secretDoor: false,
      exitShaft: false,
      shaftAreas: [],
    };

    stateRef.current = state;

    setRedrawDoorHandler((doorId) => {
      const door = useBoundStore.getState().doors.find((d) => d.id === doorId);
      if (door) {
        drawDoor(door, ctx); // assumes `ctx` is available in this scope
      }
    });

    canvas.addEventListener("mousemove", (e) => onMouseMove(e, state));

    canvas.addEventListener("click", (e) => onClick(e, state));

    document.addEventListener("keydown", (e) => onKeyDown(e, state));

    function init() {
      drawGrid(state.ctx, state.canvas, state.CELL_SIZE, state.GRID_SIZE);
      if (state.rooms.length === 0 && state.doors.length === 0) {
        const bottomCenterX = Math.floor(state.GRID_SIZE / 2);

        const sizes = [
          { w: 2, h: 3 },
          { w: 3, h: 2 },
          { w: 3, h: 4 },
          { w: 4, h: 3 },
        ];
        const chosen = sizes[Math.floor(Math.random() * sizes.length)];

        const startX = bottomCenterX - Math.floor(chosen.w / 2);
        const startY = state.GRID_SIZE - chosen.h - 1;

        createRoom(
          state.grid,
          startX,
          startY,
          chosen.w,
          chosen.h,
          null,
          state.CELL_SIZE,
          state.ctx,
          state.doors,
          state.rooms,
          state.store
        );
      } else {
        render(
          state.ctx,
          state.canvas,
          state.CELL_SIZE,
          state.GRID_SIZE,
          state.rooms,
          state.doors,
          state.pendingDoors,
          state.currentRoom,
          state.floatingRoom
        );
      }
    }

    if (store.exitShaft.length > 0) {
      const shaft = document.createElement("div");
      shaft.textContent = "E";
      shaft.classList.add("exitShaft");
      shaft.style.left = store.exitShaft[0];
      shaft.style.top = store.exitShaft[1];
      document.getElementById("root").append(shaft);
    }

    init();
  }, []);

  const addSecretDoor = () => {
    const state = stateRef.current;
    state.secretDoor = true;
    let coverage = 0;
    store.rooms.forEach((room) => {
      const area = room.w * room.h;
      coverage += area;
    });
    const percentFull = parseFloat(coverage / (GRID_SIZE * GRID_SIZE)).toFixed(
      2
    );
    if (percentFull >= 0.5) {
      alert(
        "You have explored more than 50% of the dungeon. Consider adding stairs down to the next level instead."
      );
      return;
    } else {
      store.rooms.forEach((room) => {
        drawDashedBorder(room, context, CELL_SIZE);
      });
    }
  };

  const addShaft = () => {
    const edgeRooms = [];
    const shaftAreas = [];
    store.rooms.forEach((room) => {
      let top, right, bottom, left;
      top = room.gridY === 0 ? room.w : 0;
      right = room.gridX + room.w === GRID_SIZE ? room.h : 0;
      bottom = room.gridY + room.h === GRID_SIZE ? room.w : 0;
      left = room.gridX === 0 ? room.h : 0;
      const chances = top + right + bottom + left;
      if (chances > 0) {
        edgeRooms.push({ room, chances, top, right, bottom, left });
      }
    });
    edgeRooms.forEach((room) => {
      const ctx = stateRef.current.ctx;
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = "#8be5f9";
      if (room.top) {
        const rect = {
          x: room.room.x,
          y: 0,
          w: room.room.w * CELL_SIZE,
          h: CELL_SIZE,
        };
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        shaftAreas.push(rect);
      }
      if (room.right) {
        const rect = {
          x: GRID_SIZE * CELL_SIZE - CELL_SIZE,
          y: room.room.y,
          w: CELL_SIZE,
          h: room.room.h * CELL_SIZE,
        };
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        shaftAreas.push(rect);
      }
      if (room.bottom) {
        const rect = {
          x: room.room.x,
          y: GRID_SIZE * CELL_SIZE - CELL_SIZE,
          w: room.room.w * CELL_SIZE,
          h: CELL_SIZE,
        };
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        shaftAreas.push(rect);
      }
      if (room.left) {
        const rect = {
          x: 0,
          y: room.room.y,
          w: CELL_SIZE,
          h: room.room.h * CELL_SIZE,
        };
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        shaftAreas.push(rect);
      }
      ctx.globalAlpha = 1;
    });
    store.addMessage("Click where you want to search for the exit shaft.");
    stateRef.current.shaftAreas = shaftAreas;
    stateRef.current.exitShaft = true;
  };

  return (
    <>
      <h1>Level 1: The Entry</h1>
      <canvas
        id="dungeonCanvas"
        className={styles.dungeon}
        width="600"
        height="600"
      ></canvas>
      <button onClick={addSecretDoor}>Create Secret Door</button>
      <button onClick={addShaft}>Create Exit Shaft</button>
      <button>Create Stairs Down</button>
    </>
  );
};
