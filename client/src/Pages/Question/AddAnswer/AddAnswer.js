import React, { useContext, useEffect, useState } from "react";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import HttpClient from "../../../Services/HttpClient";
import AppContext from "../../../Contexts/AppContext";
import Modal from "../../../Components/Modal/Modal";

export default function ({ isOpen, onClose, questionId }) {
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState('');
    const { user } = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        if (!content) return setErrors(['Treść jest wymagana do kontynuacji']);

        const data = {
            content,
            questionId,
            userId: user._id,
            userName: user.name
        };

        const response = await HttpClient().post('/api/answer/create', data);
        onClose();
    }

    const closeModal = () => {
        onClose();
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Create answer">
            <form onSubmit={onSubmit}>
                <FormErrors errors={errors} />
                <div>
                    <input value={content} onChange={e => setContent(e.target.value)}></input>
                </div>

                <Button type="submit" onClick={() => window.location.reload()}>Answer</Button>
            </form>
        </Modal>
    )
}