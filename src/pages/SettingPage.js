import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

function SettingPage() {
    const message = useMessage()
    const { request, loading } = useHttp()
    const [form , setForm] = useState({
        oldPassword: '',
        password: '',
        repeatPassword: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const changePasswordHandler = async e => {

        if(!form.oldPassword || !form.password || !form.repeatPassword){
            message('Заполните поля')
            return
        }

        if(form.password.length <= 4 || form.password.length >=  15 || !form.password.match(/[A-Z]/)){
            message('Длинна пароля должна быть больше 4 и иметь хотя бы 1 заглавную букву ')
            return
        }

        if(form.password !== form.repeatPassword){
            message('Пароли должны совпадать')
            return
        }

        try {

            const data = await request(`/users/${JSON.parse(window.localStorage.getItem('userId')).userId}`, 'GET')

            if(data && data.password !== form.oldPassword){
                message("Неверный старый пароль")
                return
            }

            await request(`/users/${JSON.parse(window.localStorage.getItem('userId')).userId}`, 'PATCH', { password: form.password })
            setForm({
                oldPassword: '',
                password: '',
                repeatPassword: ''
            })
            message('Пароль успешно изменен')
        } catch (error) {}
    }

    return (
        <div className="row">
            <div className="col s4 offset-s4">
                <div className="card blue darken-3">
                    <div className="card-content white-text">
                        <h2 className="card-title">
                            Смена пароля
                        </h2>
                        <div className="input-field">
                            <input id="oldPassword" type="password" name="oldPassword" minlength="4" mixlength="15" onChange={changeHandler}/>
                            <label htmlFor="oldPassword">Старый пароль</label>
                        </div>
                        <div className="input-field">
                            <input id="password" type="password" name="password" minlength="4" mixlength="15" onChange={changeHandler} />
                            <label htmlFor="password">Пароль</label>
                        </div>
                        <div className="input-field">
                            <input id="repeatPassword" type="password" name="repeatPassword" minlength="4" mixlength="15" onChange={changeHandler} />
                            <label htmlFor="repeatPassword">Повторите пароль</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <Link to="/" className="btn blue darken-1" style={{ marginRight: 15}} disabled={loading} >Назад</Link>
                        <button onClick={changePasswordHandler} className="btn blue darken-1" disabled={loading}>Сменить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingPage
