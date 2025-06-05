import { useState } from "react";
import { useStore } from "../../store/state";
import { Link } from "react-router-dom";

export const Register = () => {
  const { register } = useStore().auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Login submitted:", { email, password });
    register(email, password);
  };

  return (
    <main className="flex w-full items-center justify-center md:mt-20">
      <div
        className="w-full max-w-sm p-8 md:border rounded-lg shadow-sm "
        style={{ backgroundColor: "rgb(41 40 46)" }}
      >
        <form className="space-y-6" onSubmit={onRegister}>
          <div className="flex justify-center">
            <img
              className="rounded-md h-24 md:h-48"
              src="/blueberrychat.png"
              alt="logo"
            />
          </div>

          <h5 className="text-xl font-medium">Register in to Blueberry-chat</h5>
          <div>
            <label className="block mb-2 text-sm font-medium">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-4 cursor-pointer w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Login to your account
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};
