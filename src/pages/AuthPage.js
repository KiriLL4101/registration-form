import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { setUser } from '../redux/action/auth'

function AuthPage() {
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [ form, setFrom ] = useState({
        email: '', password: ''
    })
    let dispatch = useDispatch(); 
    const { login } = useSelector(({ params }) => {
        return {
            login: params.login
        }
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setFrom({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        if(!form.email || !form.password){
            message('Заполните поля')
            return
        }
        if(!form.email.includes('@')){
            message('Не корректный email')
            return
        }

        if(form.password.length <= 4 || form.password.length >=  15 || !form.password.match(/[A-Z]/)){
            message('Длинна пароля должна быть больше 4 и иметь хотя бы 1 заглавную букву ')
            return
        }


        try {
            const data = await request(`/users?email=${form.email}`, 'GET')
            if(data && data[0] && data[0].password === form.password){
                console.log(data)
                dispatch(setUser({...data[0], userId: data[0].id}))
                login(data[0].id)
                return
            }
           setFrom({
                email: '', password: ''
            })
            message('Неверный пароль')
        } catch (e) {
             // window.location.href = 'http://stackoverflow.com/search?q=[js]' + e.message
        }
    }


    return (
        <div className="row">
            <div className="col s4 offset-s4">
                <div className="card blue darken-3">
                    <div className="card-content white-text">
                        <h2 className="card-title">
                            Авторизация
                        </h2>
                        <div className="input-field">
                            <input id="email" type="email" name="email" onChange={changeHandler} value={form.email} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input id="password" type="password" name="password" onChange={changeHandler} value={form.password}/>
                            <label htmlFor="password">Пароль</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn blue darken-1" style={{ marginRight: 15}} onClick={loginHandler} disabled={loading}>Войти</button>
                        <Link to="/registration" className="btn blue darken-1" disabled={loading}>Регистрация</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
