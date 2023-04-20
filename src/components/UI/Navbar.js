import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutGoogle, deleteUserApi } from "../../store/Login";
import { useHistory, Link } from "react-router-dom";
import { cartActions } from "../../store/Cart";

import HomeLogo from "../../images/nav-home.svg";
import JobsLogo from "../../images/nav-jobs.svg";
import MessageLogo from "../../images/nav-messaging.svg";
import WorkLogo from "../../images/nav-work.svg";
import notifLogo from "../../images/nav-notifications.svg";
import ProfileLogo from "../../images/user.svg";
import netWorkLogo from "../../images/nav-network.svg";
import downArrowLogo from "../../images/down-icon.svg";

import styles from "../../styles/NavbarLinks.module.css";
import classes from "styled-components";

function Navbar({ mode }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.logIn.auth);
  const userPhoto = useSelector((state) => state.logIn.userInfo.photoURL);
  const [showNav, setShowNav] = useState(false);

  const profileHandler = () => {
    setShowNav((preState) => !preState);
  };

  const classes =
    mode === "light"
      ? `${styles.navItems} `
      : `${styles.navItems} ${styles.darkMode}`;

  return (
    <ul className={styles.navList}>
      <li key={1}>
        <Link to="#" className={`${classes} ${styles.active}`}>
          <img src={HomeLogo} alt="" />
          <span>Home</span>
        </Link>
      </li>
      <li key={2}>
        <Link to="#" className={classes}>
          <img src={netWorkLogo} alt="" />
          <span>My Network</span>
        </Link>
      </li>
      <li key={3}>
        <Link to="#" className={classes}>
          <img src={JobsLogo} alt="" />
          <span>Jobs</span>
        </Link>
      </li>
      <li key={4}>
        <Link to="#" className={classes}>
          <img src={MessageLogo} alt="" />
          <span>Message</span>
        </Link>
      </li>
      <li key={5}>
        <Link to="#" className={classes}>
          <img src={notifLogo} alt="" />
          <span>Notification</span>
        </Link>
      </li>

      <ProfileLink onClick={profileHandler}>
        <Link to="#" className={classes}>
          {auth !== "" && userPhoto ? (
            <ProfileImg src={userPhoto} alt="" />
          ) : (
            <ProfileImg src={ProfileLogo} alt="" />
          )}

          <div>
            <span>Profile</span>
            <img src={downArrowLogo} alt="" />
          </div>
        </Link>
        {showNav && (
          <Dropdown>
            <Link
              to="#"
              onClick={() => {
                history.push("/login");
                dispatch(signOutGoogle());
              }}
            >
              sign out
            </Link>
            <Link
              href="#"
              onClick={() => {
                dispatch(cartActions.toggleSetting(true));
              }}
            >
              setting
            </Link>
            <Link
              to="#"
              onClick={() => {
                history.push("/login");
                dispatch(deleteUserApi());
              }}
            >
              Delete acount
            </Link>
          </Dropdown>
        )}
      </ProfileLink>
      <li>
        <Link to="#" className={classes}>
          <img src={WorkLogo} alt="" />
          <div>
            <span>Work</span>
            <img src={downArrowLogo} alt="" />
          </div>
        </Link>
      </li>
    </ul>
  );
}

const ProfileImg = classes.img`
border-radius:50%;
width:2vw;

`;

const Dropdown = classes.div`
padding:0.6rem 0.2rem;
width:170%;
position:absolute;
font-size:1rem;
background-color:#eee;
bottom:-7.5rem;
border-radius:0.8rem;
display:none;
text-align:center;
transform:translate(-10%);
& a{
  margin-top:0.5rem;
  font-size:1.2rem;
  text-decoration:none;
}
& a:hover{
  background-color: #fff;
}
`;
const ProfileLink = classes.li`
position:relative;
&:hover{
  ${Dropdown}{
    display:flex;
    flex-direction:column;
    justify-content:center;
  }
}
`;

export default Navbar;
