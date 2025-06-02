import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "../src/components/Header.tsx";
import Home from "./pages/Home/Home.tsx";
import Chat from "./pages/Chat/Chat.tsx";
import Events from "./pages/Events/Events.tsx";
import Profile from "./pages/Profile/Profile.tsx";

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/chat" element={<Chat/>} />
                    <Route path="/events" element={<Events/>}/>
                    <Route path="/calendar" element={<span>Calendar</span>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
            </main>
        </div>
    );
};

export default App;
