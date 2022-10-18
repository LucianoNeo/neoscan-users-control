import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Users from './pages/Users'
import { useContext } from 'react'
import { Context } from './Context/AuthContext'

export default function Router() {
    const { authenticated } = useContext(Context)
    return (
        <Routes>


            <Route path='/' element={<Login />} />

            <Route path='/users' element={<Users />} />



        </Routes>
    )
}
