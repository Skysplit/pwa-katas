import {
  OnlineDetector,
  Map,
  Orientation,
  QrCodeScanner,
  TodoList,
} from "./components";

function App() {
  return (
    <>
      <OnlineDetector />
      <hr />
      <TodoList />
      <hr />
      <Orientation />
      <hr />
      <Map />
      <hr />
      <QrCodeScanner />
      <hr />
    </>
  );
}

export default App;
