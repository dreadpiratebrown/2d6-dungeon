import { useState } from "react";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import styles from "./styles.module.css";

export const GameTools = () => {
  const [nroll, setNroll] = useState("d6");
  const [nresult, setNresult] = useState();
  const [d66result, setD66result] = useState();

  const rollN = () => {
    const roll = new DiceRoll(nroll);
    setNresult(roll.total);
  };

  const rollD66 = () => {
    const primary = new DiceRoll("d6").total;
    const secondary = new DiceRoll("d6").total;
    setD66result(JSON.stringify([primary, secondary]));
  };

  return (
    <div className={styles.tools}>
      <h2>Game Tools</h2>
      <div>
        <label htmlFor="nd6">Roll nD6 (ex: 3d6 + 1)</label>
        <input
          type="text"
          value={nroll}
          onChange={(e) => setNroll(e.target.value)}
        />
        <button onClick={rollN}>Roll</button>
        Result: {nresult}
      </div>
      <div>
        <label>Roll D66</label>
        <button onClick={rollD66}>Roll</button>
        Result: {d66result}
      </div>
    </div>
  );
};
