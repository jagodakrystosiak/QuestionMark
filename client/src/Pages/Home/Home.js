import React, { useEffect, useState } from "react";
import HttpClient from "../../Services/HttpClient";
import Button from "../../Components/Button/Button";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function () {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const {data} = await HttpClient().get('/api/category');
        setCategories(data);
    };

    return (
        <div>
            <h1>Home</h1>
            <Button onClick={() => navigate('/category/create')}>Create Category</Button>

            <div>
                {categories.map((category, index) =>
                <div key={index}>
                    <Link to={`/category/${category._id}`}>{category.name}</Link>
                </div>
                    )}
            </div>
        </div>
    )
}