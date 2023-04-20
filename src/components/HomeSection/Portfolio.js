import React from "react";

import styles from "styled-components";
import style from "../../styles/profileSection.module.css";
import photo from "../../images/photo.svg";
import { useSelector } from "react-redux";
import connect from "../../images/widget-icon.svg";
import MyItemsImg from "../../images/item-icon.svg";
import ProfileWriting from "./ProfileWriting";
import EditModal from "./EditModal.js";
import Img from "./ProfileImg";
import Commiunities from "../HomeSection/Commiunities";

function Portfolio() {
  const userData = useSelector((state) => state.logIn.userInfo);

  const auth = useSelector((state) => state.logIn.auth);

  const editProfile = useSelector((state) => state.cart.editProfile);

  return (
    <div className={style.profileSection}>
      {editProfile && <EditModal />}
      <Profile>
        <div className={style.detailSection}>
          <ProfileImg>
            <Img />
            {auth !== "" && (userData.photoURL || userData.photoUrl) ? (
              <Photo src={userData.photoURL || userData.photoUrl} alt="" />
            ) : (
              <Photo src={photo} alt="" />
            )}
            <ProfileWriting
              name={userData.displayName}
              email={userData.email}
            />
          </ProfileImg>
          <NewConnection>
            <div>
              <span>Connections</span>
              <p>Grow your network</p>
            </div>
            <button>
              <img src={connect} alt="" />
            </button>
          </NewConnection>
        </div>
        <div>
          <div>
            <MyItems>
              <ItemsImg src={MyItemsImg} alt="" />
              <p>My items</p>
            </MyItems>
          </div>
        </div>
      </Profile>
      <Commiunities />
    </div>
  );
}

const Profile = styles.div`
background-color:#fff;
align-self: start; 
position:sticky;
width:20vw;
display:flex;
flex-direction:column;
gap:0.5rem;
border-radius:1rem;
overflow:hidden;
box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.1);
@media only screen and (max-width:760px){
  width:100%;
}
`;

const ProfileImg = styles.div`
position:relative;
width:100%;
margin-bottom:1.6rem;
&::after{
  content:'';
  display:inline-block;
  position:absolute;
  background-color:#fff;
  width:6vw;
  height:6vw;
  top:50%;
  left:50%;
  z-index:0;
  transform:translate(-50%,-30%);
  border-radius:50%;
}
`;
const Photo = styles.img`
position:absolute;

width:4vw;
top:50%;
left:50%;
transform:translate(-50%,-20%);
z-index:1;
@media only screen and (max-width:768px){
  width:6vw;
}
`;

const NewConnection = styles.div`
border-top:1px solid rgb(176, 176, 176);
font-size:0.8rem;
font-weight:bold;
padding: 1.5rem 0.5rem;
display:flex;
justify-content:space-between;
& span{
  color:rgba(0,0,0,0.5)
}
& button{
  background-color:transparent;
  border:none;
  cursor:pointer;
}
`;

const MyItems = styles.div`
margin:0.5rem 0;
border-top:1px solid rgb(176, 176, 176);
padding:0.5rem 0.5rem 0 0.5rem;
display:flex;
justift-content:flex-start;
gap:0.5rem;
align-items:center;
& p{
  font-size:1rem;
}
`;
const ItemsImg = styles.img`
width:1.6rem;
`;

export default Portfolio;
