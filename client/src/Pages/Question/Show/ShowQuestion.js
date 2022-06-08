import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppContext from "../../../Contexts/AppContext";
import HttpClient from "../../../Services/HttpClient";
import Button from "../../../Components/Button/Button";
import './ShowQuestion.css';
import AddAnswer from "../AddAnswer/AddAnswer";
import EditAnswer from "../EditAnswer/EditAnswer";

export default function () {
    const { user } = useContext(AppContext);
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [isAnsweringOpen, setAnsweringOpen] = useState(false);
    const [isEditAnswerOpen, setEditAnswerOpen] = useState(false);
    const [ editAnswer, setEditAnswer ] = useState(null);

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

    const noAnswers = () => {
        if (answers.length === 0) {
            return false
        }
        return true
    }



    return (
        <div className="container">
            <Link to='/' className="link-home">Home</Link> / Question
            <div className="question">
                {question && <div><p><Link to=''>{question.userName}</Link> asked on {question.createdAt.substring(0, 10)} </p><h1>{question.content}</h1></div>}
                {user && <Button type="button" onClick={() => setAnsweringOpen(true)}>Answer</Button>}
            </div>
            <div className="answers">
                {user && <AddAnswer isOpen={isAnsweringOpen} onClose={() => setAnsweringOpen(false)} questionId={question} />}
                <h1>Answers</h1>
                {noAnswers() ? <div className="answers-list">
                    {answers.map((answer, index) => (
                        <div key={index}>
                            <div className="answer-content">
                                <ul>
                                    <li><Link to=''>{answer.userName}</Link> answered on {answer.createdAt.substring(0, 10)}</li>
                                    <li><h2>{answer.content}</h2></li>
                                </ul>
                                {user && user._id === answer.userId ? <button className="btn-edit" onClick={() => {
                                    setEditAnswerOpen(true);
                                    setEditAnswer(answer);
                                }}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button> : <div></div>}
                                {user && answer && user._id === answer.userId ? <button className="btn-delete" onClick={() => HttpClient().get(`/api/answer/delete/${answer._id}`)}><i className="fa fa-trash-o" aria-hidden="true"></i></button> : <div></div>}
                            </div>
                            {user && answer === editAnswer && <EditAnswer isOpen={isEditAnswerOpen} onClose={() => setEditAnswerOpen(false)} answer={editAnswer}></EditAnswer>}
                        </div>
                    ))}
                </div> : <div className="answers-list"><p>No answers,{user && <div>but you can <Link to={`/question/${id}`} onClick={() => setAnsweringOpen(true)}>answer now</Link></div>}</p></div>}
            </div>
        </div>
    )
}