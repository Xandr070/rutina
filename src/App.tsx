import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "../src/components/Header.tsx";
import Home from "./pages/Home.tsx";

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/chat" element={<span>Chat</span>} />
                    <Route path="/events" element={<span>Events</span>}/>
                    <Route path="/calendar" element={<span>Calendar</span>}/>
                    <Route path="/profile" element={<span>Profile</span>}/>
                </Routes>
            </main>
        </div>
    );
};

export default App;
