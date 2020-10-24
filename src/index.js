import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import VoiceNavigator from "./VoiceNavigator";
import NotFound from "./NotFound";
import About from "./About";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <VoiceNavigator>
        <Switch>
          <Route path="/" exact component={App} voiceTrigger="home" />
          <Route path="/about" exact component={About} voiceTrigger="about" />
          <Route component={NotFound} />
        </Switch>
      </VoiceNavigator>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
