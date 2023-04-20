import React, { useEffect, useRef, useReducer } from "react";
import { BiPhotoAlbum, BiVideoPlus, BiCalendarPlus } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat/app";

import { cartActions, PostContent, testing } from "../../store/Cart";

import styled from "styled-components";

import User from "../../images/user.svg";

const initState = {
  postImgSrc: null,
  postVidSrc: null,
  mediaType: "",
  EnableToPost: false,

  PostMedia: { display: "none" },
};

const reducer = (state, action) => {
  if (action.type === "displayMedia") {
    return {
      ...state,
      PostMedia: { display: "block", width: "100%", height: "100%" },
    };
  } else if (action.type === "hideMedia") {
    return { ...state, PostMedia: { display: "none" } };
  } else if (action.type === "POST_STATE") {
    return { ...state, EnableToPost: action.payload };
  } else if (action.type === "setMediaType") {
    console.log(action.metadata);
    if (action.mediaType === "vid") {
      return {
        ...state,
        postImgSrc: null,
        postVidSrc: action.metadata,
        mediaType: action.mediaType,
      };
    } else if (action.mediaType === "img") {
      return {
        ...state,
        postVidSrc: null,
        postImgSrc: action.metadata,
        mediaType: action.mediaType,
      };
    }
  } else if (action.type === "HashTagHandler") {
  }
  return state;
};

function NewPost(props) {
  const [state, dispatch] = useReducer(reducer, initState);

  const history = useHistory();

  const dispatchRedux = useDispatch();

  const mediaActivate = useSelector((state) => state.cart.mediaRef);
  const userInfo = useSelector((state) => state.logIn.userInfo);

  const imgUploadHandler = () => {
    document.getElementById("postImg").click();
  };
  const vidUploadHandler = () => {
    document.getElementById("postVid").click();
  };

  const imgInputHnadler = (e) => {
    dispatch({
      type: "setMediaType",
      mediaType: "img",
      metadata: e.target.files[0],
    });

    dispatch({ type: "POST_STATE", payload: true });
  };

  const vidInputHnadler = (e) => {
    dispatch({
      type: "setMediaType",
      mediaType: "vid",
      metadata: URL.createObjectURL(e.target.files[0]),
    });
    dispatch({ type: "POST_STATE", payload: true });
  };

  const TextChangeHandler = (e) => {
    if (e.target.value.length > 0) {
      dispatch({ type: "POST_STATE", payload: true });
    } else dispatch({ type: "POST_STATE", payload: false });
  };

  const text = useRef(null);
  const imgRef = useRef(null);

  const HashTagHandler = () => {
    text.current.value += "#";
    text.current.focus();
  };
  const submitPost = (evt) => {
    evt.preventDefault();

    if (!state.EnableToPost) {
      alert("nothing to post");
      return;
    }
    const postPayload = {
      userDetails: userInfo,
      caption: text.current.value,
      mediatype: state.mediaType,
      mediaURL: [state.postImgSrc, state.postVidSrc],
      timeStamp: firebase.firestore.Timestamp.now(),
    };
    dispatchRedux(PostContent(postPayload));
    props.onClose();
  };

  useEffect(() => {
    console.log("33");
    dispatchRedux(cartActions.setMediaType(imgRef));
    if (mediaActivate === "Photo") {
      imgUploadHandler();
    } else if (mediaActivate === "Video") {
      vidUploadHandler();
    }
  }, [mediaActivate, dispatchRedux]);

  useEffect(() => {
    if (!state.postImgSrc && !state.postVidSrc) {
      dispatch({ type: "hideMedia" });
    } else {
      dispatch({ type: "displayMedia" });
    }
  }, [state.postImgSrc, state.postVidSrc]);

  return (
    <NewPostSection>
      <NewPostHeader>
        <h4>Create New Post</h4>
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
            props.onClose();
          }}
        >
          &times;
        </button>
      </NewPostHeader>
      <Author onClick={() => history.push({ pathname: "/home" })}>
        <img src={User} alt="" />
        <div>
          <p>Arian salmanzadeh</p>
        </div>
      </Author>
      <NewPostInput>
        <textarea
          name=""
          placeholder="what do you want to talk about"
          id=""
          onChange={TextChangeHandler}
          ref={text}
        ></textarea>
        <HashTagInput onClick={HashTagHandler}>Hash tag</HashTagInput>
        <MediaPreview postSrc={state.PostMedia.display}>
          {state.postImgSrc && (
            <img
              src={URL.createObjectURL(state.postImgSrc)}
              style={state.PostMedia}
              alt=""
            />
          )}
          {state.postVidSrc && (
            <video
              control
              src={state.postVidSrc}
              style={state.PostMedia}
            ></video>
          )}
        </MediaPreview>
        <Buttons>
          <MediaInput>
            <button onClick={imgUploadHandler}>
              <BiPhotoAlbum />
            </button>
            <input
              type="file"
              onChange={imgInputHnadler}
              id="postImg"
              style={{ display: "none" }}
              accept="image/*"
              ref={imgRef}
            />

            <button onClick={vidUploadHandler}>
              <BiVideoPlus />
            </button>
            <input
              type="file"
              onChange={vidInputHnadler}
              id="postVid"
              style={{ display: "none" }}
              accept="video/*"
            />
            <button>
              <BiCalendarPlus />
            </button>
          </MediaInput>
          <PostSubmit onClick={submitPost} disabled={!state.EnableToPost}>
            Post
          </PostSubmit>
        </Buttons>
      </NewPostInput>
    </NewPostSection>
  );
}

const NewPostSection = styled.div`
  width: 50vw;

  position: absolute;
  background-color: #fff;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  position: fixed;
  z-index: 110;
  overflow: hidden;
`;
const NewPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dad9d7;
  font-size: 1.6rem;
  & button {
    border: none;
    background-color: transparent;
    font-size: 2.4rem;
    font-weight: 100;
    cursor: pointer;
    color: #dad9d7;
  }
  & h4 {
    align-self: center;
    font-weight: 400;
  }
`;
const Author = styled.div`
  display: flex;
  margin-top: 1rem;
  padding-left: 1rem;
  justify-content: flex-start;
  gap: 1rem;
  & img {
    width: 5vw;
    border-radius: 50%;
  }
  & div {
    align-self: center;
    font-size: 1rem;
  }
`;
const NewPostInput = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin-top: 1rem;
  & textarea {
    width: 100%;
    border: none;
    outline: none;
    max-height: 20vh;
  }
`;
const HashTagInput = styled.button`
  border: none;
  color: #0a66c2;
  font-size: 1.2rem;
  padding: 0.6rem 1.2rem;
  background-color: transparent;
  display: block;
  cursor: pointer;
  &:hover {
    background-color: rgb(130, 161, 234, 0.5);
    border-radius: 0.6rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const MediaInput = styled.div`
  margin-top: 1.6rem;
  display: flex;
  gap: 1rem;
  margin-right: auto;
  & > * {
    color: #666;
  }

  padding: 0.5rem;
  & button {
    font-size: 2rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
const PostSubmit = styled.button`
  font-size: 1.2rem;
  border: 1px solid ${(props) => (props.disabled ? "#d0d0d0" : "#0a66c2")};
  // pointer-events: ;
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: ${(props) => (props.disabled ? "#d0d0d0" : "#0a66c2")};
  background-color: ${(props) => (props.disabled ? "#d0d0d0" : "#FFF")};

  &:hover {
    color: ${(props) => (props.disabled ? "#d0d0d0" : "#FFF")};
    background-color: ${(props) => (props.disabled ? "#d0d0d0" : "#0a66c2")};
  }
`;

const MediaPreview = styled.div`
  display:${(props) => (props.postSrc !== "none" ? "block" : "none")}
  width: 100%;
  height: ${(props) => (props.postSrc !== "none" ? "20vh" : "0vh")};
  margin-bottom: 1rem;
`;

export default NewPost;
