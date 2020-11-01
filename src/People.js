import React from "react";
import { people } from "./_people.js";
import "./People.scss";
import { useHistory } from "react-router-dom";
import wordsToNumbers from "words-to-numbers";

function People(props) {
  const history = useHistory();
  // const voiceNav = useVoiceNav();
  const goToPersonById = (id) => {
    id = wordsToNumbers(id);
    history.push("/person/" + id);
  };

  window.annyang.addCommands({ "navigate to person :id": goToPersonById });
  return (
    <div className="App">
      <header className="App-header">
        <p>People page</p>
        <div className="list">
          {people.map((p) => (
            <div
              className="list-item"
              onClick={() => history.push("/person/" + p.id)}
            >
              <span style={{ width: "40%" }}>{p.name}</span>
              <span style={{ width: "20%" }}>{p.age}</span>
              <span style={{ width: "40%" }}>{p.email}</span>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default People;
