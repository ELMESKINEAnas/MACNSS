import React, { useState } from "react";
import { useNavigate } from "react-router";
import { LoginMutation } from "../Hooks/query";

function LoginAgent() {
  // const { mutate } = LoginMutation("agent");
  const navigate = useNavigate();
  const [email, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [loginMutation] = LoginMutation("agent", "ManagePatient");


  const handleLogin = (e) => {
    e.preventDefault();
    //@ts-ignore
    loginMutation.mutate({ email, password });
  };
  return (
    <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-ehe-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-poppins">
            Sign in to your Agent account
          </h2>
        </div>
        <form className="mt-8 space-y-8 ">
          <div className="rounded-md shadow-sm flex flex-col gap-3">
            <div>
              <label htmlFor="email-address" className="sr-only">
                matriculations
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                autoComplete="email"
                required
                className={`appearance-none  relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm `}
                placeholder="Email"
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email-address" className="sr-only">
                Password
              </label>
              <input
                name="Password"
                type="password"
                value={password}
                autoComplete="current-password"
                required
                className={`appearance-none  relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm `}
                placeholder="Password"
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm" />
          </div>

          <div className="space-y-3">
            <button
              // type="submit"
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <button
              // type="submit"

              // onClick={() => navigate("/ManagePatient") }
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-gray-700"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginAgent;
