import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "./../../Images/Logo.png";
import AppContext from "../../Contexts/AppContext";

export default function () {
    const {logout, user} = useContext(AppContext);
    return (
        <div>
            <img src={Logo} alt="Logo" className="logo"></img>
            <h1>QuestionMark</h1>

            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!user ? (<li>
                    <button>Account</button>
                    <ul>
                        <li>
                            <Link to="/auth/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/auth/register">Register</Link>
                        </li>
                    </ul>
                </li>) : (
                    <li>
                        <button>{user.name}</button>
                        <ul>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <a href="#" onClick={logout}>Logout</a>
                            </li>
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    )
}