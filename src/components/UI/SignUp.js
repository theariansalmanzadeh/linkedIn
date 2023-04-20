import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { LogInActions } from "../../store/Login";
import { useHistory } from "react-router-dom";
import styles from "../../styles/signUp.module.css";
import photo from "../../images/user.svg";
import { useSetExpireTime } from "../Helperfunction";

function SignUpForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const [nameDisplay, setNameDisplay] = useState(null);
  const [emailDisplay, setEmailDisplay] = useState(null);

  const { setExpireTime } = useSetExpireTime();

  let idToken = null;
  let expTime = null;

  const submitHandler = (event) => {
    event.preventDefault();
    if (idToken === null)
      (async () => {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEQq3UjIOzDXyzhztbE_T696C5_WJUqw0",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current.value,
              password: passRef.current.value,
              returnSecureToken: true,
            }),
            header: {
              "Content-Type": " application/json",
            },
          }
        );
        if (!res.ok) {
          alert("could not sign up! try again later");
          return;
        }
        alert("successfull signup");
        const data = await res.json();
        expTime = data.expiresIn;
        console.log(data);
        idToken = data.idToken;
      })();

    setTimeout(async () => {
      (async () => {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCEQq3UjIOzDXyzhztbE_T696C5_WJUqw0",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: idToken,
              displayName: nameDisplay,

              deleteAttribute: ["PHOTO_URL"],
              returnSecureToken: false,
            }),
            header: {
              "Content-Type": " application/json",
            },
          }
        );
        if (!res.ok) {
          alert("could not sign up! try again");

          return;
        }
        const data = await res.json();

        const userInfo = {
          displayName: data.displayName,
          email: data.email,
          idToken: idToken,
          photoUrl: data.photoUrl,
        };
        console.log(idToken);
        localStorage.setItem("token", idToken);
        setExpireTime(expTime);

        dispatch(LogInActions.setProvider(data.providerUserInfo[0].providerId));
        dispatch(LogInActions.setUserData(userInfo));
        dispatch(LogInActions.setIsLoggedin(idToken));
        alert("sign up completed");

        history.push("/home");
      })();
    }, 1000);
  };

  return (
    <div className={styles.FormWrapper}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h2>Sign up Form</h2>
        <div>
          <label htmlFor="emailField">Email</label>
          <input
            placeholder="Email"
            onChange={(e) => {
              setEmailDisplay(e.target.value);
            }}
            id="emailField"
            ref={emailRef}
            required
            type="email"
          />
        </div>
        <div>
          <label htmlFor="nameField">Full Name</label>
          <input
            placeholder="Name"
            onChange={(e) => {
              setNameDisplay(e.target.value);
            }}
            ref={nameRef}
            id="nameField"
            required
            type="text"
          />
        </div>
        <div>
          <label htmlFor="passField">Password</label>
          <input
            placeholder="Password"
            id="passField"
            required
            minLength={8}
            ref={passRef}
            type="text"
          />
        </div>
        <div className={styles.submit}>
          <button>Sign up</button>
          <button
            className={styles.back}
            onClick={() => {
              history.push("/login");
            }}
          >
            Back
          </button>
        </div>
      </form>
      <div className={styles.profilePreview}>
        <div className={styles.imgPreview}>
          <img src={photo} alt="" />
        </div>
        <p>Name:{nameDisplay}</p>
        <p>Email:{emailDisplay}</p>
      </div>
    </div>
  );
}

export default SignUpForm;
