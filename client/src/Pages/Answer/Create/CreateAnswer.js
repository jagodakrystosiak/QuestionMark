import React, { useContext, useState } from "react";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import HttpClient from "../../../Services/HttpClient";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../../Contexts/AppContext";

export default function () {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState('');
    const { user } = useContext(AppContext);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        if(!content) return setErrors(['Treść jest wymagana do kontynuacji']);

        const data = {
            content,
            questionId,
            userId: user._id,
            userName: user.name
        };

        const response = await HttpClient().post('/api/answer/create', data);
        navigate(`/question/${questionId}`)
    }

    return (
        <div>
            <h1>Dodawanie odpowiedzi</h1>
            <form onSubmit={onSubmit}>
                <FormErrors errors={errors}/>
                <div>
                    <labe>Treść: </labe>
                    <input value={content} onChange={e => setContent(e.target.value)}></input>
                </div>

                <Button type="submit">Dodaj</Button>
            </form>
        </div>
    )
}