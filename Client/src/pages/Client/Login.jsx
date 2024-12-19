import { useAuth } from "../../hooks/useAuth";
import { loginUser, getRedirectPath } from "../../utils/auth";

const Login = () => {
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
      console.log("Login response:", data);

      if (data.success) {
        try {
          // Store the token and user data
          loginUser({
            token: data.token,
            user: data.user,
          });

          // Set the user in context
          setUser(data.user);

          // Get the correct redirect path based on role
          const redirectPath = getRedirectPath(data.user.role);
          console.log("Redirecting to:", redirectPath); // Debug log

          // Force a hard navigation to the new route
          window.location.href = redirectPath;
        } catch (error) {
          console.error("Error during login process:", error);
          alert(error.message);
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen px-6 py-8 mx-auto">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
              <div className="flex items-start"></div>
            </div>
            <button
              type="submit"
              className="w-full text-bgcSec bg-FontPrimary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-PrimBtn"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
