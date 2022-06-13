import React, { useContext, useEffect, useState } from "react";
import ChangeName from "./ChangeName/ChangeName";
import ChangeEmail from "./ChangeEmail/ChangeEmail";
import ChangePassword from "./ChangePassword/ChangePassword";
import Button from "../../Components/Button/Button";
import AppContext from "../../Contexts/AppContext";
import HttpClient from "../../Services/HttpClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Profile.css';
import EditQuestion from "../Question/Edit/EditQuestion";

export default function () {
    const navigate = useNavigate();
    const [isNameOpen, setNameOpen] = useState(false);
    const [isEmailOpen, setEmailOpen] = useState(false);
    const [isPasswordOpen, setPasswordOpen] = useState(false);
    const { user } = useContext(AppContext);
    const [questions, setQuestions] = useState([]);
    const [isEditQuestionOpen, setEditQuestionOpen] = useState(false);
    const [editQuestion, setEditQuestion] = useState(null);
   

    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = async () => {
        const { data } = await HttpClient().get('/api/question?userId=' + user._id);
        setQuestions(data);
    };

    const questionsExist = () => {
        if (questions.length === 0) {
            return false
        }
        return true
    }

    return (
        <div className="container">
            <h1 className="title">Profile</h1>
            <div className="profile-data">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Created at: {user.createdAt.substring(0, 10)}</p>
            </div>


            <div className="change-options">
                <Button type="button" onClick={() => setNameOpen(true)}>Change Name</Button>
                <Button type="button" onClick={() => setEmailOpen(true)}>Change Email</Button>
                <Button type="button" onClick={() => setPasswordOpen(true)}>Change Password</Button>
            </div>

                <ChangeName isOpen={isNameOpen} onClose={() => setNameOpen(false)} />
                <ChangeEmail isOpen={isEmailOpen} onClose={() => setEmailOpen(false)} />
                <ChangePassword isOpen={isPasswordOpen} onClose={() => setPasswordOpen(false)} />

            {questionsExist() ? <div className="question_list">
                <h1 className="title">Your questions</h1>
                {questions.map((question, index) =>
                    <div key={index}>
                        <div className="question-content">
                            <button onClick={() => navigate(`/question/${question._id}`)}>
                                <ul>
                                    <li><Link to=''>{question.userName}</Link> asked on {question.createdAt.substring(0, 10)} {question.editedAt && question.editedAt.substring(0, 10) !== '1970-01-01' && <span className="edited">edited on {question.editedAt.substring(0,10)}</span>}</li>
                                    <li><h2>{question.content}</h2></li>
                                </ul>
                            </button>
                            {user && user._id === question.userId ? <button id={index} className="btn-edit" onClick={() => {
                                setEditQuestionOpen(true);
                                setEditQuestion(question);
                            }}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button> : <div></div>}
                            {user && user._id === question.userId ? <button className="btn-delete" onClick={() => HttpClient().get(`/api/answer/delete/${question._id}`)}><i className="fa fa-trash-o" aria-hidden="true"></i></button> : <div></div>}
                        </div>
                        {user && question === editQuestion && <EditQuestion isOpen={isEditQuestionOpen} onClose={() => setEditQuestionOpen(false)} question={question}></EditQuestion>}
                    </div>
                )}
            </div> : <div className="question_list"><h1 className="title">Your questions</h1>
            You didn't ask any questions, <p>but you can <Link to='/question/create'>ask here.</Link></p><br></br></div>}
        </div>
    )
}