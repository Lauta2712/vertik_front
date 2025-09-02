import axios from "axios";

export const CREATE_USER = "CREATE_USER";
export const GET_USERS = "GET_USERS";
export const CREATE_WORKOUT = "CREATE_WORKOUT";
export const GET_WORKOUTS = "GET_WORKOUTS";
export const CREATE_DAILY_MEAL = "CREATE_DAILY_MEAL";

export const SET_AUTH_USER = "SET_AUTH_USER";
export const LOGOUT_USER = "LOGOUT_USER";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const setAuthUser = (user) => ({
  type: SET_AUTH_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const createUser = (auth0User) => async (dispatch) => {
  try {
    if (!auth0User || !auth0User.sub) {
      console.error("auth0User inválido:", auth0User);
      return;
    }

    const payload = {
      sub: auth0User.sub,
      email: auth0User.email,
      email_verified: auth0User.email_verified,
      given_name: auth0User.given_name,
      family_name: auth0User.family_name,
      name: auth0User.name,
      picture: auth0User.picture,
      updated_at: auth0User.updated_at,
    };

    const { data } = await axios.post(`${API_URL}/users`, payload);

    dispatch({ type: CREATE_USER, payload: data }); 
    dispatch(setAuthUser(data));

    return data;
  } catch (error) {
    console.error("Error al crear usuario en backend:", error.response?.data || error.message);
    throw error;
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/users`);
    dispatch({
      type: GET_USERS,
      payload: data,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};
