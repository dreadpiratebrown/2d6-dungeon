import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { precisionCheck, rollOnTable } from "./utils/utils";
import { RollableText } from "./components/RollableText";
import { useBoundStore } from "./store/boundStore";
import { StartMenu } from "./components/StartMenu";
import { Setup } from "./components/Setup";
import { Dungeon } from "./components/Dungeon";
import { Character } from "./components/Character";
import { Equipment } from "./components/Equipment";
import { Trackers } from "./components/Trackers";
import { Inventory } from "./components/Inventory";
import { Notes } from "./components/Notes";
import { GameTools } from "./components/GameTools";
import { Combat, PickLock } from "./components/Dialogs";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState("start");
  const [showCombat, setShowCombat] = useState(false);
  const [showPickLock, setShowPickLock] = useState(false);
  const [doorId, setDoorId] = useState(null);
  const [enemyIds, setEnemyIds] = useState([]);
  const store = useBoundStore();

  const newGame = () => {
    store.resetGame();
    store.resetCharacter();
    store.resetEquipment();
    store.resetTrackers();
    store.resetInventory();
    store.resetNotes();
    setGameState("setup");
  };

  const startGame = () => {
    setGameState("play");
  };

  const loadGame = () => {
    // load game from localstorage
    setGameState("play");
  };

  const handleEvent = (type, id, id2) => {
    if (type === "picklock") {
      setShowPickLock(true);
      setDoorId(id);
    }
    if (type === "combat") {
      const ids = [id];
      if (id2) {
        ids.push(id2);
      }
      setShowCombat(true);
      setEnemyIds(ids);
    }
  };

  return (
    <>
      {gameState === "start" && (
        <StartMenu onNewClick={newGame} onLoadClick={loadGame} />
      )}
      {gameState === "setup" && <Setup onStart={startGame} />}
      {gameState === "play" && (
        <div className="uiWrapper">
          <Tabs className="tabs">
            <TabList>
              <Tab>Dungeon</Tab>
              <Tab>Character</Tab>
              <Tab>Equipment</Tab>
              <Tab>Trackers</Tab>
              <Tab>Inventory</Tab>
              <Tab>Notes</Tab>
            </TabList>
            <TabPanel forceRender={true}>
              <Dungeon />
            </TabPanel>
            <TabPanel>
              <Character />
            </TabPanel>
            <TabPanel>
              <Equipment />
            </TabPanel>
            <TabPanel>
              <Trackers />
            </TabPanel>
            <TabPanel>
              <Inventory />
            </TabPanel>
            <TabPanel>
              <Notes />
            </TabPanel>
          </Tabs>
          <div className="gameLog">
            {[...store.messages].reverse().map((m, index) => (
              <RollableText
                key={index}
                text={m}
                onRoll={({ id, modifier }) => rollOnTable({ id, modifier })}
                onEvent={(type, id, id2) => handleEvent(type, id, id2)}
                onCheck={(target) => precisionCheck(target)}
              />
            ))}
          </div>
          <div className="tools">
            <GameTools />
          </div>
          <PickLock
            openModal={showPickLock}
            closeModal={() => setShowPickLock(false)}
            doorId={doorId}
            key={doorId}
          />
          <Combat
            openModal={showCombat}
            closeModal={() => setShowCombat(false)}
            enemyIds={enemyIds}
            onDeath={() => setGameState("start")}
            key={enemyIds[0]}
          />
        </div>
      )}
    </>
  );
}

export default App;
