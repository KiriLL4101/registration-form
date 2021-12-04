import React from "react"
import { Routes, Route} from 'react-router-dom'


import AuthPage from './pages/AuthPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage'
import SettingPage from './pages/SettingPage'

export const useRoutes = isAuth => {
    if(isAuth){
        return(
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/setting" element={<SettingPage />}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route exact path="/" element={<AuthPage />} />
            <Route exact path="/registration" element={<RegistrationPage />} />
        </Routes>

    )
}