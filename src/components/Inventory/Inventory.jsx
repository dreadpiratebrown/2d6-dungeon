import { useEffect, useRef, useState } from "react";
import { useBoundStore } from "../../store/boundStore";
import styles from "./styles.module.css";

export const Inventory = () => {
  const [items, setItems] = useState(Array(10).fill(""));
  const store = useBoundStore();
  const isInitializing = useRef(true);

  useEffect(() => {
    const padded = [...store.large_items];
    while (padded.length < 10) padded.push("");
    setItems(padded);
    isInitializing.current = true;
  }, [store.large_items]);

  useEffect(() => {
    if (isInitializing.current) {
      // Skip saving to store on initial sync
      isInitializing.current = false;
      return;
    }
    store.setInventory({ large_items: items.slice(0, 10) });
  }, [items]);

  const handleChange = (index, value) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <div className={styles.inventory}>
      <div className={styles.row}>
        <div className={styles.label}>GC</div>
        <div className={styles.value}>
          <input
            className={styles.coins}
            type="text"
            value={store.gold}
            onChange={(e) => {
              const parsed = parseInt(e.target.value);
              store.setInventory({ gold: isNaN(parsed) ? 0 : parsed });
            }}
          />
        </div>
        <div className={styles.label}>SC</div>
        <div className={styles.value}>
          <input
            className={styles.coins}
            type="text"
            value={store.silver}
            onChange={(e) => {
              const parsed = parseInt(e.target.value);
              store.setInventory({ silver: isNaN(parsed) ? 0 : parsed });
            }}
          />
        </div>
        <div className={styles.label}>CC</div>
        <div className={styles.value}>
          <input
            className={styles.coins}
            type="text"
            value={store.copper}
            onChange={(e) => {
              const parsed = parseInt(e.target.value);
              store.setInventory({ copper: isNaN(parsed) ? 0 : parsed });
            }}
          />
        </div>
      </div>
      <div className={styles.label}>Treasure</div>
      <div className={styles.value}>
        <textarea
          value={store.treasure}
          onChange={(e) => store.setInventory({ treasure: e.target.value })}
        ></textarea>
      </div>
      <div className={styles.label}>Small Items</div>
      <div className={styles.value}>
        <textarea
          value={store.small_items}
          onChange={(e) => store.setInventory({ small_items: e.target.value })}
        ></textarea>
      </div>
      <div className={styles.label}>Large and Heavy Items</div>
      <div className={styles.value}>
        <ol className={styles.largeItemList}>
          {items.map((item, index) => (
            <li key={index}>
              <input
                type="text"
                className={styles.largeItem}
                value={item}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.label}>Loot Lockup</div>
      <div className={styles.value}>
        <textarea
          value={store.loot_lockup}
          onChange={(e) => store.setInventory({ loot_lockup: e.target.value })}
        ></textarea>
      </div>
    </div>
  );
};
