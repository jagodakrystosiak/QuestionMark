import React, { useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../Contexts/AppContext";

export default function () {
    const { logout, user } = useContext(AppContext);

    return (
        <div className="navbar">
            <h1 className="nav-name"><Link to="/" >QuestionMark</Link></h1>

            <nav>
                <ul>
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
                            <button >{user.name}</button>
                            <ul>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <a href="/" onClick={logout}>Logout</a>
                                </li>
                            </ul>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}