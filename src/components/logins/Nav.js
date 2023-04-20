import React from "react";
import { useHistory } from "react-router-dom";
import styles from "styled-components";

import loginLogo from "../../images/login-logo.svg";

function Nav() {
  const history = useHistory();
  return (
    <div style={{ witdh: "100%" }}>
      <Navbar>
        <a href="#">
          <img src={loginLogo} alt="logo" />
        </a>
        <div>
          <Join
            onClick={() => {
              history.push("/signup");
            }}
          >
            join Now
          </Join>
          <SignIn onClick={() => {
              history.push("/signin");
            }}>sign In</SignIn>
        </div>
      </Navbar>
    </div>
  );
}

const Navbar = styles.div`
height:10vh;
width:90%;
margin:0 auto;
display:flex;
justify-content:space-between;
align-items:center;
padding-top:1rem;
& img{
  width:50%;
  height:80%;
  padding:1rem 0.5rem;
}
@media only screen and (max-width: 768px) {
  width:98%;
  justify-content:space-between;

  & a{
    width:40%;
  }
  & a img{
    width:100%;
  }
  & div{
    display:flex;
    align-items:center;
    justify-content:center;
  }
}

`;
const Join = styles.button`
color:#333;
font-size:1.4rem;
background-color:transparent;
border-radius:1rem;
border:none;
font-weight:500;
padding:1rem 0.5rem;
border-radius:2rem;
cursor:pointer;
align-self:center;
// width:10%;
transition:all 0.1s ease-in-out;
&:hover{
  background-color:rgba(116, 116, 116,0.4);
}
`;

const SignIn = styles.button`
font-size:1.4rem;
background-color:transparent;
border:3px solid blue;
// width:10%;
align-self:center;
padding:0.8rem;
margin-left:2rem;
border-radius:2rem;
font-weight:500;
cursor:pointer;
color:blue;
transition:all 0.1s ease-in-out;

&:hover{
  color:#f5f5f5;
  background-color:blue;
}
@media only screen and (max-width: 768px) {
  margin-left:0;
}
`;

export default Nav;
