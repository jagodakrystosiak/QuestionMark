import React, { useEffect, useState } from "react";
import HttpClient from "../../Services/HttpClient";
import Button from "../../Components/Button/Button";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = async () => {
        const {data} = await HttpClient().get('/api/question');
        setQuestions(data);
    };

    return (
        <div>
            <Button onClick={() => navigate('/question/create')}>Zadaj pytanie</Button>

            <div>
                {questions.map((question, index) =>
                <div key={index}>
                    <Link to={`/question/${question._id}`}>{question.userName} {question.content} {question.createdAt}</Link>
                </div>
                    )}
            </div>
        </div>
    )
}