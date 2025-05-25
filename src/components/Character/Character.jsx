import { useBoundStore } from "../../store/boundStore";
import styles from "./styles.module.css";

export const Character = () => {
  const store = useBoundStore();

  return (
    <div className={styles.character}>
      <div className={styles.row}>
        <div className={styles.label}>
          <label htmlFor="name">Name</label>
        </div>
        <div className={styles.value} style={{ gridColumn: "span 5" }}>
          <input
            type="text"
            id="name"
            value={store.name}
            onChange={(e) => store.setCharacter({ name: e.target.value })}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>
          <label htmlFor="level">Level</label>
        </div>
        <div className={styles.value}>
          <input
            type="number"
            id="level"
            min="1"
            max="10"
            value={store.level}
            onChange={(e) => store.setCharacter({ level: e.target.value })}
          />
        </div>
        <div className={styles.label}>
          <label htmlFor="hp">HP</label>
        </div>
        <div className={styles.value}>
          <input
            type="number"
            id="hp"
            min="0"
            max="125"
            value={store.hp}
            onChange={(e) => store.setCharacter({ hp: e.target.value })}
          />
        </div>
        <div className={styles.label}>
          <label htmlFor="xp">XP</label>
        </div>
        <div className={styles.value}>
          <input
            type="number"
            id="xp"
            min="0"
            max="25000"
            value={store.xp}
            onChange={(e) => store.setCharacter({ xp: e.target.value })}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>
          <label htmlFor="shift">Shift</label>
        </div>
        <div className={styles.value}>
          <input
            type="number"
            id="shift"
            min="-5"
            max="10"
            value={store.shift}
            onChange={(e) => store.setCharacter({ shift: e.target.value })}
          />
        </div>
        <div className={styles.label}>
          <label htmlFor="discipline">Discipline</label>
        </div>
        <div className={styles.value}>
          <input
            type="number"
            id="discipline"
            min="-5"
            max="10"
            value={store.discipline}
            onChange={(e) => store.setCharacter({ discipline: e.target.value })}
          />
        </div>
        <div className={styles.label}>
          <label htmlFor="precision">Precision</label>
        </div>
        <div className={styles.value}>
          <input
            type="number"
            id="precision"
            min="-5"
            max="10"
            value={store.precision}
            onChange={(e) => store.setCharacter({ precision: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
