import { forwardRef } from "react";
import styles from "./styles.module.css";

export const ThrowWeapon = forwardRef(
  (
    {
      store,
      setThrownWeapon,
      throwMod,
      setThrowMod,
      enemies,
      thrownWeapon,
      throwWeapon,
      didThrow,
      throwLog,
    },
    ref
  ) => {
    return (
      <dialog ref={ref} className={styles.throwing}>
        <div className={styles.combatUi}>
          <div className={styles.column}>
            <h2>Inventory</h2>
            <p className={styles.inventory}>{store.small_items}</p>
            <h2>Large Items</h2>
            <ol>
              {store.large_items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
          <div className={styles.column}>
            <div className={styles.options}>
              <label>
                <img src="/axe.svg" alt="throwing axe" />
                <br />
                Axe
                <br />
                <input
                  type="radio"
                  name="throwing"
                  value="axe"
                  onClick={() => setThrownWeapon("axe")}
                />
              </label>
              <label>
                <img src="/knife.svg" alt="throwing knife" />
                <br />
                Knife
                <br />
                <input
                  type="radio"
                  name="throwing"
                  value="knife"
                  onClick={() => setThrownWeapon("knife")}
                />
              </label>
              <label>
                <img src="/dart.svg" alt="throwing dart" />
                <br />
                Dart
                <br />
                <input
                  type="radio"
                  name="throwing"
                  value="dart"
                  onClick={() => setThrownWeapon("dart")}
                />
              </label>
            </div>
            <div className={styles.modifier}>
              <label htmlFor="modifier">Modifier</label>
              <input
                type="number"
                id="modifier"
                value={throwMod}
                onChange={(e) => setThrowMod(e.target.value)}
              />
            </div>
            {enemies.map((enemy, index) => (
              <div className={styles.target} key={index}>
                <div className={styles.targetName}>
                  <h2>{enemy.name}</h2>
                  <button
                    disabled={!thrownWeapon}
                    onClick={() => throwWeapon(enemy, index)}
                  >
                    Throw
                  </button>
                </div>
                <div className={styles.abilityBlock}>
                  <h3>Interrupts</h3>
                  {enemy?.interrupts.map((i) => {
                    return (
                      <div className={styles.interrupt} key={i.name}>
                        <div>{i.name}</div>
                        <div>
                          {i.primary.length > 0 &&
                            `Primary ${i.primary.join(", ")}`}
                          {i.secondary.length > 0 &&
                            `Secondary ${i.secondary.join(", ")}`}
                        </div>
                        <div>{i.modifier} damage</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.throwLog}>
            {/* This needs to be a cancel/reset function, not just a close */}
            {!didThrow && (
              <button onClick={() => ref.current.close()}>CANCEL</button>
            )}
            {didThrow && (
              <button onClick={() => ref.current.close()}>CLOSE</button>
            )}
            {[...throwLog].reverse().map((m, index) => (
              <span key={index}>{m}</span>
            ))}
          </div>
        </div>
      </dialog>
    );
  }
);
