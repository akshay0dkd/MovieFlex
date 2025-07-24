import React from 'react'
import Contact from "./Contact";
import { Link } from 'react-router-dom';


function Nav() {
    return (
        <nav className="bg-red-800 relative text-white px-4 py-3 flex justify-between w-full h-18">
            <h1 className="font-bold text-xl">MOVIE App</h1>
            <ul className="flex gap-4">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
