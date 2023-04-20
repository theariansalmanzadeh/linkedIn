import { createSlice } from "@reduxjs/toolkit";
import { auth, provider } from "../FireBaseStore";
import { getAuth, deleteUser, updateProfile } from "firebase/auth";
import { useSetExpireTime } from "../components/Helperfunction";

const initialState = {
  auth: "",
  provider: null,
  isLoggedIn: false,
  IsUsingGoogle: false,
  IsUsingLinkedIn: false,
  userInfo: {
    photoURL: null,
    displayName: null,
  },
};

const LoginSlice = createSlice({
  name: "LogIn",
  initialState,
  reducers: {
    setIsLoggedin(state, action) {
      state.isLoggedIn = action.payload;
      state.auth = action.payload;
    },
    LoggingOut(state, action) {
      state.auth = "";
      localStorage.removeItem("token");
    },
    deleteUser() {},
    useGoogleLogin(state, action) {
      state.IsUsingGoogle = true;
    },
    useLinkedInLogin(state, action) {
      state.IsUsingLinkedIn = true;
    },
    setUserData(state, action) {
      state.userInfo = action.payload;
    },
    setProvider(state, action) {
      state.provider = action.payload;
    },
  },
});

export const googleAuth = () => {
  return async (dispatch) => {
    const reqAuth = async () => {
      const res = await auth.signInWithPopup(provider);

      dispatch(LogInActions.setUserData(res.user));
      dispatch(LogInActions.setProvider(res.user.providerData[0].providerId));
      const data = await auth.currentUser.getIdToken();

      localStorage.setItem("token", data);
      dispatch(LogInActions.setIsLoggedin(data));
      var user = auth.currentUser;

      if (user != null) {
        user.providerData.forEach((profile) => {
          console.log(profile.photoURL);
        });
      }
    };
    try {
      reqAuth();
    } catch (e) {
      console.log(e);
    }
  };
};
export const signOutGoogle = () => {
  return async (dispatch, getState) => {
    const provider = getState().provider;

    if (provider.includes("google")) {
      const signout = async () => {
        const res = await auth.signOut();
        dispatch(LogInActions.LoggingOut());
        dispatch(LogInActions.setUserData(res.user));
      };
      signout();
    } else {
      dispatch(LogInActions.LoggingOut());
      localStorage.removeItem("expireTime");
    }
  };
};
export const deleteUserApi = () => {
  return async (dispatch, getState) => {
    const userInfo = {
      displayName: null,
      photoURL: null,
      email: null,
    };
    const { provider } = getState().logIn;

    console.log(provider);
    if (provider.includes("google")) {
      const { currentUser } = getAuth();
      console.log(currentUser);

      (async () => {
        await deleteUser(currentUser);
      })();
    } else {
      const { auth } = getState().logIn;
      console.log(auth);
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyCEQq3UjIOzDXyzhztbE_T696C5_WJUqw0",
        {
          method: "POST",
          body: JSON.stringify({ idToken: auth }),

          header: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      console.log(result);
    }

    localStorage.removeItem("token");
    dispatch(LogInActions.LoggingOut());
    dispatch(LogInActions.setUserData(userInfo));
  };
};

export const setUserAuth = () => {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) dispatch(LogInActions.setUserData(user));
    });
  };
};

export const updateProfileAPI = (user) => {
  return async (dispatch, getState) => {
    const state = getState().logIn;

    const newUser = { ...state.userInfo, ...user };
    (async () => {
      await updateProfile(auth.currentUser, newUser);
    })();
  };
};

export const getUserData = (tokenId) => {
  return async (dispatch) => {
    (async () => {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCEQq3UjIOzDXyzhztbE_T696C5_WJUqw0",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: `${tokenId}`,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      dispatch(LogInActions.setUserData(data.users[0]));
      dispatch(LogInActions.setIsLoggedin("true"));
    })();
  };
};

export const LogInActions = LoginSlice.actions;

export default LoginSlice;
