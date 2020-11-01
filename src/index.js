import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import VoiceNavigator from "./VoiceNavigator";
import NotFound from "./NotFound";
import About from "./About";
import Nav from "./Nav";
import Contact from "./Contact";
import People from "./People";
import Person from "./Person";

function MyApp(props) {
  return (
    <BrowserRouter>
      <Nav />
      <VoiceNavigator showCaptions>
        <Switch>
          <Route
            path="/"
            exact
            component={App}
            voiceCommand="navigate to home"
          />
          <Route
            path="/about"
            exact
            component={About}
            voiceCommand="navigate to about"
          />
          <Route
            path="/contact"
            exact
            component={Contact}
            voiceCommand="navigate to contact"
          />
          <Route
            path="/people"
            exact
            component={People}
            voiceCommand="navigate to people"
          />
          <Route path="/person/:id" exact component={Person} />
          <Route component={NotFound} />
        </Switch>
      </VoiceNavigator>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>,
  document.getElementById("root")
);
