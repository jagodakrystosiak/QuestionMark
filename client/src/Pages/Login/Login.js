import React, { useContext, useState } from "react";
import HttpClient from "../../Services/HttpClient";
import FormErrors from "../../Components/FormErrors/FormErrors";
import Button from "../../Components/Button/Button";
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
        <div className="container">
            <h1 className="title">Login</h1>

            <form onSubmit={onSubmit}>
                <FormErrors errors={errors} />
                <table>
                    <tr>
                        <td><label>Email: </label></td>
                        <td><input type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)} className='sm-input'></input></td>
                    </tr>
                    <tr>
                        <td><label>Password: </label></td>
                        <td><input type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} className='sm-input'></input></td>
                    </tr>
                </table>

                <Button type="submit">Login</Button>
            </form>
        </div>
    )
}