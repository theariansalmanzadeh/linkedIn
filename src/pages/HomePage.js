import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "../components/Layout/Layout";
import Home from "../components/Layout/Home";

function ProtectedHome() {
  const auth = useSelector((state) => state.logIn.auth);

  const history = useHistory();

  if (auth === "") {
    history.push("/login");
  }

  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default ProtectedHome;
