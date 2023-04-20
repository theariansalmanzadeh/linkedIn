import React from "react";
import { useDispatch } from "react-redux";
import { googleAuth } from "../../store/Login";
import styles from "styled-components";
import { useSetExpireTime } from "../Helperfunction";
import googleLogo from "../../images/google.svg";

function GoogleBtn() {
  const dispatch = useDispatch();
  const { setExpireTime } = useSetExpireTime();

  return (
    <Button
      onClick={() => {
        dispatch(googleAuth());
        setExpireTime(3600);
      }}
    >
      <img src={googleLogo} alt="" />
      <span>sign or Login in with google</span>
    </Button>
  );
}

const Button = styles.button`
display:flex;
align-items: center;
gap:0.5rem; 
padding:0.5rem 2rem;
font-size:1.6rem;
border-radius:2rem;
border:1px solid #333;
background-color:#f5f5f5;
cursor:pointer;
&:hover{
  background-color:#333;
  color: #f5f5f5;
}
& img{
  width:25%;
  height:100%;
}
& span{
  white-space:nowrap;
  align-self: center;
  
}
`;

export default GoogleBtn;
