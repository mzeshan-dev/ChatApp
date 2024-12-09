import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";

function Signup({ setRegisterTemp }) {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [file, setFile] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });

    setFile(e.target.files[0]);
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      formData.append("avatar", file);
    }
    const res = await dispatch(signInUser(formData));

    if (!res.success) {
      return console.log("erorr", res.message);
    }
    navigate("/");
  };

  return (
    <div className=" flex  h-[90%]  w-1/2 shadow-lg rounded-md ">
      <div className="   flex w-1/2 bg-white h-[100%]  rounded-tl-md rounded-bl-md items-center justify-center ">
        <form
          onSubmit={handleSubmitForm}
          action=""
          className=" p-2 gap-2  mt-10 flex justify-center items-center  border w-[80%] flex-col border-none m-auto "
        >
          <h1 className=" font-bold text-lg text-center">Create account..! </h1>
          <div className=" w-[90%]  flex flex-col">
            <label className=" font-semibold" htmlFor="username">
              Username<span className=" text-red-800">*</span>
            </label>
            <input
              onChange={handleOnChange}
              type="username"
              className=" p-2 w-full border border-gray-200 rounded-md outline-none  ps-2"
              name="username"
              id="username"
              placeholder=" Enter email... "
            />
          </div>
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
          </div>
          <div className=" w-[90%] flex  items-center justify-between">
            <label
              className=" border border-gray-500 p-1 rounded-sm  text-sm"
              htmlFor="file"
            >
              upload
            </label>
            <img
              src={imgUrl ? imgUrl : ""}
              className=" inline  w-10 h-10 rounded-full "
            />{" "}
            <input
              onChange={handleOnChange}
              type="file"
              hidden
              name="file"
              id="file"
            />
          </div>
          <button
            type="submit"
            className="  p-2 w-[80%] rounded-md bg-blue-300 border border-blue-700"
          >
            Login
          </button>
          <div className="text-sm">
            already have a account?{" "}
            <a onClick={() => setRegisterTemp("login")} href="">
              login
            </a>
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

export default Signup;
