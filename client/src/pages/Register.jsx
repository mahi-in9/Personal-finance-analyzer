import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../app/slices/userSlice";

function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await dispatch(createUser(formData));
        console.log(response);

    }

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;

