import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { loginUser, getRedirectPath } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data
        loginUser(data.user);
        setUser(data.user);

        // Redirect based on role
        const redirectPath = getRedirectPath(data.user.role);
        navigate(redirectPath);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex items-start">
            <img
              src="/Logo (5).png"
              alt="Google logo"
              className="w-20 h-20 mr-4"
            />
            <div className="flex flex-col">
              <h1 className="text-xs font-bold py-2 leading-tight tracking-tight text-gray-900 md:text-4xl dark:text-white text-PrimFont text-left">
                Sign in
              </h1>
              <p className="text-xs text-PrimFont justify-start text-left">
                Welcome back! Please sign in to continue
              </p>
            </div>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white justify-self-start text-PrimFont"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white justify-self-start text-PrimFont"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 text-PrimFont"
                    required=""
                  />
                </div>

                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline text-PrimFont"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-bgcSec bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-PrimBtn"
            >
              Sign in
            </button>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t opacity-60  border-PrimFont-100"></div>
              <span className="mx-4 text-PrimFont-100 font-extralight">or</span>
              <div className="flex-grow border-t opacity-60 border-PrimFont-100"></div>
            </div>

            <button
              type="submit"
              className="border w-full text-PrimFont bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-bgcSec flex items-center justify-center gap-2"
            >
              <img
                src="/google log.png"
                alt="Google logo"
                className="w-7 h-7"
              />
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
