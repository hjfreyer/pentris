
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import shapes from '../shapes';
import PiecePreview from '../PiecePreview';

function App(): JSX.Element {
  return <div id="shape-tests">
    <h1>Shape Tests</h1>
    {
      shapes.map((_, sIdx) => (
        <div className="shape">
          <PiecePreview shapeIdx={sIdx} />
        </div>
      ))
    }
  </div>;
}

function shapeTest() {
  const root = document.getElementById('root') as HTMLElement;
  ReactDOM.render(<App/>, root);
}

export default shapeTest;
