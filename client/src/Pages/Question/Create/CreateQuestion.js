import React, { useState, useContext } from "react";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import HttpClient from "../../../Services/HttpClient";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../Contexts/AppContext";
import './CreateQuestion.css';

export default function () {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState('');
    const { user } = useContext(AppContext);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        if(!content) return setErrors(['Treść jest wymagana']);

        const data = {
            content,
            userId: user._id,
            userName: user.name
        };

        const response = await HttpClient().post('/api/question/create', data);
        navigate(`/question/${response.data._id}`)
    }

    return (
        <div className="container">
            <h1 className="title">Create question</h1>
            <form onSubmit={onSubmit}>
                <FormErrors errors={errors}/>
                <div>
                    <input value={content} onChange={e => setContent(e.target.value)}></input>
                </div>

                <Button type="submit">Ask</Button>
            </form>
        </div>
    )
}