import styles from "./styles.module.css";

export const CombatPanel = ({
  fatigue,
  shiftAdjustment,
  turn,
  rollAttack,
  playerRoll,
  canShift,
  setPlayerRoll,
  hasRolledThisTurn,
  nextTurn,
  enemies,
  attackingEnemy,
  setAttackingEnemyIndex,
  enemyRoll,
  setEnemyRoll,
  enemyAttacks,
  attackingEnemyIndex,
  setEnemyAttacks,
  combatLog,
  endCombat,
}) => {
  return (
    <div className={styles.combatPanel}>
      <div className={styles.counterBlock}>
        <div className={styles.fatigue}>
          <div className={styles.counter}>{fatigue}</div>
          Combat Fatigue
        </div>
        <div className={styles.shiftAdj}>
          <div className={styles.counter}>{shiftAdjustment}</div>
          Shift Adjustment
        </div>
      </div>
      <div className={styles.diceBlock}>
        <div className={styles.header}>
          <h3>Player Roll</h3>
          <button
            disabled={turn === "player" ? false : true}
            onClick={rollAttack}
          >
            ROLL
          </button>
        </div>
        <div className={styles.diceRow}>
          <div className={styles.die}>
            <div>
              <div className={styles.counter}>
                {playerRoll.length > 0 ? playerRoll[0] : ""}
              </div>
              Primary
            </div>
            <button
              disabled={!canShift(0, "up")}
              onClick={() =>
                setPlayerRoll((prev) => [Math.min(prev[0] + 1, 6), prev[1]])
              }
            >
              &uarr;
            </button>
            <button
              disabled={!canShift(0, "down")}
              onClick={() =>
                setPlayerRoll((prev) => [Math.max(prev[0] - 1, 1), prev[1]])
              }
            >
              &darr;
            </button>
          </div>
          <div className={styles.die}>
            <div>
              <div className={styles.counter}>
                {playerRoll.length > 0 ? playerRoll[1] : ""}
              </div>
              Secondary
            </div>
            <button
              disabled={!canShift(1, "up")}
              onClick={() =>
                setPlayerRoll((prev) => [prev[0], Math.min(prev[1] + 1, 6)])
              }
            >
              &uarr;
            </button>
            <button
              disabled={!canShift(1, "down")}
              onClick={() =>
                setPlayerRoll((prev) => [prev[0], Math.max(prev[1] - 1, 1)])
              }
            >
              &darr;
            </button>
          </div>
        </div>
        <div className={styles.header}>
          <div>
            <h3>Enemy Roll</h3>
            {enemies.length > 1 &&
              enemies.map((enemy, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="enemies"
                    checked={enemy.name === attackingEnemy.name}
                    onChange={() => setAttackingEnemyIndex(index)}
                  />{" "}
                  {enemy.name}
                </label>
              ))}
          </div>
          <button
            disabled={turn === "enemy" ? false : true}
            onClick={rollAttack}
          >
            ROLL
          </button>
        </div>
        <div className={styles.diceRow}>
          <div className={styles.die}>
            <div>
              <div className={styles.counter}>
                {enemyRoll.length > 0 ? enemyRoll[0] : ""}
              </div>
              Primary
            </div>
            <button
              disabled={!canShift(0, "up")}
              onClick={() =>
                setEnemyRoll((prev) => [Math.min(prev[0] + 1, 6), prev[1]])
              }
            >
              &uarr;
            </button>
            <button
              disabled={!canShift(0, "down")}
              onClick={() =>
                setEnemyRoll((prev) => [Math.max(prev[0] - 1, 1), prev[1]])
              }
            >
              &darr;
            </button>
          </div>
          <div className={styles.die}>
            <div>
              <div className={styles.counter}>
                {enemyRoll.length > 0 ? enemyRoll[1] : ""}
              </div>
              Secondary
            </div>
            <button
              disabled={!canShift(1, "up")}
              onClick={() =>
                setEnemyRoll((prev) => [prev[0], Math.min(prev[1] + 1, 6)])
              }
            >
              &uarr;
            </button>
            <button
              disabled={!canShift(1, "down")}
              onClick={() =>
                setEnemyRoll((prev) => [prev[0], Math.max(prev[1] - 1, 1)])
              }
            >
              &darr;
            </button>
          </div>
        </div>
      </div>
      <div className={styles.log}>
        <h3>Combat Log</h3>
        <div className={styles.messages}>
          {[...combatLog].reverse().map((m, index) => {
            switch (m) {
              case "NEXT TURN":
                return (
                  <button key={index} onClick={nextTurn}>
                    Next Turn
                  </button>
                );
                break;
              case "END COMBAT":
                return (
                  <button key={index} onClick={endCombat}>
                    End Combat
                  </button>
                );
                break;
              default:
                return <span key={index}>{m}</span>;
            }
          })}
        </div>
      </div>
    </div>
  );
};
