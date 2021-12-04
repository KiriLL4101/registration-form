import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
    const [userId, setUserId] = useState(null)

    const login = useCallback((id) => {
        setUserId(id)

        window.localStorage.setItem('userId', JSON.stringify({ userId: id }))
    }, [])

    const logout = useCallback(() => {
        setUserId(null)

        window.localStorage.removeItem('userId')
    }, [])

    useEffect(() => {
        const data = JSON.parse(window.localStorage.getItem('userId'))

        if(data && data.userId){
            login(data.userId)
        }
    }, [login])

    return { login, logout, userId }

}