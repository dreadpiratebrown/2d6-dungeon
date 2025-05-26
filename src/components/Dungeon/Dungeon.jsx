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
      <button>Create Shaft to Outside</button>
      <button>Create Stairs Down</button>
    </>
  );
};
