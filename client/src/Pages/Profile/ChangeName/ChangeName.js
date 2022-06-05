import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Modal from "../../../Components/Modal/Modal";
import AppContext from "../../../Contexts/AppContext";

export default function({isOpen, onClose}) {
    const {user, setUser} = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        
        if(!name) return setErrors(['Name is required']);
        else if(name === user.name) return setErrors(['Name cannot be the same'])

        const token = localStorage.getItem("token");
        const data = {
            name,
            userId: user._id
        }

        await axios.post('/api/user/change-name', data);

        setUser({
            ...user,
            name
        });
        onClose();
    }

    const closeModal = () => {
        onClose();
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Change Name">
            <form onSubmit={onSubmit}>
                <FormErrors errors={errors}/>
                <div>
                    <label>Name</label>
                    <input value={name} onChange={e => setName(e.target.value)}></input>
                </div>
                <Button type="submit">Change</Button>
            </form>
        </Modal>
    )
}