import React, { useState } from "react";
import FormErrors from "../../Components/FormErrors/FormErrors";
import Button from "../../Components/Button/Button";
import validator from "validator";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function () {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!name) _errors.push('Name is required');
        if (!validator.isEmail(email)) _errors.push('Email is required');
        if (!password) _errors.push('Password is required');
        if (!passwordAgain) _errors.push('Password confirmation is required');
        if (password !== passwordAgain) _errors.push('Password must match');

        if (_errors.length) return setErrors(_errors);

        const data = {
            name,
            email, 
            password
        };

        try{
            await axios.post('/api/user/register', data);
        navigate('/auth/login');
        } catch(error){
            setErrors([error.response.data.message]);
        }
    };

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={onSubmit}>
                <FormErrors errors={errors} />
                <div>
                    <label>Name</label>
                    <input type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}></input>
                </div>
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
                <div>
                    <label>Password Again</label>
                    <input type="password"
                        value={passwordAgain}
                        onChange={e => setPasswordAgain(e.target.value)}></input>
                </div>

                <Button type="submit">Register</Button>
            </form>
        </div>
    )
}