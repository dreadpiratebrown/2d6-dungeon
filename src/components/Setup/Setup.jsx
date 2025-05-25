import { useState } from "react";
import classNames from "classnames";
import { useBoundStore } from "../../store/boundStore";
import { maneuvers } from "../../shared/maneuvers";
import styles from "./styles.module.css";

export const Setup = ({ onStart }) => {
  const [step, setStep] = useState(styles.stepOne);
  const [name, setName] = useState("");
  const [weapon, setWeapon] = useState("");
  const [startingManeuvers, setStartingManeuvers] = useState([]);
  const [selectedManeuvers, setSelectedManeuvers] = useState([]);
  const [armor, setArmor] = useState([]);
  const [scroll, setScroll] = useState("");

  const store = useBoundStore();

  const chooseWeapon = (e) => {
    setWeapon(e.target.value);
    setStartingManeuvers(maneuvers.filter((m) => m.weapon === e.target.value));
  };

  const weapons = {
    longsword: "Longsword",
    greataxe: "Greataxe",
    mace: "Heavy Mace",
  };

  const selectManeuver = (e) => {
    setSelectedManeuvers((prevSelected) => {
      if (prevSelected.includes(e.target.value)) {
        // Remove value if unchecked
        return prevSelected.filter((item) => item !== e.target.value);
      } else {
        // Add value if checked
        return [...prevSelected, e.target.value];
      }
    });
  };

  const startGame = () => {
    store.setCharacter({
      name,
    });
    store.setEquipment({
      weapon,
      maneuvers: selectedManeuvers,
      armor,
      scrolls: [scroll],
    });
    onStart();
  };

  return (
    <div className={styles.setup}>
      <h1>New Game</h1>
      <div className={styles.card}>
        <div className={classNames(styles.slider, step)}>
          <div className={styles.step}>
            <div className={styles.cardTop}>
              <img src="/knight.svg" width="200" alt="knight" />
            </div>
            <div className={styles.cardBottom}>
              <label htmlFor="name">What is your name?</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                onClick={() => setStep(styles.stepTwo)}
                disabled={name.length === 0}
              >
                Next
              </button>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.cardTop}>
              <img src="/longsword.svg" width="200" alt="sword" />
            </div>
            <div className={styles.cardBottom}>
              <p>Hail, brave {name}! What Weapon do you wield?</p>
              <label>
                <input
                  type="radio"
                  name="weapon"
                  value="longsword"
                  onClick={chooseWeapon}
                />{" "}
                Longsword
              </label>
              <label>
                <input
                  type="radio"
                  name="weapon"
                  value="greataxe"
                  onClick={chooseWeapon}
                />{" "}
                Greataxe
              </label>
              <label>
                <input
                  type="radio"
                  name="weapon"
                  value="mace"
                  onClick={chooseWeapon}
                />{" "}
                Heavy Mace
              </label>
              <button
                onClick={() => setStep(styles.stepThree)}
                disabled={weapon.length === 0}
              >
                Next
              </button>
              <button onClick={() => setStep(styles.stepOne)}>Back</button>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.cardTop}>
              <img src={`/${weapon}.svg`} width="200" alt={`${weapon}`} />
            </div>
            <div className={styles.cardBottom}>
              <p>Choose two manouevres for your {weapon}:</p>
              {startingManeuvers.map((m) => {
                const isChecked = selectedManeuvers.includes(m.name);
                const isDisabled = selectedManeuvers.length >= 2 && !isChecked;
                return (
                  <label key={m.name}>
                    <input
                      type="checkbox"
                      value={m.name}
                      onChange={selectManeuver}
                      checked={isChecked}
                      disabled={isDisabled}
                    />{" "}
                    {`${m.name} (${m.primary}/${m.secondary}) ${m.damage} damage`}
                  </label>
                );
              })}
              <button
                onClick={() => setStep(styles.stepFour)}
                disabled={selectedManeuvers.length !== 2}
              >
                Next
              </button>
              <button onClick={() => setStep(styles.stepTwo)}>Back</button>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.cardTop}>
              <img src="/armor.svg" width="200" alt="armor" />
            </div>
            <div className={styles.cardBottom}>
              <p>Choose your starting Armour:</p>
              <label>
                <input
                  type="radio"
                  name="armor"
                  value="Jerkin"
                  onClick={(e) => setArmor([e.target.value])}
                />{" "}
                Jerkin (4) -1 damage
              </label>
              <label>
                <input
                  type="radio"
                  name="armor"
                  value="Padded Tunic"
                  onClick={(e) => setArmor([e.target.value])}
                />{" "}
                Padded Tunic (5) -1 damage
              </label>
              <label>
                <input
                  type="radio"
                  name="armor"
                  value="Quilted Coat"
                  onClick={(e) => setArmor([e.target.value])}
                />{" "}
                Quilted Coat (3) -1 damage
              </label>
              <label>
                <input
                  type="radio"
                  name="armor"
                  value="Hide Doublet"
                  onClick={(e) => setArmor([e.target.value])}
                />{" "}
                Hide Doublet (2) -1 damage
              </label>
              <button
                onClick={() => setStep(styles.stepFive)}
                disabled={armor.length === 0}
              >
                Next
              </button>
              <button onClick={() => setStep(styles.stepThree)}>Back</button>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.cardTop}>
              <img src="/scroll.svg" width="200" alt="scroll" />
            </div>
            <div className={styles.cardBottom}>
              <p>Choose a Magic Scroll:</p>
              <label>
                <input
                  type="radio"
                  name="scroll"
                  value="Scroll of Balance"
                  onClick={(e) => setScroll(e.target.value)}
                />{" "}
                Scroll of Balance - +1 Discipline for 1 dungeon level
              </label>
              <label>
                <input
                  type="radio"
                  name="scroll"
                  value="Scroll of Mental Whip"
                  onClick={(e) => setScroll(e.target.value)}
                />{" "}
                Scroll of Mental Whip - 1 stroke of 10 damage
              </label>
              <label>
                <input
                  type="radio"
                  name="scroll"
                  value="Scroll of Reflexes"
                  onClick={(e) => setScroll(e.target.value)}
                />{" "}
                Scroll of Reflexes - +1 Shift for 1 combat
              </label>
              <label>
                <input
                  type="radio"
                  name="scroll"
                  value="Scroll of Melt Metal"
                  onClick={(e) => setScroll(e.target.value)}
                />{" "}
                Scroll of Melt Metal - Destroy 1 lock or armour interrupt
              </label>
              <button
                onClick={() => setStep(styles.stepSix)}
                disabled={scroll.length === 0}
              >
                Next
              </button>
              <button onClick={() => setStep(styles.stepFour)}>Back</button>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.cardTop}>
              <img src="/knight.svg" width="200" alt="knight" />
            </div>
            <div className={styles.cardBottom}>
              <p>
                Name: {name}
                <br />
                Weapon: {weapons[weapon]}
                <br />
                Starting Manoeuvres: {selectedManeuvers.join(", ")}
                <br />
                Armour: {armor}
                <br />
                Magic Scroll: {scroll}
              </p>
              <button onClick={startGame}>Venture Forth!</button>
              <button onClick={() => setStep(styles.stepFive)}>Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
