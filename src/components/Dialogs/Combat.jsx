import { useEffect, useRef, useState } from "react";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { useBoundStore } from "../../store/boundStore";
import { enemiesl1 } from "../../shared/enemies-level-one";
import { maneuvers } from "../../shared/maneuvers";
import { armor } from "../../shared/armor";
import styles from "./styles.module.css";

export const Combat = ({ openModal, closeModal, enemyIds, onDeath }) => {
  const [enemies, setEnemies] = useState([]);
  const [origEnemies, setOriginEnemies] = useState([]);
  const [targetedEnemyIndex, setTargetedEnemyIndex] = useState(0);
  const [attackingEnemyIndex, setAttackingEnemyIndex] = useState(0);
  const [enemyAttacks, setEnemyAttacks] = useState([]);
  const [turn, setTurn] = useState("player");
  const [turnCount, setTurnCount] = useState(1);
  const [round, setRound] = useState(1);
  const [fatigue, setFatigue] = useState(1);
  const [shiftAdjustment, setShiftAdjustment] = useState(0);
  const [playerRoll, setPlayerRoll] = useState([0, 0]);
  const [enemyRoll, setEnemyRoll] = useState([0, 0]);
  const [originalRoll, setOriginalRoll] = useState([0, 0]);
  const [combatLog, setCombatLog] = useState([]);
  const [maxShift, setMaxShift] = useState(0);
  const [hasRolledThisTurn, setHasRolledThisTurn] = useState(false);
  const [playerPrimeAttack, setPlayerPrimeAttack] = useState(false);
  const [exactStrike, setExactStrike] = useState(false);
  const [playerIsDead, setPlayerIsDead] = useState(false);
  const ref = useRef();
  const deadRef = useRef();
  const store = useBoundStore();
  const playerManeuvers = store.maneuvers.map((m) =>
    maneuvers.find((item) => item.name === m)
  );
  const playerArmor = store.armor.map((a) =>
    armor.find((item) => item.name === a)
  );
  const totalShiftUsed =
    turn === "player"
      ? Math.abs(playerRoll[0] - originalRoll[0]) +
        Math.abs(playerRoll[1] - originalRoll[1])
      : Math.abs(enemyRoll[0] - originalRoll[0]) +
        Math.abs(enemyRoll[1] - originalRoll[1]);

  const remainingShift = maxShift - totalShiftUsed;
  const targetedEnemy = enemies[targetedEnemyIndex];
  const attackingEnemy = enemies[attackingEnemyIndex];

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
      const enemyObjects = enemyIds.map((id) =>
        enemiesl1.find((e) => e.name === id)
      );
      setEnemies(enemyObjects);
      setOriginEnemies(enemyObjects);
      setCombatLog((prev) => [...prev, "You attack first. Click ROLL."]);
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  const rollAttack = () => {
    const primary = new DiceRoll("d6").total;
    const secondary = new DiceRoll("d6").total;
    setHasRolledThisTurn(true);
    if (turn === "player") {
      if (primary === 6 && secondary === 6) {
        setPlayerPrimeAttack(true);
      }
      setPlayerRoll([primary, secondary]);
      setEnemyRoll([0, 0]);
      setOriginalRoll([primary, secondary]);
      setMaxShift(store.shift + shiftAdjustment);
      setCombatLog((prev) => [
        ...prev,
        `You rolled [${primary}, ${secondary}].`,
      ]);
      if (primary === 6 && secondary === 6) {
        setCombatLog((prev) => [
          ...prev,
          "Prime Attack! Choose your attacking manoeuvre.",
        ]);
        return;
      }
      playerManeuvers.forEach((m) => {
        if (m.primary === primary && m.secondary === secondary) {
          setExactStrike(true);
          setCombatLog((prev) => [...prev, `Exact Strike on ${m.name}!`]);
          return;
        }
      });
    } else {
      setEnemyRoll([primary, secondary]);
      setPlayerRoll([0, 0]);
      setOriginalRoll([primary, secondary]);
      setMaxShift(attackingEnemy.shift + shiftAdjustment);
      setCombatLog((prev) => [
        ...prev,
        `${attackingEnemy.name} rolled [${primary}, ${secondary}].`,
      ]);
      if (primary === 6 && secondary === 6) {
        setCombatLog((prev) => [
          ...prev,
          `Prime Attack! ${attackingEnemy.prime}`,
        ]);
        return;
      }
      if (primary === 1 && secondary === 1) {
        setCombatLog((prev) => [...prev, `Mishap! ${attackingEnemy.mishap}`]);
        return;
      }
    }
  };

  const canShift = (dieIndex, direction) => {
    const current =
      turn === "player" ? playerRoll[dieIndex] : enemyRoll[dieIndex];
    const original = originalRoll[dieIndex];
    const newValue = direction === "up" ? current + 1 : current - 1;

    // Die must stay within bounds
    if (newValue < 1 || newValue > 6) return false;

    const totalShiftUsed =
      turn === "player"
        ? Math.abs(playerRoll[0] - originalRoll[0]) +
          Math.abs(playerRoll[1] - originalRoll[1])
        : Math.abs(enemyRoll[0] - originalRoll[0]) +
          Math.abs(enemyRoll[1] - originalRoll[1]);

    const shiftRemaining = maxShift - totalShiftUsed;

    const isMovingTowardOriginal =
      (direction === "up" && current < original) ||
      (direction === "down" && current > original);

    if (isMovingTowardOriginal) {
      return true; // Always allowed to move toward original value
    }

    // Else, only allow if we have shift remaining
    return shiftRemaining > 0;
  };

  const rollDamage = (m) => {
    const dmg = new DiceRoll(m.damage).total;
    if (turn === "player") {
      setCombatLog((prev) => [
        ...prev,
        `You attack with ${m.name} for ${
          playerPrimeAttack || exactStrike ? dmg + maxShift : dmg
        } damage.`,
      ]);
      let interrupt = null;
      let modifier = 0;
      if (!playerPrimeAttack) {
        targetedEnemy.interrupts.forEach((i) => {
          if (
            (i.primary.includes(m.primary) ||
              i.secondary.includes(m.secondary)) &&
            Math.abs(i.modifier) > modifier
          ) {
            interrupt = i;
            modifier = i.modifier;
          }
        });
        if (interrupt) {
          setCombatLog((prev) => [
            ...prev,
            `${targetedEnemy.name} interrupts with ${interrupt.name} for ${modifier} damage.`,
          ]);
        }
      }
      let totalDmg;
      if (playerPrimeAttack) {
        totalDmg = dmg + maxShift;
      } else if (exactStrike) {
        totalDmg =
          dmg + maxShift + modifier < 0 ? 0 : dmg + maxShift + modifier;
      } else {
        totalDmg = dmg + modifier < 0 ? 0 : dmg + modifier;
      }
      setCombatLog((prev) => [
        ...prev,
        `${targetedEnemy.name} takes ${totalDmg} damage.`,
      ]);
      const newHp =
        targetedEnemy.hp - totalDmg < 0 ? 0 : targetedEnemy.hp - totalDmg;
      updateEnemy(targetedEnemyIndex, { hp: newHp });
      if (newHp === 0) {
        setCombatLog((prev) => [...prev, `The ${targetedEnemy.name} is dead.`]);
        setEnemies((prevEnemies) => {
          const updated = [...prevEnemies];
          updated.splice(targetedEnemyIndex, 1);

          if (updated.length === 0) {
            setCombatLog((prev) => [...prev, "All enemies defeated."]);
            setCombatLog((prev) => [...prev, "END COMBAT"]);
          } else {
            setTargetedEnemyIndex((prev) =>
              prev >= updated.length ? updated.length - 1 : prev
            );
            setAttackingEnemyIndex((prev) =>
              prev >= updated.length ? updated.length - 1 : prev
            );
          }

          return updated;
        });
        setCombatLog((prev) => [...prev, "NEXT TURN"]);

        return;
      } else {
        setCombatLog((prev) => [...prev, "NEXT TURN"]);
      }
    } else {
      setCombatLog((prev) => [
        ...prev,
        `${attackingEnemy.name} attacks with ${m.name} for ${dmg} damage.`,
      ]);
      let armor = null;
      let modifier = 0;
      playerArmor.forEach((a) => {
        if (typeof a.primary === "number") {
          if (
            (a.primary === m.dice[0] || a.secondary === m.dice[1]) &&
            Math.abs(a.modifier) > modifier
          ) {
            armor = a;
            modifier = a.modifier;
          }
        } else {
          if (
            (a.primary.includes(m.dice[0]) ||
              a.secondary.includes(m.dice[1])) &&
            Math.abs(a.modifier) > modifier
          ) {
            armor = a;
            modifier = a.modifier;
          }
        }
      });
      if (armor) {
        setCombatLog((prev) => [
          ...prev,
          `You defend with ${armor.name} for ${modifier} damage.`,
        ]);
      }
      const totalDmg = dmg + modifier < 0 ? 0 : dmg + modifier;
      setCombatLog((prev) => [...prev, `You take ${totalDmg} damage.`]);
      const newHp = store.hp - totalDmg < 0 ? 0 : store.hp - totalDmg;
      store.setCharacter({ hp: newHp });
      if (m?.special) {
        setCombatLog((prev) => [...prev, `Special: ${m.special}`]);
      }
      let numAttacks = [...enemyAttacks, attackingEnemyIndex];
      setEnemyAttacks((prev) => [...prev, attackingEnemyIndex]);
      if (newHp === 0 && !playerIsDead) {
        setPlayerIsDead(true);
        deadRef.current?.showModal();
      } else {
        if (numAttacks.length === enemies.length) {
          setCombatLog((prev) => [...prev, "NEXT TURN"]);
          setEnemyAttacks([]);
        } else {
          nextEnemy();
        }
      }
    }
  };

  const updateEnemy = (index, updates) => {
    setEnemies((prev) =>
      prev.map((e, i) => (i === index ? { ...e, ...updates } : e))
    );
  };

  const nextEnemy = (updatedEnemyAttacks = enemyAttacks) => {
    console.log("enemy attacks: ", updatedEnemyAttacks);
    setTurn("enemy");

    let nextIndex = attackingEnemyIndex;
    const attackedSet = new Set(updatedEnemyAttacks);

    // Find the next enemy that hasn't attacked yet
    for (let i = 0; i < enemies.length; i++) {
      nextIndex = (nextIndex + 1) % enemies.length;
      if (!attackedSet.has(nextIndex)) break;
    }

    setAttackingEnemyIndex(nextIndex);
    const nextEnemy = enemies[nextIndex];

    setEnemyRoll([0, 0]);
    setCombatLog((prev) => [...prev, `${nextEnemy.name} attacks. Click ROLL.`]);
  };

  const nextTurn = (updatedEnemyAttacks = enemyAttacks) => {
    setHasRolledThisTurn(false);
    if (turn === "enemy" && updatedEnemyAttacks.length < enemies.length) {
      nextEnemy(updatedEnemyAttacks);
      return;
    }
    const newTurnCount = turnCount + 1;
    setTurnCount(newTurnCount);
    if (newTurnCount > 1 && newTurnCount % 2 === 1) {
      setRound((prev) => prev + 1);
      increaseFatigue();
    }
    if (turn === "player") {
      setPlayerPrimeAttack(false);
      setExactStrike(false);
      setTurn("enemy");
      setEnemyAttacks([]);
      setCombatLog((prev) => [
        ...prev,
        `${attackingEnemy.name} attacks. Click ROLL.`,
      ]);
    } else {
      setTurn("player");
      setCombatLog((prev) => [...prev, `You attack. Click ROLL.`]);
    }
  };

  const increaseFatigue = () => {
    const newFatigue = fatigue + 1;
    if (newFatigue > 6) return;
    setFatigue(newFatigue);
    if (newFatigue > 3) {
      setShiftAdjustment((prev) => prev + 1);
    }
  };

  const endCombat = () => {
    let totalXp = 0;
    origEnemies.forEach((enemy) => (totalXp = totalXp + enemy.xp));
    store.setCharacter({ xp: parseInt(store.xp) + totalXp });
    let treasures = [];
    origEnemies.forEach((enemy) => treasures.push(enemy.treasure));
    store.addMessage(`Treasure: ${treasures.join(", ")}`);
    store.addMessage(`XP: ${totalXp}`);
    store.addMessage(`You have survived the fight. Your rewards:`);
    store.addMessage("--------------------");
    closeModal();
  };

  return (
    <>
      <dialog ref={ref} onCancel={closeModal} className={styles.modal}>
        <div className={styles.combatUi}>
          <div className={styles.player}>
            <h2>{store.name}</h2>
            <div className={styles.statsBlock}>
              <div className={styles.label}>HP</div>
              <div className={styles.value}>
                {store.hp}/{store.maxHp}{" "}
                <button
                  onClick={() => store.setCharacter({ hp: store.hp + 1 })}
                >
                  &uarr;
                </button>
                <button
                  onClick={() => store.setCharacter({ hp: store.hp - 1 })}
                >
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
              {playerManeuvers.map((m) => {
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
              {playerArmor.map((a) => {
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
          </div>
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
                      setPlayerRoll((prev) => [
                        Math.min(prev[0] + 1, 6),
                        prev[1],
                      ])
                    }
                  >
                    &uarr;
                  </button>
                  <button
                    disabled={!canShift(0, "down")}
                    onClick={() =>
                      setPlayerRoll((prev) => [
                        Math.max(prev[0] - 1, 1),
                        prev[1],
                      ])
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
                      setPlayerRoll((prev) => [
                        prev[0],
                        Math.min(prev[1] + 1, 6),
                      ])
                    }
                  >
                    &uarr;
                  </button>
                  <button
                    disabled={!canShift(1, "down")}
                    onClick={() =>
                      setPlayerRoll((prev) => [
                        prev[0],
                        Math.max(prev[1] - 1, 1),
                      ])
                    }
                  >
                    &darr;
                  </button>
                </div>
                <div>
                  <button disabled={!hasRolledThisTurn} onClick={nextTurn}>
                    MISS
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
                      setEnemyRoll((prev) => [
                        Math.min(prev[0] + 1, 6),
                        prev[1],
                      ])
                    }
                  >
                    &uarr;
                  </button>
                  <button
                    disabled={!canShift(0, "down")}
                    onClick={() =>
                      setEnemyRoll((prev) => [
                        Math.max(prev[0] - 1, 1),
                        prev[1],
                      ])
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
                      setEnemyRoll((prev) => [
                        prev[0],
                        Math.min(prev[1] + 1, 6),
                      ])
                    }
                  >
                    &uarr;
                  </button>
                  <button
                    disabled={!canShift(1, "down")}
                    onClick={() =>
                      setEnemyRoll((prev) => [
                        prev[0],
                        Math.max(prev[1] - 1, 1),
                      ])
                    }
                  >
                    &darr;
                  </button>
                </div>
                <div>
                  <button
                    disabled={!hasRolledThisTurn}
                    onClick={() => {
                      const updatedEnemyAttacks = [
                        ...enemyAttacks,
                        attackingEnemyIndex,
                      ];
                      setEnemyAttacks(updatedEnemyAttacks);
                      nextTurn(updatedEnemyAttacks);
                    }}
                  >
                    MISS
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
        </div>
      </dialog>
      <dialog ref={deadRef} className={styles.dead}>
        <div>
          <img src="/skull.svg" alt="dead" width="200" />
          <h1>YOU ARE DEAD</h1>
          <button onClick={onDeath}>Main Menu</button>
        </div>
      </dialog>
    </>
  );
};
