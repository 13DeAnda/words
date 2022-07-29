import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from '../Container/Container';
import Users from '../Users/Users';
import Header from '../Header/Header';
import Login from '../Login/Login';

export default function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<Container />} />
                <Route path="stats" element={<Users />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
