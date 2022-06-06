import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppContext from "../../../Contexts/AppContext";
import HttpClient from "../../../Services/HttpClient";
import Button from "../../../Components/Button/Button";

export default function () {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        setQuestion(null);
        setAnswers([]);
        getQuestion();
    }, [id]);

    const getQuestion = async () => {
        const { data } = await HttpClient().get('/api/question/' + id);
        setQuestion(data);
        getAnswers();
    };

    const getAnswers = async () => {
        const { data } = await HttpClient().get('/api/answer?questionId=' + id);
        setAnswers(data);
    };

    return (
        <div>
            {question && <h1>{question.content}</h1>}

            {user && <Button onClick={() => navigate(`/answer/create/${id}`)}>Odpowiedź</Button>}

            <div>
                {answers.map((answer, index) => (
                    <div key={index}>
                        <p>{answer.userName} {answer.content} {answer.createdAt}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}