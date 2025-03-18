import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

            if (response.data) {
                const { token, role } = response.data;

                // Save token & role in localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                // Redirect based on role
                if (role === "super_admin") {
                    navigate("/admin/dashboard");
                } else if (role === "store_manager") {
                    navigate("/stores/dashboard");
                } else {
                    navigate("/user/dashboard"); // Default dashboard
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || "Invalid credentials!");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
