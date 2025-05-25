import { useBoundStore } from "../../store/boundStore";
import styles from "./styles.module.css";

export const Notes = () => {
  const store = useBoundStore();

  return (
    <div className={styles.notes}>
      <div className={styles.label}>Side Quests</div>
      <div className={styles.value}>
        <textarea
          value={store.side_quests}
          onChange={(e) => store.setNotes({ side_quests: e.target.value })}
        ></textarea>
      </div>
      <div className={styles.label}>Narrative Moments</div>
      <div className={styles.value}>
        <textarea
          value={store.narrative}
          onChange={(e) => store.setNotes({ narrative: e.target.value })}
        ></textarea>
      </div>
      <div className={styles.label}>Additional Notes</div>
      <div className={styles.value}>
        <textarea
          value={store.notes}
          onChange={(e) => store.setNotes({ notes: e.target.value })}
        ></textarea>
      </div>
    </div>
  );
};
