import { useState } from "react";

function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Username:", formData.username);
        console.log("Email:", formData.email);
        console.log("Password:", formData.password);
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
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
        </>
    );
}

export default Register;

