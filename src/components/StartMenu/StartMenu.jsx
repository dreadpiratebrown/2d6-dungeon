import styles from "./styles.module.css";

export const StartMenu = ({ onNewClick, onLoadClick }) => {
  return (
    <div className={styles.startMenu}>
      <img src="/2d6-logo.png" alt="2D6 Dungeon Compatible" />
      <button className={styles.button} onClick={onNewClick}>
        New Game
      </button>
      <button className={styles.button} onClick={onLoadClick}>
        Load Game
      </button>
    </div>
    // Knight by Robert Bjurshagen from <a href="https://thenounproject.com/browse/icons/term/knight/" target="_blank" title="Knight Icons">Noun Project</a> (CC BY 3.0)
    // longsword by Robert Bjurshagen from <a href="https://thenounproject.com/browse/icons/term/longsword/" target="_blank" title="longsword Icons">Noun Project</a> (CC BY 3.0)
    // Mace by Amethyst Studio from <a href="https://thenounproject.com/browse/icons/term/mace/" target="_blank" title="Mace Icons">Noun Project</a> (CC BY 3.0)
    // Axe by Olifernes Tejeros from <a href="https://thenounproject.com/browse/icons/term/axe/" target="_blank" title="Axe Icons">Noun Project</a> (CC BY 3.0)
    // armor by Eucalyp from <a href="https://thenounproject.com/browse/icons/term/armor/" target="_blank" title="armor Icons">Noun Project</a> (CC BY 3.0)
    // Magic Scroll by Robert Bjurshagen from <a href="https://thenounproject.com/browse/icons/term/magic-scroll/" target="_blank" title="Magic Scroll Icons">Noun Project</a> (CC BY 3.0)
    // dice roll by counloucon from <a href="https://thenounproject.com/browse/icons/term/dice-roll/" target="_blank" title="dice roll Icons">Noun Project</a> (CC BY 3.0)
    // Lock Door by siti muayanah from <a href="https://thenounproject.com/browse/icons/term/lock-door/" target="_blank" title="Lock Door Icons">Noun Project</a> (CC BY 3.0)
    // Skull by DaeSung LEE from <a href="https://thenounproject.com/browse/icons/term/skull/" target="_blank" title="Skull Icons">Noun Project</a> (CC BY 3.0)
    // Target by Barracuda from <a href="https://thenounproject.com/browse/icons/term/target/" target="_blank" title="Target Icons">Noun Project</a> (CC BY 3.0)
  );
};
