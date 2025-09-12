import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import type { LoginFormData } from "@/schemas/authSchema";
import { useNavigate } from "react-router";
import { useState } from "react";
import { loginUser } from "@/services/auth.service";
import { useAuth } from "../context/useAuth";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError("");
    try {
      const response = await loginUser(data.email, data.password);

      if (response.status === 200) {
        const { token, user } = response.data;

        if (rememberMe) {
          localStorage.setItem("token", token);
        }

        login(user, token);

        if (user.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/member-dashboard");
        }
      } else {
        setLoginError(response.data.msg || "Login failed!");
      }
    } catch {
      setLoginError("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Login
        </h2>

        {loginError && (
          <p className="text-red-500 text-center mb-4 font-medium">
            {loginError}
          </p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-sm text-gray-600 hover:text-gray-900"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2 accent-gray-900"
          />
          <label className="text-gray-700 font-medium">Remember Me</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
