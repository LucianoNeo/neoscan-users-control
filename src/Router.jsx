import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Users from './pages/Users'


export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/users' element={<Users />} />

        </Routes>
    )
}
