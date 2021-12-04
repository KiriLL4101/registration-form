import React from 'react'
import { Link } from 'react-router-dom'

function SettingPage() {
    return (
        <div className="row">
            <div className="col s4 offset-s4">
                <div className="card blue darken-3">
                    <div className="card-content white-text">
                        <h2 className="card-title">
                            Смена пароля
                        </h2>
                        <div className="input-field">
                            <input id="oldPassword" type="password" name="oldPassword" />
                            <label htmlFor="oldPassword">Email</label>
                        </div>
                        <div className="input-field">
                            <input id="password" type="password" name="password" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field">
                            <input id="repeatPassword" type="password" name="repeatPassword" />
                            <label htmlFor="repeatPassword">Password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <Link to="/" className="btn blue darken-1" style={{ marginRight: 15}}>Назад</Link>
                        <button className="btn blue darken-1">Сменить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingPage
