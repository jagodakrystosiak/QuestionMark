import React, { useState } from "react";
import FormErrors from "../../../Components/FormErrors/FormErrors";
import Button from "../../../Components/Button/Button";
import HttpClient from "../../../Services/HttpClient";
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        if(!name) return setErrors(['Name is required']);

        const data = {
            name
        };

        const response = await HttpClient().post('/api/category/create', data);
        navigate(`/category/${response.data._id}`)
    }

    return (
        <div>
            <h1>Create category</h1>
            <form onSubmit={onSubmit}>
                <FormErrors errors={errors}/>
                <div>
                    <labe>Name</labe>
                    <input value={name} onChange={e => setName(e.target.value)}></input>
                </div>

                <Button type="submit">Create Category</Button>
            </form>
        </div>
    )
}