import React from "react";
import { useHistory } from "react-router-dom";
import "./VoiceNavigator.scss";

function VoiceNavigator(props) {
  const voiceNavigator = window.annyang ? window.annyang : undefined;
  // const [voiceNavigator, setVoiceNavigator] = React.useState(window.annyang);
  const [lastTranscript, setLastTranscript] = React.useState(null);
  const [isListening, setIsListening] = React.useState(false);
  const history = useHistory();
  const showCaptions = props.showCaptions;
  const { children } = props;
  React.useEffect(() => {
    if (!voiceNavigator) return;

    // window.addEventListener("keydown", (e) => {
    //   if (e.repeat) return;
    //   else if (e.keyCode === 32) {
    //     voiceNavigator.start();
    //   }
    // });

    // window.addEventListener("keyup", (e) => {
    //   if (e.repeat) return;
    //   else if (e.keyCode === 32) {
    //     voiceNavigator.abort();
    //   }
    // });

    // children should be a Switch component
    if (
      typeof children === "object" &&
      children.type.name.toLowerCase() === "switch"
    ) {
      if (!React.isValidElement(children)) return;
      // Iterate over children of Switch compoennt (should be Route components)
      const switchChildren = children.props.children;
      const commands = {};
      switchChildren.forEach((route) => {
        if (!React.isValidElement(route)) return;
        const { props, type } = route;
        if (type.name.toLowerCase() === "route" && props.voiceCommand) {
          const { voiceCommand, voiceCommandFunc } = props;
          commands[voiceCommand] = voiceCommandFunc
            ? voiceCommandFunc
            : () => {
                history.push(props.path);
              };
        }
      });

      voiceNavigator.addCommands(commands);
    }

    voiceNavigator.addCallback("result", function (phrases) {
      // console.log("I think the user said: ", phrases[0]);
      // console.log(
      //   "But then again, it could be any of the following: ",
      //   phrases
      // );
      setLastTranscript(phrases[0]);
      setIsListening(false);
    });

    voiceNavigator.addCallback("resultMatch", function (
      userSaid,
      commandText,
      phrases
    ) {
      console.log("MATCH!");
      console.log(userSaid); // sample output: 'hello'
      console.log(commandText); // sample output: 'hello (there)'
      console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
    });

    voiceNavigator.addCallback("resultNoMatch", function (phrases) {
      console.log("NO MATCH!");
      console.log("I think the user said: ", phrases[0]);
      console.log(
        "But then again, it could be any of the following: ",
        phrases
      );
    });

    // TODO: figure out when annyang turns on/off listening
    voiceNavigator.addCallback("soundstart", function () {
      console.log("sound start!");
      setIsListening(true);
    });

    voiceNavigator.start();
  }, []);

  return (
    <>
      {props.children}
      {showCaptions && (
        <div className={`voice-captions ${isListening ? "listening" : ""}`}>
          {lastTranscript}
        </div>
      )}
    </>
  );
}

export default VoiceNavigator;
