import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/EditProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/Cart";
import { updateProfileAPI } from "../../store/Login";

function EditProfile() {
  const user = useSelector((state) => state.logIn.userInfo);
  const dispatch = useDispatch();
  const [imgFile, setImgFile] = useState(null);
  const [initValue, setInitValue] = useState(null);

  const nameRef = useRef();
  const emailRef = useRef();
  const imgRef = useRef();

  const EditAccountHandler = (e) => {
    e.preventDefault();
    if (
      emailRef.current.value === undefined ||
      emailRef.current.value === "" ||
      nameRef.current.value === ""
    )
      return;
    let newUser = {
      email: emailRef.current.value,
      displayName: nameRef.current.value,
    };

    if (imgFile !== null) newUser.photoURL = imgFile;
    console.log(newUser);
    dispatch(updateProfileAPI(newUser));
    dispatch(cartActions.toggleEditProfile(false));
  };

  const imgChangeHandler = (e) => {
    setImgFile(e.target.files[0]);
  };

  useEffect(() => {
    emailRef.current.value = user.email;
    nameRef.current.value = user.displayName;
    setInitValue({ name: user.displayName, email: user.email });
  }, []);

  return (
    <div className={style.EditProfile}>
      <div className={style.EditHeader}>
        <h5>Edit Account</h5>
        <button
          onClick={() => {
            dispatch(cartActions.toggleEditProfile(false));
          }}
        >
          &times;
        </button>
      </div>
      <form className={style.EditForm}>
        <input type="text" ref={nameRef} className />
        <input type="text" ref={emailRef} className />
        <div className={style.imgWrapper}>
          <input
            type="file"
            ref={imgRef}
            accept="image/*"
            onChange={imgChangeHandler}
          />
          {imgFile && (
            <img
              src={URL.createObjectURL(imgFile)}
              className={style.EditImage}
              alt=""
            />
          )}
        </div>

        <button onClick={EditAccountHandler} type="submit">
          Change
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
