import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { getUserData } from "./store/Login";
import SignIn from "./pages/SignIn";
import NewPassReq from "./pages/NewPassReq";
import { useSetExpireTime } from "./components/Helperfunction";

function App() {
  const dispatch = useDispatch();
  const { autoLogout } = useSetExpireTime();

  const Login = React.lazy(() => import("./pages/Login"));
  const SignUp = React.lazy(() => import("./pages/SignUp"));
  const NotFound = React.lazy(() => import("./pages/NotFound"));
  const ProtectedHome = React.lazy(() => import("./pages/HomePage.js"));

  useEffect(() => {
    const currentTime = Date.now();
    const tokenId = localStorage.getItem("token");
    const expireTime = localStorage.getItem("expireTime");

    if (tokenId !== "" && tokenId !== null) {
      if (currentTime >= expireTime) {
        autoLogout();
        return;
      }
      console.log(tokenId);
      dispatch(getUserData(tokenId));
    }
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>loding...</div>}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/newpassword">
            <NewPassReq />
          </Route>
          <Route path="/home">
            <ProtectedHome />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
