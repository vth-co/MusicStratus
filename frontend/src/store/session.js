import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const UPDATE_USER_IMAGE = "session/updateUserImage";


const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const updateUserImage = (image) => {
  return {
    type: UPDATE_USER_IMAGE,
    payload: image,
  };
};

// export const createUser = (user) => async (dispatch) => {
//   const { images, image, username, email, password } = user;
//   const formData = new FormData();
//   formData.append("username", username);
//   formData.append("email", email);
//   formData.append("password", password);

//   // for multiple files
//   if (images && images.length !== 0) {
//     for (var i = 0; i < images.length; i++) {
//       formData.append("images", images[i]);
//     }
//   }

//   // for single file
//   if (image) formData.append("image", image);

//   const res = await csrfFetch(`/api/users/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     body: formData,
//   });

//   const data = await res.json();
//   dispatch(setUser(data.user));
// };

export const createUser = (user) => async (dispatch) => {
  const { username, email, password } = user;

  const res = await csrfFetch(`/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  dispatch(setUser(data.user));
};

export const updateUserProfileImage = (userId, image) => async (dispatch) => {
  const formData = new FormData();
  if (image) formData.append("image", image);

  const res = await csrfFetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: {
            "Content-Type": "multipart/form-data",
          },
    body: formData,
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateUserImage(data.image));
  }
};


export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      // newState = Object.assign({}, state);
      // newState.user = action.payload;
      // return newState;
      return { ...state, user: action.payload };
    case UPDATE_USER_IMAGE:
      return { ...state, user: { ...state.user, image: action.payload } };
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// export const signup = (user) => async (dispatch) => {
//   const { username, email, password } = user;
//   const response = await csrfFetch("/api/users", {
//     method: "POST",
//     body: JSON.stringify({
//       username,
//       email,
//       password,
//     }),
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

export default sessionReducer;
