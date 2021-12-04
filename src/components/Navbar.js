import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar() {
    const { logout } = useSelector(({ params }) => {
        return {
            logout: params.logout
        }
    })
    return (
        <nav className="blue">
            <div className="nav-wrapper">
                <a href="#" className="brand-logo">Something Logo</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><Link to="/setting" >Setting</Link></li>
                    <li><Link to="/" onClick={logout}>Logout</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
