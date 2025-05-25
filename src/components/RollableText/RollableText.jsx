export const RollableText = ({ text, onRoll, onEvent, onCheck }) => {
  const parts = text.split(
    /(<event:[\w-]+[:\d|\w|\s-]+>|#\w+\-?\+?\d?|%\w+\(\d\))/g
  ); // Splits into normal text, #TAGS and events

  function parseId(str) {
    const match = str.match(/^([A-Z0-9]+)([+-]\d+)?$/);
    if (!match) return null;
    return {
      id: match[1],
      modifier: match[2] || null,
    };
  }

  function getPrecision(str) {
    const match = str.match(/^(PC)([0-9]+)(\(\d\))$/);
    if (!match) return null;
    return {
      target: match[2],
    };
  }

  const btnStyle = {
    color: "blue",
    textDecoration: "underline",
    background: "none",
    border: "none",
    cursor: "pointer",
  };

  const events = {
    picklock: "Pick Lock",
    combat: "Fight!",
  };

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("#")) {
          const tableId = part.slice(1);
          return (
            <button
              key={index}
              onClick={() => onRoll(parseId(tableId))}
              style={btnStyle}
            >
              {tableId}
            </button>
          );
        }
        if (part.startsWith("%")) {
          const precisionCheck = part.slice(1);
          return (
            <button
              key={index}
              onClick={() => onCheck(getPrecision(precisionCheck))}
              style={btnStyle}
            >
              {precisionCheck}
            </button>
          );
        }
        if (part.startsWith("<event:")) {
          const match = part.match(
            /<event:([^:>]+)(?::([^:>]+))?(?::([^>]+))?>$/
          );
          let eventType, param1, param2;
          if (match) {
            [, eventType, param1, param2] = match;
          }
          return (
            <button
              key={index}
              onClick={() => onEvent(eventType, param1, param2)}
              style={btnStyle}
            >
              {events[eventType]}
            </button>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};
