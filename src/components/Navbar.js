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
                <Link to="/" className="brand-logo">Something Logo</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/setting" >Настройки</Link></li>
                    <li><Link to="/" onClick={logout}>Выход</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
