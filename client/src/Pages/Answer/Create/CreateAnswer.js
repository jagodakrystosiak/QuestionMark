import React, { useContext, useEffect, useState } from "react";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import HttpClient from "../../../Services/HttpClient";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../../Contexts/AppContext";
import { Link } from "react-router-dom";

export default function () {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState('');
    const { user } = useContext(AppContext);
    const [question, setQuestion] = useState([]);

    useEffect(() => {
        getQuestion();
    }, []);

    const getQuestion = async () => {
        const { data } = await HttpClient().get('/api/question/'+questionId);
        setQuestion(data);
    };

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
        <div className="container">
            <h1 className="title">Answering for <Link to={`/question/${questionId}`}>{question.content}</Link></h1>
            <form onSubmit={onSubmit}>
                <FormErrors errors={errors}/>
                <div>
                    <input value={content} onChange={e => setContent(e.target.value)}></input>
                </div>

                <Button type="submit">Answer</Button>
            </form>
        </div>
    )
}