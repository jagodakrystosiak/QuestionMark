import React, { useContext, useEffect, useState } from "react";
import HttpClient from "../../Services/HttpClient";
import Button from "../../Components/Button/Button";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './Home.css';
import AppContext from "../../Contexts/AppContext";
import EditQuestion from "../Question/Edit/EditQuestion";

export default function () {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const { user } = useContext(AppContext);
    const [isEditQuestionOpen, setEditQuestionOpen] = useState(false);
    const [editQuestion, setEditQuestion] = useState(null);
    const [sortType, setSortType] = useState('createdAt');

    useEffect(() => {
        getQuestions();
        getAnswers();
    }, []);

    const getQuestions = async () => {
        const { data } = await HttpClient().get('/api/question');
        setQuestions(data);
    };

    const getAnswers = async () => {
        const { data } = await HttpClient().get('/api/answer');
        setAnswers(data);
    };

    const sortQuestions = (a, b) => {
        switch (sortType) {
            case 'userName':
                if (a.userName > b.userName) return 1;
                else return -1;
            case 'content':
                if (a.content > b.content) return 1;
                else return -1;
            case 'createdAt':
                if (a.createdAt > b.createdAt) return 1;
                else return -1;
            default:
                if (a.createdAt > b.createdAt) return 1;
                else return -1;

        }
    }

    return (
        <div className="container">
            <div className="home-title">
                <h1 className="title">Browse and answer questions</h1>
                {user && <Button onClick={() => navigate('/question/create')}>+</Button>}
            </div>
            <div className="sort">
                <h3>Sort by:
                    <select onChange={(e) => setSortType(e.target.value)}>
                        <option value="createdAt">date</option>
                        <option value="userName">author name</option>
                        <option value="content">content</option>
                    </select>
                </h3></div>

            <div className="question_list">
                {questions.sort(sortQuestions).map((question, index) =>
                    <div key={index}>
                        <div className="question-content">
                            <button onClick={() => navigate(`/question/${question._id}`)}>
                                <ul>
                                    <li>
                                        <Link to=''>{question.userName}</Link> asked on {question.createdAt.substring(0, 10)} {question.editedAt && question.editedAt.substring(0, 10) !== '1970-01-01' && <span className="edited">edited on {question.editedAt.substring(0, 10)}</span>}
                                    </li>
                                    <li><h2>{question.content}</h2></li>
                                </ul>
                            </button>
                            {user && user._id === question.userId ? <button id={index} className="btn-edit" onClick={() => {
                                setEditQuestionOpen(true);
                                setEditQuestion(question);
                            }}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button> : <div></div>}
                            {user && user._id === question.userId ? <button className="btn-delete" onClick={() => { HttpClient().get(`/api/question/delete/${question._id}`); window.location.reload(); }}><i className="fa fa-trash-o" aria-hidden="true"></i></button> : <div></div>}
                        </div>
                        {user && question === editQuestion && <EditQuestion isOpen={isEditQuestionOpen} onClose={() => setEditQuestionOpen(false)} question={question}></EditQuestion>}
                        <div className='question_answers'>
                            {answers.filter((answer) => answer.questionId === question._id ? true : false).map((answer, i) =>
                                <p>{answer.content} - <Link to='/'>{answer.userName}</Link> <span className="date">on {answer.createdAt.substring(0, 10)}</span></p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}