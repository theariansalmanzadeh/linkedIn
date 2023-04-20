import React from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles/newPassReq.module.css";

function NewPassReq() {
  const emailRef = useRef();
  const history = useHistory();

  const newPassHandler = () => {
    console.log(emailRef.current.value);
    if (emailRef.current.value === "") {
      return;
    }
    const reqPass = async () => {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCEQq3UjIOzDXyzhztbE_T696C5_WJUqw0",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailRef.current.value,
          }),
          header: {
            "Content-Type": " application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
    };

    try {
      reqPass();
      alert("new password is send successfully");
    } catch (e) {
      alert(`try later :${e.message}`);
    }
    history.push("/signin");
  };

  return (
    <form className={styles.newPassReq} onSubmit={newPassHandler}>
      <input type="email" required ref={emailRef} placeholder="email" />
      <p>the new password will be send to your email address</p>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewPassReq;
