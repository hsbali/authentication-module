import Routes from "./routes";

import AlertContainer from "./components/Alert";
import "./styles/global.scss";

export default function App() {
  return (
    <>
      <AlertContainer />
      <Routes />
    </>
  );
}
