import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Users from './pages/Users'


export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Users />} />
            <Route path='/login' element={<Login />} />

        </Routes>
    )
}
