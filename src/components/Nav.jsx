import React from 'react'
import Contact from "./Contact";
import { Link } from 'react-router-dom';


function Nav() {
    return (
        <nav className="flex justify-between bg-[#164e63] px-4 py-3 w-full h-18 text-white">
            <h1 className="font-bold text-xl">MovieFlex 🎬</h1>
            <ul className="flex gap-4">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav
