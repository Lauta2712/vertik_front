import { 
  CREATE_USER, 
  SET_AUTH_USER, 
  LOGOUT_USER,
  GET_USERS,
  GET_USER_BY_ID,

  CREATE_WORKOUT,
  GET_WORKOUTS,
  GET_WORKOUT_BY_ID,
  UPDATE_WORKOUT,
  DELETE_WORKOUT,

  CREATE_RACE,
  GET_RACES,
  GET_RACE_BY_ID,
  UPDATE_RACE,
  DELETE_RACE,

  CREATE_SUPPLEMENT,
  GET_SUPPLEMENTS,
  GET_SUPPLEMENT_BY_ID,
  UPDATE_SUPPLEMENT,
  DELETE_SUPPLEMENT,

  CREATE_DAILYMEAL,
  GET_DAILYMEALS,
  GET_DAILYMEAL_BY_ID,
  UPDATE_DAILYMEAL,
  DELETE_DAILYMEAL,
} from "./actions";

const initialState = {
  users: [],
  supplements: [],
  workouts: [],
  dailyMeals: [],
  races: [],
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
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        authUser: action.payload,  
      };
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

    case CREATE_WORKOUT:
      return {
        ...state,
        workouts: [...state.workouts, action.payload],
      };
    case GET_WORKOUTS:
      return {
        ...state,
        workouts: action.payload,
      };
    case GET_WORKOUT_BY_ID:
      return {
        ...state,
        workouts: state.workouts.find(w => w.id === action.payload.id)
          ? state.workouts.map(w => w.id === action.payload.id ? action.payload : w)
          : [...state.workouts, action.payload],
      };
    case UPDATE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.map((w) =>
          w.id === action.payload.id ? action.payload : w
        ),
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.filter((w) => w.id !== action.payload),
      };

    case CREATE_RACE:
      return {
        ...state,
        races: [...state.races, action.payload],
      };
    case GET_RACES:
      return {
        ...state,
        races: action.payload,
      };
    case GET_RACE_BY_ID:
      return {
        ...state,
        races: state.races.find(r => r.id === action.payload.id)
          ? state.races.map(r => r.id === action.payload.id ? action.payload : r)
          : [...state.races, action.payload],
      };
    case UPDATE_RACE:
      return {
        ...state,
        races: state.races.map((r) =>
          r.id === action.payload.id ? action.payload : r
        ),
      };
    case DELETE_RACE:
      return {
        ...state,
        races: state.races.filter((r) => r.id !== action.payload),
      };

    case CREATE_SUPPLEMENT:
      return {
        ...state,
        supplements: [...state.supplements, action.payload],
      };
    case GET_SUPPLEMENTS:
      return {
        ...state,
        supplements: action.payload,
      };
    case GET_SUPPLEMENT_BY_ID:
      return {
        ...state,
        supplements: state.supplements.find(s => s.id === action.payload.id)
          ? state.supplements.map(s => s.id === action.payload.id ? action.payload : s)
          : [...state.supplements, action.payload],
      };
    case UPDATE_SUPPLEMENT:
      return {
        ...state,
        supplements: state.supplements.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case DELETE_SUPPLEMENT:
      return {
        ...state,
        supplements: state.supplements.filter((s) => s.id !== action.payload),
      };

    case CREATE_DAILYMEAL:
      return {
        ...state,
        dailyMeals: [...state.dailyMeals, action.payload],
      };
    case GET_DAILYMEALS:
      return {
        ...state,
        dailyMeals: action.payload,
      };
    case GET_DAILYMEAL_BY_ID:
      return {
        ...state,
        dailyMeals: state.dailyMeals.find(m => m.id === action.payload.id)
          ? state.dailyMeals.map(m => m.id === action.payload.id ? action.payload : m)
          : [...state.dailyMeals, action.payload],
      };
    case UPDATE_DAILYMEAL:
      return {
        ...state,
        dailyMeals: state.dailyMeals.map((m) =>
          m.id === action.payload.id ? action.payload : m
        ),
      };
    case DELETE_DAILYMEAL:
      return {
        ...state,
        dailyMeals: state.dailyMeals.filter((m) => m.id !== action.payload),
      };

    default:
      return state;
  }
}