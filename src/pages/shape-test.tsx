import * as React from "react";
import * as ReactDOM from "react-dom";

import * as shape from "../game/shape";
import PiecePreview from "../views/PiecePreview";

function App(): JSX.Element {
  return (
    <div id="shape-tests">
      <h1>Shape Tests</h1>
      {Array.from({ length: shape.NUM_SHAPES }, (_, sIdx) => (
        <div className="shape">
          <PiecePreview shapeIdx={sIdx} />
        </div>
      ))}
    </div>
  );
}

function shapeTest() {
  const root = document.getElementById("root") as HTMLElement;
  ReactDOM.render(<App />, root);
}

export default shapeTest;
