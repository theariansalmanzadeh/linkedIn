import React from "react";

import background from "../../images/card-bg.svg";

import styles from "styled-components";

function ProfileImg() {
  return (
    <ImgDiv>
      <img src={background} alt="" />
    </ImgDiv>
  );
}

const ImgDiv = styles.div`
height:15vh;
overflow:hidden;
margin-bottom:2rem;

img{
  height:100%;
  width:100%;
  // transform:traslatex(5rem);
  object-fit:cover;
}
`;

export default ProfileImg;
