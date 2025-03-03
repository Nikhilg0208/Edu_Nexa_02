import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "../redux/api/authAPI";
import { setAuth } from "../redux/reducer/authReducer";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

    const res = await signin({ email, password });

    if (res?.error) {
      const errorMessage =
        res.error?.data?.message || "Something went wrong. Please try again.";
        
      toast.error(errorMessage);
      return;
    }

    if (res?.data?.success) {
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
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-300">
      <div className="w-4/12 h-3/4 bg-white rounded-lg flex flex-col items-center justify-center drop-shadow-lg font-sans">
        <div className="text-black font-bold text-2xl">Welcome to EduNexa!</div>
        <div className="text-center">
          <h2 className="mt-4 text-lg text-gray-500">
            Please sign in to your account to access the portal.
          </h2>
        </div>

        <form className="mt-8 space-y-10 w-4/5" onSubmit={handleSubmit}>
          <div className="rounded-md  -space-y-px w-full">
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
            <div className="relative w-full">
              <p className="mb-1 mt-2">
                Password <sup className="text-red-700">*</sup>
              </p>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-600"
              >
                {showPassword ? (
                  <AiFillEye className="h-5 w-5" />
                ) : (
                  <AiFillEyeInvisible className="h-5 w-5" />
                )}
              </button>
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
