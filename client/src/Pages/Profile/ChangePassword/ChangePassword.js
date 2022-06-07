import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Modal from "../../../Components/Modal/Modal";
import AppContext from "../../../Contexts/AppContext";

export default function ({ isOpen, onClose }) {
    const { user, setUser } = useContext(AppContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!currentPassword) _errors.push('Current password is required');
        if (!password) _errors.push('New password is required');
        if (!passwordAgain) _errors.push('New password is required');
        if (password !== passwordAgain) _errors.push('Password must match');
        else if (password === user.password) return setErrors(['Password cannot be the same'])

        if (_errors.length) return setErrors(_errors);

        const data = {
            currentPassword,
            password,
            userId: user._id
        }

        try {
            await axios.post('/api/user/change-password', data);
            onClose();
            setCurrentPassword("");
            setPassword("");
            setPasswordAgain("");
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
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Change Password">
            <form onSubmit={onSubmit}>
                <FormErrors errors={errors} />
                <table>
                    <tr>
                        <td><label>Current Password: </label></td>
                        <td><input type="password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)} className='sm-input'></input></td>
                    </tr>
                    <tr>
                        <td><label>New Password: </label></td>
                        <td><input type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} className='sm-input'></input></td>
                    </tr>
                    <tr>
                        <td><label>New Password Again: </label></td>
                        <td><input type="password"
                        value={passwordAgain}
                        onChange={e => setPasswordAgain(e.target.value)} className='sm-input'></input></td>
                    </tr>
                </table>
                <Button type="submit">Change</Button>
            </form>
        </Modal>
    )
}