import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
function LoginPage() {
  const [registerTemp, setRegisterTemp] = useState("login");
  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-green-50">
      {registerTemp === "signup" ? (
        <Signup registerTemp={registerTemp} setRegisterTemp={setRegisterTemp} />
      ) : (
        <Login registerTemp={registerTemp} setRegisterTemp={setRegisterTemp} />
      )}
    </div>
  );
}

export default LoginPage;
