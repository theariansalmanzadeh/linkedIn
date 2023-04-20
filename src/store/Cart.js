import { createSlice } from "@reduxjs/toolkit";
import { db, storage, storages } from "../FireBaseStore";
import { useHistory } from "react-router-dom";
import { BiUpload } from "react-icons/bi";

const initialState = {
  NewPost: false,
  UImode: "light",
  birthDate: "yy/mm/dd",
  isLoading: false,
  isSetting: false,
  mediaRef: null,
  mediaType: null,
  editProfile: false,
  articles: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleNewPost(state, action) {
      state.NewPost = action.payload;
    },
    mediaActivate() {},
    setMediaRef(state, action) {
      state.mediaRef = action.payload;
    },
    setMediaType(state, action) {
      state.mediaType = action.payload.current.id;
    },
    activateMedia(state, action) {
      console.log(state.mediaType);
      document.getElementById(state.mediaType).click();
    },
    toggleEditProfile(state, action) {
      state.editProfile = action.payload;
    },
    setArticles(state, action) {
      state.articles = action.payload;
    },
    toggleIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    toggleSetting(state, action) {
      state.isSetting = action.payload;
    },
    setBirthDate(state, action) {
      let data = action.payload;
      state.birthDate = data.replaceAll("-", "/");
    },
    setMode(state, action) {
      state.UImode = action.payload;
    },
  },
});

export const PostContent = (postPayload) => {
  return (dispatch) => {
    const userName = postPayload.userDetails.displayName;
    // for photo post
    if (postPayload.mediaURL[0]) {
      const upload = storage
        .ref(`images/${postPayload.mediaURL[0].name}`)
        .put(postPayload.mediaURL[0]);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`${progress}`);
          if (snapshot.state === "RUNNING") {
            console.log(`${progress}`);
          }
        },
        (error) => console.log(error),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection(`${userName}`).add({
            actor: {
              userDetails: {
                author: postPayload.userDetails.displayName,
                email: postPayload.userDetails.email,
                time: postPayload.timeStamp,
                photo: postPayload.userDetails.photoURL,
              },
              video: "",
              imagePosted: downloadURL,
              description: postPayload.caption,
            },
          });
        }
      );
    } // for video post
    else if (postPayload.mediaURL[1]) {
    } else {
    }
    dispatch(cartActions.toggleNewPost(false));
  };
};

export const fetchDataAPI = (user) => {
  let payload;

  return async (dispatch) => {
    dispatch(cartActions.toggleIsLoading(true));
    const testdata = db.collection(`${user}`).orderBy("actor.time", "desc");

    db.collection("arian salmanzadeh")
      .orderBy("actor.userDetails.time", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());

        dispatch(cartActions.setArticles(payload));
      });
    dispatch(cartActions.toggleIsLoading(false));
  };
};
export const fetchDataAPIOwner = () => {
  let payload;

  return async (dispatch) => {
    dispatch(cartActions.toggleIsLoading(true));
    const testdata = db
      .collection("arian salmanzadeh")
      .orderBy("actor.time", "desc");

    db.collection("arian salmanzadeh")
      .orderBy("actor.userDetails.time", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());

        dispatch(cartActions.setArticles(payload));
      });
    dispatch(cartActions.toggleIsLoading(false));
  };
};

export const testing = () => {
  return (dispatch) => {
    dispatch(cartActions.nothingToDo());
    console.log("nothing done");
  };
};

export const cartActions = CartSlice.actions;

export default CartSlice;
