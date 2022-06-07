import React, { useContext, useEffect, useState } from "react";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import HttpClient from "../../../Services/HttpClient";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../../Contexts/AppContext";
import Modal from "../../../Components/Modal/Modal";
import axios from "axios";

export default function ({ isOpen, onClose, question }) {
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState('');
    const { user } = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        if (!content) return setErrors(['Treść jest wymagana do kontynuacji']);
        if (content === question.content) return setErrors(['Do not add any changes']);

        const data = {
            content,
        };
        try {
            await axios.post(`/api/question/update/${question._id}`, data);

            onClose();
        }
        catch (e) {
            setErrors([e.response.data.message]);
        }
    }

    const closeModal = () => {
        onClose();
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    return (
        question.userId === user._id ?
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit question">
            <form onSubmit={onSubmit}>
                <FormErrors errors={errors} />
                <div>
                    <input onChange={e => setContent(e.target.value)} defaultValue={question.content}></input>
                </div>

                <button type="submit" className="btn-violet" onClick={() => window.location.reload()}>Edit</button>
            </form>
        </Modal> : <div></div>
    )
}