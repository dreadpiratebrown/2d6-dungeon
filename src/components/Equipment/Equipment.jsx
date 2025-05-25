import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useBoundStore } from "../../store/boundStore";
import { maneuvers } from "../../shared/maneuvers";
import { armor } from "../../shared/armor";
import { scrolls } from "../../shared/scrolls";
import { potions } from "../../shared/potions";
import { runes } from "../../shared/runes";
import styles from "./styles.module.css";

export const Equipment = () => {
  const [selectedRunes, setSelectedRunes] = useState([]);
  const store = useBoundStore();
  const runeRef = useRef();
  const maneuverRef = useRef();
  const armorRef = useRef();
  const scrollRef = useRef();
  const potionRef = useRef();

  const weapons = {
    longsword: "Longsword",
    greataxe: "Greataxe",
    mace: "Heavy Mace",
  };

  useEffect(() => {
    if (selectedRunes.length > 0) {
      store.setEquipment({ runes: selectedRunes });
    }
  }, [selectedRunes]);

  const removeItem = (item, storeSlice) => {
    const remaining = store[storeSlice].filter((i) => i !== item);
    store.setEquipment({ [storeSlice]: remaining });
  };

  const addItem = (item, storeSlice, ref) => {
    const prev = store[storeSlice];
    store.setEquipment({ [storeSlice]: [...prev, item] });
    ref.current.close();
  };

  return (
    <div className={styles.equipment}>
      <div className={styles.label}>Weapon</div>
      <div className={styles.value}>{weapons[store.weapon]}</div>
      <div className={styles.label}>
        Applied Runes{" "}
        <button
          className={styles.addButton}
          onClick={() => runeRef.current.showModal()}
        >
          Add Rune
        </button>
      </div>
      <div className={styles.value}>{store.runes.join(", ")}</div>
      <div className={styles.label} style={{ gridColumn: "span 2" }}>
        Manoeuvres
      </div>
      <div className={styles.label}>Dice Set</div>
      <div className={styles.label}>Modifier</div>
      {store.maneuvers.map((m) => {
        const maneuver = maneuvers.find((item) => item.name === m);
        return (
          <>
            <div
              className={classNames(styles.value, styles.flex)}
              style={{ gridColumn: "span 2" }}
            >
              {m}{" "}
              <button
                className={styles.removeButton}
                onClick={() => removeItem(m, "maneuvers")}
              >
                X
              </button>
            </div>
            <div className={styles.value}>
              {maneuver.primary} / {maneuver.secondary}
            </div>
            <div className={styles.value}>{maneuver.damage} Damage</div>
          </>
        );
      })}
      {[...Array(3 - store.maneuvers.length)].map((item) => (
        <>
          <div className={styles.value} style={{ gridColumn: "span 2" }}>
            <button
              className={styles.addButton}
              onClick={() => maneuverRef.current.showModal()}
            >
              Add Manoeuvre
            </button>
          </div>
          <div className={styles.value}></div>
          <div className={styles.value}></div>
        </>
      ))}
      <div className={styles.label} style={{ gridColumn: "span 2" }}>
        Armour Piece
      </div>
      <div className={styles.label}>Dice Set</div>
      <div className={styles.label}>Modifier</div>
      {store.armor.map((a) => {
        const armorPiece = armor.find((item) => item.name === a);
        return (
          <>
            <div
              className={classNames(styles.value, styles.flex)}
              style={{ gridColumn: "span 2" }}
            >
              {a}{" "}
              <button
                className={styles.removeButton}
                onClick={() => removeItem(a, "armor")}
              >
                X
              </button>
            </div>
            <div className={styles.value}>
              {armorPiece.primary.length > 1
                ? armorPiece.primary.join("/")
                : armorPiece.primary}
              {armorPiece.primary.length > 1 ? " + " : " / "}
              {armorPiece?.secondary && armorPiece?.secondary.length > 1
                ? armorPiece.secondary.join("/")
                : armorPiece?.secondary}
            </div>
            <div className={styles.value}>{armorPiece.modifier} Damage</div>
          </>
        );
      })}
      {[...Array(3 - store.armor.length)].map((item) => (
        <>
          <div className={styles.value} style={{ gridColumn: "span 2" }}>
            <button
              className={styles.addButton}
              onClick={() => armorRef.current.showModal()}
            >
              Add Armour
            </button>
          </div>
          <div className={styles.value}></div>
          <div className={styles.value}></div>
        </>
      ))}
      <div className={styles.label}>Magic Scrolls</div>
      <div className={styles.label}>Orbit</div>
      <div className={styles.label}>Dispel Doubles</div>
      <div className={styles.label}>Effect Modifier</div>
      {store.scrolls.map((s) => {
        const scroll = scrolls.find((item) => item.name === s);
        return (
          <>
            <div className={classNames(styles.value, styles.flex)}>
              {scroll.name}{" "}
              <button
                className={styles.removeButton}
                onClick={() => removeItem(s, "scrolls")}
              >
                X
              </button>
            </div>
            <div className={styles.value}>{scroll.orbit}</div>
            <div className={styles.value}>{scroll.dispel.join(", ")}</div>
            <div className={styles.value}>{scroll.effect}</div>
          </>
        );
      })}
      {[...Array(3 - store.scrolls.length)].map((item) => (
        <>
          <div className={styles.value}>
            <button
              className={styles.addButton}
              onClick={() => scrollRef.current.showModal()}
            >
              Add Scroll
            </button>
          </div>
          <div className={styles.value}></div>
          <div className={styles.value}></div>
          <div className={styles.value}></div>
        </>
      ))}
      <div className={styles.label} style={{ gridColumn: "span 2" }}>
        Magic Potions
      </div>
      <div className={styles.label} style={{ gridColumn: "span 2" }}>
        Effect Modifier
      </div>
      {store.potions.map((p) => {
        const potion = potions.find((item) => item.name === p);
        return (
          <>
            <div
              className={classNames(styles.value, styles.flex)}
              style={{ gridColumn: "span 2" }}
            >
              {potion.name}{" "}
              <button
                className={styles.removeButton}
                onClick={() => removeItem(p, "potions")}
              >
                X
              </button>
            </div>
            <div className={styles.value} style={{ gridColumn: "span 2" }}>
              {potion.effect}
            </div>
          </>
        );
      })}
      {[...Array(5 - store.potions.length)].map((item) => (
        <>
          <div className={styles.value} style={{ gridColumn: "span 2" }}>
            <button
              className={styles.addButton}
              onClick={() => potionRef.current.showModal()}
            >
              Add Potion
            </button>
          </div>
          <div className={styles.value} style={{ gridColumn: "span 2" }}></div>
        </>
      ))}
      <dialog className={styles.runeDialog} ref={runeRef}>
        <div className={styles.runeList}>
          {runes
            .filter((rune) => rune.weapon === "melee")
            .map((rune) => (
              <div key={rune.name} className={styles.rune}>
                <div className={styles.runeHeader}>
                  <div>{rune.name}</div>
                  <div>{rune.weapon}</div>
                </div>
                <div className={styles.runeBody}>
                  {rune.description}{" "}
                  <button
                    onClick={() =>
                      setSelectedRunes((prevRunes) => {
                        return [...prevRunes, rune.name];
                      })
                    }
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
        </div>
        <button onClick={() => runeRef.current.close()}>Close</button>
      </dialog>
      <dialog className={styles.maneuverDialog} ref={maneuverRef}>
        <div className={styles.maneuverList}>
          {maneuvers
            .filter((m) => store.weapon === m.weapon)
            .map((m) => (
              <div className={styles.maneuver}>
                {m.primary}/{m.secondary} - {m.name} = {m.damage}{" "}
                <button
                  className={styles.addButton}
                  onClick={() => addItem(m.name, "maneuvers", maneuverRef)}
                >
                  Select
                </button>
              </div>
            ))}
        </div>
        <button onClick={() => maneuverRef.current.close()}>Close</button>
      </dialog>
      <dialog className={styles.armorDialog} ref={armorRef}>
        <div className={styles.armorList}>
          {armor.map((a) => (
            <div className={styles.armor}>
              {a.name} {a.primary.length > 1 ? a.primary.join("/") : a.primary}
              {a.primary.length > 1 ? " + " : " / "}
              {a?.secondary && a?.secondary.length > 1
                ? a.secondary.join("/")
                : a?.secondary}{" "}
              | {a.modifier} Damage
              <button
                className={styles.addButton}
                onClick={() => addItem(a.name, "armor", armorRef)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => armorRef.current.close()}>Close</button>
      </dialog>
      <dialog className={styles.scrollDialog} ref={scrollRef}>
        <div className={styles.scrollList}>
          {scrolls.map((s) => (
            <div className={styles.scroll}>
              {s.name} - {s.effect}
              <button
                className={styles.addButton}
                onClick={() => addItem(s.name, "scrolls", scrollRef)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => scrollRef.current.close()}>Close</button>
      </dialog>
      <dialog className={styles.potionDialog} ref={potionRef}>
        <div className={styles.potionList}>
          {potions.map((p) => (
            <div className={styles.potion}>
              {p.name} - {p.effect}
              <button
                className={styles.addButton}
                onClick={() => addItem(p.name, "potions", potionRef)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => potionRef.current.close()}>Close</button>
      </dialog>
    </div>
  );
};
