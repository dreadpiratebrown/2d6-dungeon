import { useCombat } from "../../hooks/useCombat";
import { CombatPanel, Enemies, Player, ThrowWeapon } from "../Combat";
import styles from "./styles.module.css";

export const Combat = ({ openModal, closeModal, enemyIds, onDeath }) => {
  const {
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
  } = useCombat({ openModal, closeModal, enemyIds });

  return (
    <>
      <dialog ref={ref} onCancel={closeModal} className={styles.modal}>
        <div className={styles.combatUi}>
          <Player
            store={store}
            turn={turn}
            hasRolledThisTurn={hasRolledThisTurn}
            remainingShift={remainingShift}
            playerManeuvers={playerManeuvers}
            playerPrimeAttack={playerPrimeAttack}
            playerRoll={playerRoll}
            maxShift={maxShift}
            rollDamage={rollDamage}
            playerArmor={playerArmor}
            throwRef={throwRef}
            didThrow={didThrow}
          />
          <Enemies
            enemies={enemies}
            targetedEnemy={targetedEnemy}
            setTargetedEnemyIndex={setTargetedEnemyIndex}
            updateEnemy={updateEnemy}
            turn={turn}
            hasRolledThisTurn={hasRolledThisTurn}
            remainingShift={remainingShift}
            attackingEnemy={attackingEnemy}
            enemyRoll={enemyRoll}
            maxShift={maxShift}
            rollDamage={rollDamage}
          />
          <CombatPanel
            fatigue={fatigue}
            shiftAdjustment={shiftAdjustment}
            turn={turn}
            rollAttack={rollAttack}
            playerRoll={playerRoll}
            canShift={canShift}
            setPlayerRoll={setPlayerRoll}
            hasRolledThisTurn={hasRolledThisTurn}
            nextTurn={nextTurn}
            enemies={enemies}
            attackingEnemy={attackingEnemy}
            setAttackingEnemyIndex={setAttackingEnemyIndex}
            enemyRoll={enemyRoll}
            setEnemyRoll={setEnemyRoll}
            enemyAttacks={enemyAttacks}
            attackingEnemyIndex={attackingEnemyIndex}
            setEnemyAttacks={setEnemyAttacks}
            combatLog={combatLog}
            endCombat={endCombat}
          />
        </div>
      </dialog>
      <dialog ref={deadRef} className={styles.dead}>
        <div>
          <img src="/skull.svg" alt="dead" width="200" />
          <h1>YOU ARE DEAD</h1>
          <button onClick={onDeath}>Main Menu</button>
        </div>
      </dialog>
      <ThrowWeapon
        ref={throwRef}
        store={store}
        setThrownWeapon={setThrownWeapon}
        throwMod={throwMod}
        setThrowMod={setThrowMod}
        enemies={enemies}
        thrownWeapon={thrownWeapon}
        throwWeapon={throwWeapon}
        didThrow={didThrow}
        throwLog={throwLog}
      />
    </>
  );
};
