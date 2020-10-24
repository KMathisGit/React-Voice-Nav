import React from "react";
import { useHistory } from "react-router-dom";

function VoiceNavigator(props) {
  const [voiceNavigator, setVoiceNavigator] = React.useState(window.annyang);
  const history = useHistory();

  React.useEffect(() => {
    debugger;
    if (!voiceNavigator) return;
    React.Children.map(props.children, (child) => {
      if (!React.isValidElement(child)) return;

      const commands = {};
      if (child.props.children) {
        React.Children.map(child.props.children, (grandchild) => {
          const { props, type } = grandchild;
          if (type.name.toLowerCase() === "route" && props.voiceTrigger) {
            const commandKey = `navigate to ${props.voiceTrigger}`;
            commands[commandKey] = () => {
              history.push(`${props.path}`);
            };
          }
        });
      }

      voiceNavigator.addCallback("result", function (phrases) {
        console.log("I think the user said: ", phrases[0]);
        console.log(
          "But then again, it could be any of the following: ",
          phrases
        );
      });

      voiceNavigator.addCommands(commands);
      voiceNavigator.start();
    });
  }, [props.children, history, voiceNavigator]);

  return props.children;
}

export default VoiceNavigator;
