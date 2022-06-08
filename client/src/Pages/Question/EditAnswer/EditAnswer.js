import React, { useContext, useEffect, useState } from "react";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import AppContext from "../../../Contexts/AppContext";
import Modal from "../../../Components/Modal/Modal";
import axios from "axios";

export default function ({ isOpen, onClose, answer }) {
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState('');
    const { user } = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        if (!content) return setErrors(['Treść jest wymagana do kontynuacji']);
        if (content === answer.content) return setErrors(['Do not add any changes']);

        const data = {
            content,
        };
        try {
            await axios.post(`/api/answer/update/${answer._id}`, data);

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
        answer.userId === user._id ?
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit answer">
            <form onSubmit={onSubmit}>
                <FormErrors errors={errors} />
                <div>
                    <input onChange={e => setContent(e.target.value)} defaultValue={answer.content}></input>
                </div>

                <Button type="submit" onClick={() => window.location.reload()}>Edit</Button>
            </form>
        </Modal> : <div></div>
    )
}