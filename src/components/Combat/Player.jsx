import styles from "./styles.module.css";

export const Player = ({
  store,
  turn,
  hasRolledThisTurn,
  remainingShift,
  playerManeuvers,
  playerPrimeAttack,
  playerRoll,
  maxShift,
  rollDamage,
  playerArmor,
  throwRef,
  didThrow,
}) => {
  return (
    <div className={styles.player}>
      <h2>{store.name}</h2>
      <div className={styles.statsBlock}>
        <div className={styles.label}>HP</div>
        <div className={styles.value}>
          {store.hp}/{store.maxHp}{" "}
          <button onClick={() => store.setCharacter({ hp: store.hp + 1 })}>
            &uarr;
          </button>
          <button onClick={() => store.setCharacter({ hp: store.hp - 1 })}>
            &darr;
          </button>
        </div>
        <div className={styles.label}>SHIFT</div>
        <div className={styles.value}>
          {turn === "player" && hasRolledThisTurn
            ? remainingShift
            : store.shift}{" "}
          <button
            onClick={() => store.setCharacter({ shift: store.shift + 1 })}
          >
            &uarr;
          </button>
          <button
            onClick={() => store.setCharacter({ shift: store.shift - 1 })}
          >
            &darr;
          </button>
        </div>
      </div>
      <div className={styles.abilityBlock}>
        <h3>Manoeuvres</h3>
        {playerManeuvers?.map((m) => {
          return (
            <div className={styles.maneuver} key={m.name}>
              <div>{m.name}</div>
              <div className={styles.diceset}>
                {m.primary} / {m.secondary}
              </div>
              <div>{m.damage} Damage</div>
              <div>
                <button
                  disabled={
                    !playerPrimeAttack &&
                    Math.abs(m.primary - playerRoll[0]) +
                      Math.abs(m.secondary - playerRoll[1]) >
                      maxShift
                  }
                  onClick={() => rollDamage(m)}
                >
                  Attack
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.abilityBlock}>
        <h3>Armour</h3>
        {playerArmor?.map((a) => {
          return (
            <div className={styles.interrupt} key={a.name}>
              <div>{a.name}</div>
              <div className={styles.diceset}>
                {a.primary.length > 1 ? a.primary.join("/") : a.primary}
                {a.primary.length > 1 ? " + " : " / "}
                {a?.secondary && a?.secondary.length > 1
                  ? a.secondary.join("/")
                  : a?.secondary}
              </div>
              <div>{a.modifier} Damage</div>
            </div>
          );
        })}
      </div>
      <button onClick={() => throwRef.current.showModal()} disabled={didThrow}>
        Throw a Weapon
      </button>
    </div>
  );
};
