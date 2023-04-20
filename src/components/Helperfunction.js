import React from "react";
import { useDispatch } from "react-redux";
import { LogInActions } from "../store/Login";

export const useSetExpireTime = () => {
  const dispatch = useDispatch();

  const setExpireTime = function (expireTime) {
    const now = Date.now();

    let expiringTime = now + expireTime * 1000;

    localStorage.setItem("expireTime", expiringTime);

    console.log(expireTime);
    console.log(expiringTime);
  };
  const autoLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
  };

  return {
    autoLogout,
    setExpireTime,
  };
};
