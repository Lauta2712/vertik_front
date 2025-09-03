import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/notfound/NotFound";
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import Meals from "./pages/meals/Meals";
import Trainings from "./pages/trainings/Trainings";
import Races from "./pages/races/Races";
import RacePlans from "./pages/raceplans/RacePlans";
import Statistics from "./pages/statistics/Statistics";
import Supplements from "./pages/supplements/Supplements";
import Profile from "./pages/profile/Profile";
import "./App.css";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUser, getUsers } from "./redux/actions";

function App() {
  const { user, isAuthenticated, error } = useAuth0();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const saveUser = async () => {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently();

        const mappedUser = {
          sub: user.sub,
          email: user.email,
          email_verified: user.email_verified,
          family_name: user.family_name,
          given_name: user.given_name,
          name: user.name,
          nickname: user.nickname,
          picture: user.picture,
          updated_at: user.updated_at,
        };

        dispatch(createUser(mappedUser, token));
        dispatch(getUsers(token));
      }
    };

    saveUser();
  }, [isAuthenticated, user, dispatch, getAccessTokenSilently]);

  useEffect(() => {
    if (error) {
      window.location.href = "/";
    }
  }, [error]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="meals" element={<Meals />} />
          <Route path="trainings" element={<Trainings />} />
          <Route path="races" element={<Races />} />
          <Route path="racePlans" element={<RacePlans />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="supplements" element={<Supplements />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
