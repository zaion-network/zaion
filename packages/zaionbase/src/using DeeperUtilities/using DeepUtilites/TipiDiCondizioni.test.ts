import { Application } from "./using LowUtilities/using Utilities/using HighUtilities/Application";

const App = Application;
const Block = Application.Block;
const Condition = Application.Condition.Boolean;

const app = new App("new");
const isConnected = new Block(() => {
  console.log("eccomi");
  return false;
}, []);
const showStuff = new Block(() => {
  console.log("showing stuff");
  return true;
}, []);
const connect = new Block(() => {
  console.log("connect");
  return true;
}, []);
const disconnect = new Block(() => {
  console.log("disconnect");
  return true;
}, []);
const waitForConnection = new Block(() => {
  console.log("wait for conn");
  return false;
}, []);

const isConnectedTrue = new Condition(true, showStuff);
const waitForConnectionTrue = new Condition(true, connect);
const waitForConnectionFalse = new Condition(false, disconnect);
const isConnectedFalse = new Condition(false, waitForConnection);

app.start(
  isConnected
    .addCondition(isConnectedTrue)
    .addCondition(
      isConnectedFalse
        .addConditionToBlock(waitForConnectionTrue)
        .addConditionToBlock(waitForConnectionFalse)
    )
);
if (app.nodes[0].isBlock()) {
  app.run();
}
