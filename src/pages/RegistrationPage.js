import React  from 'react'
import { Link, useNavigate  } from 'react-router-dom'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

function RegistrationPage() {
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setFrom] = React.useState({
        email: '', password: '', repeatPassword: ''
    })

    const navigate = useNavigate();

    React.useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setFrom({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
       
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

        if(form.password !== form.repeatPassword){
            message('Пароли должны совпадать')
            return
        }


        try {
            const data = await request('/register', 'POST', { email: form.email, password: form.password })
            navigate('/')
        } catch (error) {}
    }

    return (
        <div className="row">
            <div className="col s4 offset-s4">
                <div className="card blue darken-3">
                    <div className="card-content white-text">
                        <h2 className="card-title">
                            Регистрация
                        </h2>
                        <div className="input-field">
                            <input id="email" type="email" name="email" onChange={changeHandler}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input id="password" type="text" name="password" onChange={changeHandler}/>
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field">
                            <input id="repeat-password" type="text" name="repeatPassword" onChange={changeHandler}/>
                            <label htmlFor="repeat-password">Repeat Password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <Link to="/" className="btn blue darken-1" style={{ marginRight: 15}}>Назад</Link>
                        <button to="/" className="btn blue darken-1" onClick={registerHandler} disabled={loading}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage
