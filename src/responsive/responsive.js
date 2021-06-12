import React from "react";
import "./responsive.scss";

const { useState } = React;

export default function App() {
  const [counter, setCounter] = useState(0);
  const [shortest, setShortest] = useState(100);

  return (
    <div className="challenges card">
      <h3 className="card-title">Challenges</h3>
      <div className="quadrants">
        <div className="quadrants-upper">
          <div className="quadrant soluations">
            <span className="quadrant-title">solutions</span>
            <button onClick={() => setCounter(counter + 1)}>+</button>
            <span className="quadrant-number">{counter}</span>
          </div>
          <div className="quadrants-upper">
            <div className="quadrant shortest">
              <span className="quadrant-title">shortest</span>
              <span className="quadrant-number">{shortest}</span>
              <button onClick={() => setShortest(shortest - 1)}>-</button>
            </div>
          </div>
        </div>

        <div className="quadrants-lower">
          <div className="quadrant first">
            <span className="quadrant-title">first</span>
            <span className="quadrant-number">1</span>
          </div>
          <div className="quadrant authored">
            <span className="quadrant-title">created</span>
            <span className="quadrant-number">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
