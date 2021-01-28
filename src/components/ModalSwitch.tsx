import { useRef, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Home from "./Home";
import Modal from "./Modal";
import PostView from "./PostView";

const ModalSwitch: React.FC = () => {
  const location: any = useLocation();
  const previousLocation = useRef(location);
  const history = useHistory();

  useEffect(() => {
    if (history.action !== "POP" && (!location.state || !location.state.modal)) {
      previousLocation.current = location;
    }
  }, [history, location]);

  const isModal = !!(location.state && location.state.modal && previousLocation.current !== location);

  return (
    <>
      <Switch location={isModal ? previousLocation.current : location}>
        <Route exact path="/" component={Home} />
        <Route path="/view/:id" component={PostView} />
      </Switch>

      {isModal ? <Route path="/view/:id" component={Modal} /> : null}
    </>
  );
};

export default ModalSwitch;
