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

export default function () {
    const navigate = useNavigate();
    const [isNameOpen, setNameOpen] = useState(false);
    const [isEmailOpen, setEmailOpen] = useState(false);
    const [isPasswordOpen, setPasswordOpen] = useState(false);
    const { user } = useContext(AppContext);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = async () => {
        const { data } = await HttpClient().get('/api/question?userId=' + user._id);
        setQuestions(data);
    };

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

            <div className="question_list">
                <h1 className="title">Your questions</h1>
                {questions.map((question, index) =>
                    <div key={index}>
                        <div className="answer-content">
                            <button onClick={() => navigate(`/question/${question._id}`)}>
                                <ul>
                                    <li><Link to=''>{question.userName}</Link> asked on {question.createdAt.substring(0, 10)}</li>
                                    <li><h2>{question.content}</h2></li>
                                </ul>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}