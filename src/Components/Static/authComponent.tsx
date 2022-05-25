import { useState } from "react";
import { signup, login } from "../../Data/auth";

export default function LogIn() {
  const [isLogIn, setLogIn] = useState(true);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <div className="w-96 h-[450px] transition-all flex bg-white rounded-lg flex-col items-center justify-start p-8">
      <h1 className="font-bold text-4xl mb-8">
        {isLogIn ? "Log In" : "Register"}
      </h1>
        <label htmlFor="email" className="w-full text-sm">
          Email:
        </label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          name="email"
          id="email"
          className="bg-slate-100 rounded-lg px-2 mb-8 w-full h-12"
        />
        <label htmlFor="pss" className="w-full text-sm">
          Password:
        </label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name="pss"
          id="pss"
          className="bg-slate-100 rounded-lg px-2 mb-8 w-full h-12"
        />
        <button
          onClick={() => {
            isLogIn ? login(Email, Password) : signup(Email, Password);
          }}
          className="w-full mb-4 h-12 rounded-lg bg-blue-600 transition-colors text-white text-xl hover:bg-blue-800"
        >
          {isLogIn ? "Sign In" : "Register"}
        </button>
        <button
          onClick={() => {
            setLogIn(!isLogIn);
          }}
          className="mb-4 h-12 w-full rounded-lg transition-colors hover:underline"
        >
          {!isLogIn ? "SignIn instead" : "Register"}
        </button>
    </div>
  );
}
