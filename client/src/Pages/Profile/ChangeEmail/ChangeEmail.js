import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Modal from "../../../Components/Modal/Modal";
import AppContext from "../../../Contexts/AppContext";
import validator from "validator";

export default function ({ isOpen, onClose }) {
    const { user, setUser } = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        if (!validator.isEmail(email)) return setErrors(['Email has to be in correct format']);
        else if (email === user.email) return setErrors(['Email cannot be the same'])

        const token = localStorage.getItem("token");
        const data = {
            email,
            userId: user._id
        }

        try {
            await axios.post('/api/user/change-email', data);

            setUser({
                ...user,
                email
            });
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
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Change Email">
            <form onSubmit={onSubmit}>
                <FormErrors errors={errors} />
                <div>
                    <label>Email: </label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className='sm-input'></input>
                </div>
                <Button type="submit">Change</Button>
            </form>
        </Modal>
    )
}