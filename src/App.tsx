import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import ModalSwitch from "./components/ModalSwitch";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route component={ModalSwitch} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
