import { 
  CREATE_USER, 
  SET_AUTH_USER, 
  LOGOUT_USER,
  GET_USERS
} from "./actions";

const initialState = {
  users: [],
  supplements: [],
  workouts: [],
  dailyMeals: [],
  authUser: null, 
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case SET_AUTH_USER:
      return {
        ...state,
        authUser: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        authUser: null,
      };

    default:
      return state;
  }
}