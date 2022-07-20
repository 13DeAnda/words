import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from '../Container/Container';
import Users from '../Users/Users';
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Container />} />
                <Route path="users" element={<Users />} />
            </Routes>
        </BrowserRouter>
    );
}
