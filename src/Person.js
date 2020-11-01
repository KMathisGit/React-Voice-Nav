import React from "react";
import { people } from "./_people.js";
import { useParams } from "react-router-dom";

function Person(props) {
  const params = useParams();
  const { id } = params;
  const [person, setPerson] = React.useState(people.find((p) => p.id == id));
  debugger;

  return (
    <div className="App">
      <header className="App-header">
        <p>Person page</p>
        <div>{JSON.stringify(person, null, 2)}</div>
      </header>
    </div>
  );
}

export default Person;
