import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppContext from "../../../Contexts/AppContext";
import HttpClient from "../../../Services/HttpClient";
import Button from "../../../Components/Button/Button";

export default function () {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [fora, setFora] = useState([]);

    useEffect(() => {
        setCategory(null);
        setFora([]);
        getCategory();
    }, [id]);

    const getCategory = async () => {
        const { data } = await HttpClient().get('/api/category/' + id);
        setCategory(data);
        getFora();
    };

    const getFora = async () => {
        const { data } = await HttpClient().get('/api/forum?categoryId=' + id);
        setFora(data);
    }

    return (
        <div>
            {category && <h1>{category.name}</h1>}

            {user && <Button onClick={() => navigate(`/forum/create/${id}`)}>Create Forum</Button>}

            <div>
                {fora.map((forum, index) => (
                    <div key={index}>
                        <Link to={`/forum/${forum._id}`}>{forum.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}