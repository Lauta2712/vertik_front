import axios from 'axios';

export const CREATE_USER = 'CREATE_USER';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USERS = 'GET_USERS';

export const CREATE_WORKOUT = 'CREATE_WORKOUT';
export const GET_WORKOUTS = 'GET_WORKOUTS';
export const GET_WORKOUT_BY_ID = 'GET_WORKOUT_BY_ID';
export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';

export const CREATE_RACE = 'CREATE_RACE';
export const GET_RACES = 'GET_RACES';
export const GET_RACE_BY_ID = 'GET_RACE_BY_ID';
export const UPDATE_RACE = 'UPDATE_RACE';
export const DELETE_RACE = 'DELETE_RACE';

export const CREATE_SUPPLEMENT = 'CREATE_SUPPLEMENT';
export const GET_SUPPLEMENTS = 'GET_SUPPLEMENTS';
export const GET_SUPPLEMENT_BY_ID = 'GET_SUPPLEMENT_BY_ID';
export const UPDATE_SUPPLEMENT = 'UPDATE_SUPPLEMENT';
export const DELETE_SUPPLEMENT = 'DELETE_SUPPLEMENT';

export const CREATE_DAILYMEAL = 'CREATE_DAILYMEAL';
export const GET_DAILYMEALS = 'GET_DAILYMEALS';
export const GET_DAILYMEAL_BY_ID = 'GET_DAILYMEAL_BY_ID';
export const UPDATE_DAILYMEAL = 'UPDATE_DAILYMEAL';
export const DELETE_DAILYMEAL = 'DELETE_DAILYMEAL';

export const SET_AUTH_USER = 'SET_AUTH_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

const API_URL = import.meta.env.API_URL || 'http://localhost:3001';

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
            console.error('auth0User inválido:', auth0User);
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
        console.error('Error al crear usuario en backend:', error.response?.data || error.message);
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
        console.error('Error al obtener usuarios:', error);
    }
};

export const getUserById = (sub, token) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/users/${sub}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: GET_USER_BY_ID,
            payload: data,
        });

        return data;
    } catch (error) {
        console.error('Error al obtener usuario por sub:', error.response?.data || error.message);
    }
};

export const createWorkout = (workoutData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${API_URL}/workouts`, workoutData);
        dispatch({
            type: CREATE_WORKOUT,
            payload: data,
        });
        return data;
    } catch (error) {
        console.error('Error al crear workout:', error.response?.data || error.message);
        throw error;
    }
};

export const getAllWorkouts = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/workouts`);
        dispatch({
            type: GET_WORKOUTS,
            payload: data,
        });
    } catch (error) {
        console.error('Error al obtener workouts:', error);
    }
};

export const getWorkoutById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/workouts/${id}`);
        dispatch({
            type: GET_WORKOUT_BY_ID,
            payload: data,
        });
        return data;
    } catch (error) {
        console.error('Error al obtener workout:', error.response?.data || error.message);
    }
};

export const updateWorkout = (id, workoutData) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${API_URL}/workouts/${id}`, workoutData);
        dispatch({
            type: UPDATE_WORKOUT,
            payload: data,
        });
        return data;
    } catch (error) {
        console.error('Error al actualizar workout:', error.response?.data || error.message);
    }
};

export const deleteWorkout = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/workouts/${id}`);
        dispatch({
            type: DELETE_WORKOUT,
            payload: id,
        });
    } catch (error) {
        console.error('Error al eliminar workout:', error.response?.data || error.message);
    }
};

export const createRace = (raceData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${API_URL}/races`, raceData);
        dispatch({
            type: CREATE_RACE,
            payload: data,
        });
        return data;
    } catch (error) {
        console.error('Error al crear race:', error.response?.data || error.message);
        throw error;
    }
};

export const getAllRaces = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/races`);
        dispatch({
            type: GET_RACES,
            payload: data,
        });
    } catch (error) {
        console.error('Error al obtener races:', error);
    }
};

export const getRaceById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/races/${id}`);
        dispatch({
            type: GET_RACE_BY_ID,
            payload: data,
        });
        return data;
    } catch (error) {
        console.error('Error al obtener race:', error.response?.data || error.message);
    }
};

export const updateRace = (id, raceData) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${API_URL}/races/${id}`, raceData);
        dispatch({
            type: UPDATE_RACE,
            payload: data,
        });
        return data;
    } catch (error) {
        console.error('Error al actualizar race:', error.response?.data || error.message);
    }
};

export const deleteRace = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/races/${id}`);
        dispatch({
            type: DELETE_RACE,
            payload: id,
        });
    } catch (error) {
        console.error('Error al eliminar race:', error.response?.data || error.message);
    }
};

export const createSupplement = (supplementData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${API_URL}/supplements`, supplementData);
        dispatch({
            type: CREATE_SUPPLEMENT,
            payload: data,
        });
        return data;
    } catch (error) {
        console.error('Error al crear supplement:', error.response?.data || error.message);
        throw error;
    }
};

export const getAllSupplements = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/supplements`);
        dispatch({
            type: GET_SUPPLEMENTS,
            payload: data,
        });
    } catch (error) {
        console.error('Error al obtener supplements:', error);
    }
};

export const getSupplementById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/supplements/${id}`);
        dispatch({
            type: GET_SUPPLEMENT_BY_ID,
            payload: data,
        });
        return data;
    } catch (error) {
        console.error('Error al obtener supplement:', error.response?.data || error.message);
    }
};

export const updateSupplement = (id, supplementData) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${API_URL}/supplements/${id}`, supplementData);
        dispatch({
            type: UPDATE_SUPPLEMENT,
            payload: data,
        });
        return data;
    } catch (error) {
        console.error('Error al actualizar supplement:', error.response?.data || error.message);
    }
};

export const deleteSupplement = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/supplements/${id}`);
        dispatch({
            type: DELETE_SUPPLEMENT,
            payload: id,
        });
    } catch (error) {
        console.error('Error al eliminar supplement:', error.response?.data || error.message);
    }
};

export const createDailyMeal = (dailyMealData) => async (dispatch) => {
    try {
        const { data } = await axios.post(API_URL, dailyMealData);
        dispatch({ type: CREATE_DAILYMEAL, payload: data });
    } catch (error) {
        console.error('Error creando DailyMeal:', error);
    }
};

export const getDailyMeals = () => async (dispatch) => {
    try {
        const { data } = await axios.get(API_URL);
        dispatch({ type: GET_DAILYMEALS, payload: data });
    } catch (error) {
        console.error('Error obteniendo DailyMeals:', error);
    }
};

export const getDailyMealById = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        dispatch({ type: GET_DAILYMEAL_BY_ID, payload: data });
    } catch (error) {
        console.error('Error obteniendo DailyMeal por ID:', error);
    }
};

export const updateDailyMeal = (id, dailyMealData) => async (dispatch) => {
    try {
        const { data } = await axios.put(`${API_URL}/${id}`, dailyMealData);
        dispatch({ type: UPDATE_DAILYMEAL, payload: data });
    } catch (error) {
        console.error('Error actualizando DailyMeal:', error);
    }
};

export const deleteDailyMeal = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        dispatch({ type: DELETE_DAILYMEAL, payload: id });
    } catch (error) {
        console.error('Error eliminando DailyMeal:', error);
    }
};
