import styles from "./styles.module.css";

export const Enemies = ({
  enemies,
  targetedEnemy,
  setTargetedEnemyIndex,
  updateEnemy,
  turn,
  hasRolledThisTurn,
  remainingShift,
  attackingEnemy,
  enemyRoll,
  maxShift,
  rollDamage,
}) => {
  return (
    <div className={styles.enemy}>
      {enemies.map((enemy, index) => {
        return (
          <div key={index}>
            <h2>
              {enemy?.name}{" "}
              {enemies.length > 1 && enemy.name === targetedEnemy.name ? (
                <img src="/target.svg" alt="target" width="32" />
              ) : (
                <></>
              )}
            </h2>
            {enemy.name !== targetedEnemy.name ? (
              <button
                onClick={() => setTargetedEnemyIndex(index)}
                className={styles.targetBtn}
              >
                Target {enemy.name}
              </button>
            ) : (
              <></>
            )}
            <div className={styles.statsBlock}>
              <div className={styles.label}>HP</div>
              <div className={styles.value}>
                {enemy?.hp}{" "}
                <button
                  onClick={() => updateEnemy(index, { hp: enemy.hp + 1 })}
                >
                  &uarr;
                </button>
                <button
                  onClick={() => updateEnemy(index, { hp: enemy.hp - 1 })}
                >
                  &darr;
                </button>
              </div>
              <div className={styles.label}>SHIFT</div>
              <div className={styles.value}>
                {turn === "enemy" && hasRolledThisTurn
                  ? remainingShift
                  : enemy?.shift}
              </div>
            </div>
            <div className={styles.abilityBlock}>
              <h3>Manoeuvres</h3>
              {enemy?.maneuvers.map((m) => {
                return (
                  <div className={styles.maneuver} key={m.name}>
                    <div>{m.name}</div>
                    <div className={styles.diceset}>
                      {m.dice[0]} / {m.dice[1]}
                    </div>
                    <div>{m.damage} Damage</div>
                    <div>
                      {enemy.name === attackingEnemy.name && (
                        <button
                          disabled={
                            Math.abs(m.dice[0] - enemyRoll[0]) +
                              Math.abs(m.dice[1] - enemyRoll[1]) >
                            maxShift
                          }
                          onClick={() => rollDamage(m)}
                        >
                          Attack
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
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
        );
      })}
    </div>
  );
};
