// Modal as a separate component
import { useEffect, useRef, useState } from "react";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { useBoundStore } from "../../store/boundStore";
import { triggerRedrawDoor } from "../Dungeon/dungeonManager";
import { rollOnTable } from "../../utils/utils";
import styles from "./styles.module.css";

export const PickLock = ({ openModal, closeModal, doorId }) => {
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState();
  const [roll, setRoll] = useState();
  const ref = useRef();
  const store = useBoundStore();
  const door = useBoundStore((state) =>
    state.doors.find((d) => d.id === parseInt(doorId))
  );
  const updateDoor = useBoundStore((state) => state.updateDoor);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      setStep(0);
      setPick(null);
      setRoll(null);
      ref.current?.close();
    }
  }, [openModal]);

  const handleRoll = () => {
    const result = new DiceRoll(`2d6${pick}+${store.precision}`).total;
    setRoll(result);
    const attempt = result >= door.lockQuality;
    if (attempt) {
      updateDoor(door.id, { locked: false, attempts: 1 });
      triggerRedrawDoor(door.id);
    } else {
      updateDoor(door.id, { attempts: 1 });
    }
  };

  const wait = () => {
    closeModal();
    rollOnTable({ id: `l${store.dungeon_level}p` });
    updateDoor(door.id, { locked: false, attempts: 1 });
    triggerRedrawDoor(door.id);
  };

  return (
    <dialog ref={ref} onCancel={closeModal} className={styles.modal}>
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <img src="/locked-door.svg" width="200" alt="dungeon door" />
          </div>
          <div className={styles.cardBottom}>
            <h3>Lock Pick Attempt</h3>
            {step === 0 && !door?.attempts && (
              <>
                <p>
                  You must have a lockpick to attempt this. If you do not have a
                  lockpick, you can wait for a patrol to come by, or you can try
                  a different way through the dungeon.
                </p>
                <button onClick={() => setStep(1)}>I've Got One</button>
                <button onClick={wait}>I'll Wait</button>
                <button onClick={closeModal}>I'll Try a Different Way</button>
              </>
            )}
            {step === 0 && door?.attempts && (
              <>
                <p>
                  You have already attempted to pick this lock and failed. The
                  lock is now damaged. You must wait for a patrol to come by, or
                  you can try a different way through the dungeon.
                </p>
                <button onClick={wait}>I'll Wait</button>
                <button onClick={closeModal}>I'll Try a Different Way</button>
              </>
            )}
            {step === 1 && (
              <>
                <p>What kind of lockpick will you use?</p>
                <label>
                  <input
                    type="radio"
                    id="plus1"
                    name="lockpick"
                    onClick={() => setPick("+1")}
                  />{" "}
                  Lockpick +1
                </label>
                <label>
                  <input
                    type="radio"
                    id="plus2"
                    name="lockpick"
                    onClick={() => setPick("+2")}
                  />{" "}
                  Lockpick +2
                </label>
                <label>
                  <input
                    type="radio"
                    id="plus3"
                    name="lockpick"
                    onClick={() => setPick("+3")}
                  />{" "}
                  Lockpick +3
                </label>
                <button onClick={() => setStep(2)} disabled={!Boolean(pick)}>
                  Next
                </button>
                <button onClick={() => setStep(0)}>Back</button>
              </>
            )}
            {step === 2 && (
              <>
                <p>
                  Lock Quality: {door.lockQuality}
                  <br />
                  Lockpick: {pick}
                  <br />
                  Precision: {store.precision}
                </p>
                <button onClick={handleRoll} disabled={roll > 0}>
                  Roll!
                </button>
                {roll && (
                  <>
                    <p>
                      Result: {roll}
                      <br />
                      {roll >= door.lockQuality
                        ? "The door is unlocked!"
                        : "You failed to unlock the door."}
                    </p>
                    <button onClick={closeModal}>Close</button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <h3>Inventory</h3>
          </div>
          <div className={styles.cardBottom}>
            <p className={styles.inventory}>{store.small_items}</p>
          </div>
        </div>
      </div>
    </dialog>
  );
};
