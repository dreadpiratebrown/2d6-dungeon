import { useBoundStore } from "../../store/boundStore";
import styles from "./styles.module.css";

export const Trackers = () => {
  const store = useBoundStore();

  const handleTrackChange = (track, index) => {
    const newValue = index + 1 === store[track] ? index : index + 1;
    store.setTrackers({ [track]: newValue });
  };

  const renderFavorTrack = (god, label) => (
    <>
      <div className={styles.value}>{label}</div>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.value}>
          <input
            type="checkbox"
            checked={index < store[god]}
            onChange={() => handleTrackChange(god, index)}
          />
        </div>
      ))}
    </>
  );

  const renderConditionTrack = (condition, label) => (
    <>
      <div className={styles[condition]}>{label}</div>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className={styles.value}>
          <input
            type="checkbox"
            checked={index < store[condition]}
            onChange={() => handleTrackChange(condition, index)}
          />
        </div>
      ))}
      <div className={styles.value}>
        {condition === "bloodied"
          ? "FEVER -1 HP per room until washed"
          : "PNEUMONIA -1 HP per room until heated"}
      </div>
    </>
  );

  const renderLegendTrack = () => (
    <>
      <div className={styles.legend}>LEGEND STATUS LEVEL TRACKER</div>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className={styles.value}>
          <input
            id={`level${index}`}
            type="checkbox"
            checked={index < store.legend_status}
            onChange={() => handleTrackChange("legend_status", index)}
          />
          <br />
          <label htmlFor={`level${index}`}>{index + 1}</label>
        </div>
      ))}
    </>
  );

  return (
    <div className={styles.trackers}>
      <div
        className={styles.row}
        style={{ gridTemplateColumns: "repeat(4, auto)" }}
      >
        <div className={styles.label}>Liberated Prisoners</div>
        <div className={styles.value}>
          <input
            type="number"
            value={store.prisoners}
            min="0"
            onChange={(e) =>
              store.setTrackers({ prisoners: parseInt(e.target.value) })
            }
          />
        </div>
        <div className={styles.label}>Rations</div>
        <div className={styles.value}>
          <input
            type="number"
            value={store.rations}
            min="0"
            step="1"
            onChange={(e) =>
              store.setTrackers({ rations: parseInt(e.target.value) })
            }
          />
        </div>
      </div>
      <div
        className={styles.row}
        style={{ gridTemplateColumns: "repeat(7, auto)" }}
      >
        <div className={styles.label}>Favour of the Gods</div>
        <div className={styles.label} style={{ gridColumn: "span 6" }}>
          Favour Points
        </div>
        {renderFavorTrack("grakada", "GRAKADA The Core")}
        {renderFavorTrack("intuneric", "INTUNERIC The Murk")}
        {renderFavorTrack("maduva", "MADUVA The Rot")}
        {renderFavorTrack("murataynie", "MURATAYNIE The Pulp")}
        {renderFavorTrack("nevazator", "NEVAZATOR The Blind")}
        {renderFavorTrack("radacina", "RADACINA The Radix")}
      </div>
      <div
        className={styles.row}
        style={{ gridTemplateColumns: "repeat(10, auto)" }}
      >
        {renderConditionTrack("bloodied", "BLOODIED")}
        {renderConditionTrack("soaked", "SOAKED")}
      </div>
      <div
        className={styles.row}
        style={{ gridTemplateColumns: "repeat(11, auto)" }}
      >
        {renderLegendTrack()}
      </div>
    </div>
  );
};
