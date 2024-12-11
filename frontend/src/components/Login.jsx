import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/actions/userAction";

function Login({ setRegisterTemp }) {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await dispatch(loginUser(formData));

    if (!res.success) {
      return console.log("erorr", res.message);
    }
    navigate("/");
  };

  return (
    <div className=" flex  h-3/4  w-1/2 shadow-lg rounded-md ">
      <div className="   flex w-1/2 bg-white h-[100%]  rounded-tl-md rounded-bl-md items-center justify-center ">
        <form
          onSubmit={handleSubmitForm}
          action=""
          className=" p-2 gap-2  mt-10 flex justify-center items-center  border w-[80%] flex-col border-none m-auto "
        >
          <h1 className=" font-bold text-lg text-center">Welcome Back..! </h1>
          <div className=" w-[90%]  flex flex-col">
            <label className=" font-semibold" htmlFor="email">
              Email
              <span className=" text-red-800">*</span>
            </label>
            <input
              onChange={handleOnChange}
              type="email"
              className=" p-2 w-full border border-gray-200 rounded-md outline-none  ps-2"
              name="email"
              id="email"
              placeholder=" Enter email... "
            />
          </div>
          <div className=" w-[90%] flex flex-col">
            <label className=" font-semibold" htmlFor="password">
              Password<span className=" text-red-800">*</span>
            </label>
            <input
              onChange={handleOnChange}
              type="password"
              className=" p-2 w-full border border-gray-200 rounded-md outline-none  ps-2"
              name="password"
              id="password"
              placeholder=" Enter pasword... "
            />
            <div className=" flex justify-end w-full">
              <a href="" className=" text-sm  text-gray-700">
                {" "}
                Forgot Pasword
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="  p-2 w-[80%] rounded-md bg-blue-300 border border-blue-700"
          >
            Login
          </button>
          <div className="text-sm">
            don't have a account?{" "}
            <span onClick={() => setRegisterTemp("signup")}>Sign Up</span>
          </div>
        </form>
      </div>
      <div className=" w-1/2 bg-blue-800 rounded-br-md rounded-tr-md flex items-center justify-center flex-col">
        <h1 className=" font-bold text-3xl  text-white">Welcom to Chatify</h1>
        <p className=" text-white font-semibold text-xl text-center">
          Get connected to the people you like
        </p>
      </div>
    </div>
  );
}

// <form
//   action=""
//   className=" flex  border-red-800  border w-[80%] flex-col m-auto "
// >
//   <h1 className=" text-center">Welcome Back..! </h1>
//   <div className=" flex flex-col">
//     <label className=" font-bold" htmlFor="email">
//       Email
//     </label>
//     <input
//       type="email"
//       className=" p-2 w-full"
//       name="email"
//       id="email"
//     />
//   </div>
//   <div className=" w-[90%]  flex flex-col">
//     <label className=" font-bold" htmlFor="email">
//       Password
//     </label>
//     <input
//       type="email"
//       className=" p-2 w-[80%]"
//       name="email"
//       id="email"
//     />
//   </div>
// </form>;
export default Login;
