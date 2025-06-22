import { useEffect, useRef, useState } from "react";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { useBoundStore } from "../store/boundStore";
import { enemiesl1 } from "../shared/enemies-level-one";
import { maneuvers } from "../shared/maneuvers";
import { armor } from "../shared/armor";

export const useCombat = ({ openModal, closeModal, enemyIds }) => {
  const [enemies, setEnemies] = useState([]);
  const [origEnemies, setOrigEnemies] = useState([]);
  const [targetedEnemyIndex, setTargetedEnemyIndex] = useState(0);
  const [attackingEnemyIndex, setAttackingEnemyIndex] = useState(0);
  const [enemyAttacks, setEnemyAttacks] = useState([]);
  const [turn, setTurn] = useState("player");
  const [turnCount, setTurnCount] = useState(1);
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
  const [thrownWeapon, setThrownWeapon] = useState();
  const [throwMod, setThrowMod] = useState(0);
  const [didThrow, setDidThrow] = useState(false);
  const [throwLog, setThrowLog] = useState([]);
  const ref = useRef();
  const deadRef = useRef();
  const throwRef = useRef();
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
      setOrigEnemies(enemyObjects);
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
            setCombatLog((prev) => [...prev, "NEXT TURN"]);
          }

          return updated;
        });

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

  const throwWeapon = (enemy, index) => {
    setDidThrow(true);
    const primary = new DiceRoll("d6").total;
    const secondary = new DiceRoll("d6").total;
    setThrowLog((prev) => [...prev, `You rolled [${primary}, ${secondary}]`]);
    let block = 0;
    enemy.interrupts.forEach((i) => {
      if (i.primary.includes(primary)) {
        block += i.modifier;
      }
      if (i.secondary.includes(secondary)) {
        block += i.modifier;
      }
    });
    setThrowLog((prev) => [
      ...prev,
      `The ${enemy.name} blocks for ${block} damage`,
    ]);
    let damage = 0;
    if (thrownWeapon === "axe") {
      damage = 6 + throwMod + block;
    } else if (thrownWeapon === "knife") {
      damage = 4 + throwMod + block;
    } else if (thrownWeapon === "dart") {
      damage = 2 + throwMod + block;
    }
    setThrowLog((prev) => [
      ...prev,
      `Your ${thrownWeapon} hits for ${damage} total damage`,
    ]);
    const newHp = enemy.hp - damage < 0 ? 0 : enemy.hp - damage;
    updateEnemy(index, { hp: newHp });
    if (newHp === 0) {
      setCombatLog((prev) => [...prev, `The ${enemy.name} is dead.`]);
      setEnemies((prevEnemies) => {
        const updated = [...prevEnemies];
        updated.splice(index, 1);

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
          setCombatLog((prev) => [...prev, "BEGIN COMBAT"]);
        }

        return updated;
      });

      return;
    } else {
      setCombatLog((prev) => [...prev, "BEGIN COMBAT"]);
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

  return {
    enemies,
    setTargetedEnemyIndex,
    attackingEnemyIndex,
    setAttackingEnemyIndex,
    enemyAttacks,
    setEnemyAttacks,
    turn,
    fatigue,
    shiftAdjustment,
    playerRoll,
    setPlayerRoll,
    enemyRoll,
    setEnemyRoll,
    combatLog,
    maxShift,
    hasRolledThisTurn,
    playerPrimeAttack,
    thrownWeapon,
    setThrownWeapon,
    throwMod,
    setThrowMod,
    didThrow,
    throwLog,
    ref,
    deadRef,
    throwRef,
    store,
    playerManeuvers,
    playerArmor,
    remainingShift,
    targetedEnemy,
    attackingEnemy,
    rollAttack,
    canShift,
    rollDamage,
    updateEnemy,
    nextTurn,
    throwWeapon,
    endCombat,
  };
};
