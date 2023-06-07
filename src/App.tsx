import React from 'react';
import {Route, Routes} from "react-router-dom";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import {Home} from "./pages/Home";
import Logout from "./pages/Auth/Logout";

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/auth/signIn"} element={<SignIn/>}/>
        <Route path={"/auth/signUp"} element={<SignUp/>}/>
        <Route path={"/auth/logout"} element={<Logout/>}/>
      </Routes>
    </div>
  );
}

export default App;
