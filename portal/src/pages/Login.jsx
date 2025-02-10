import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "../redux/api/authAPI";
import { setAuth } from "../redux/reducer/authReducer";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin] = useSignInMutation();
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signin({
        email: email,
        password: password,
      });

      if (res.data.success && res.data) {
        const role = res?.data?.user?.accountType;
        if (role !== "Admin") {
          toast.error("You are not an admin");
          setEmail("");
          setPassword("");
        } else {
          toast.success(res.data.message);
          setEmail("");
          setPassword("");
          const token = res.data.token;
          localStorage.setItem("token", token);
          dispatch(setAuth({ token }));
          navigate("/admin/dashboard");
        }
      } else {
        const error = res.error;
        const message = error.dat.message;
        toast.error(message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div
        style={{ height: "550px" }}
        className="w-4/12 bg-white rounded-lg flex flex-col items-center justify-center drop-shadow-lg font-sans"
      >
        <div className="text-black font-bold text-2xl">Welcome to EduNexa!</div>
        <div className="text-center">
          <h2 className="mt-4 text-lg text-gray-500">
            Please sign in to your account to access the portal.
          </h2>
        </div>

        <form className="mt-8 space-y-10 w-4/5" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px w-full">
            <div className="w-full">
              <p className="mb-1">
                Email Address <sup className="text-red-700">*</sup>
              </p>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="w-full">
              <p className="mb-1 mt-2">
                Password <sup className="text-red-700">*</sup>
              </p>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
