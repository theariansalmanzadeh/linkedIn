import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/Cart";
import styles from "../../styles/settings.module.css";

function EditSettings() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(null);

  const changeHandler = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  const modeHandler = (e) => {
    if (e.target.innerHTML === "Light") {
      e.target.parentNode.style.translate = "-100%";
      dispatch(cartActions.setMode("dark"));
    } else {
      e.target.parentNode.style.translate = "0%";
      dispatch(cartActions.setMode("light"));
    }
  };

  const submitHanlder = (e) => {
    e.preventDefault();

    dispatch(cartActions.setBirthDate(date));
    dispatch(cartActions.toggleSetting(false));
  };

  return (
    <div className={styles.editSettings}>
      <div className={styles.heading}>
        <h4>Settings</h4>
        <button
          onClick={() => {
            dispatch(cartActions.toggleSetting(false));
          }}
        >
          &times;
        </button>
      </div>
      <div className={styles.modeWrapper}>
        <div onClick={modeHandler}>
          <div className={styles.lightMode}>Light</div>
          <div className={styles.darkMode}>Dark</div>
        </div>
      </div>
      <form className={styles.form} onSubmit={submitHanlder}>
        <label htmlFor="birth">select your birth date</label>
        <input type="date" id="birth" name="birth" onChange={changeHandler} />
        <button type="submit">set</button>
      </form>
    </div>
  );
}

export default EditSettings;
