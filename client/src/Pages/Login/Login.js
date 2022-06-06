import React, { useContext, useState } from "react";
import HttpClient from "../../Services/HttpClient";
import FormErrors from "../../Components/FormErrors/FormErrors";
import Button from "../../Components/Button/Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AppContext from "../../Contexts/AppContext";

export default function () {
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!email) _errors.push('Email is required');
        if (!password) _errors.push('Password is required');

        if (_errors.length) return setErrors(_errors);

        try {
            const data = {
                email,
                password
            };

            const response = await HttpClient().post('/api/user/login', data);
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
            navigate('/');
        } catch (error) {
            setErrors([error.response.data.message]);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={onSubmit}>
                <FormErrors errors={errors} />
                <div>
                    <label>Email</label>
                    <input type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}></input>
                </div>

                <Button type="submit">Login</Button>
            </form>
        </div>
    )
}