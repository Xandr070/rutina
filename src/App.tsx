import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "../src/components/Header.tsx";
import Home from "./pages/Home/Home.tsx";
import Chat from "./pages/Chat/Chat.tsx";
import Events from "./pages/Events/Events.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import Calendar from "./pages/Calendar/Calendar.tsx";

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/rutina/" element={<Home/>}/>
                    <Route path="/rutina/chat" element={<Chat/>} />
                    <Route path="/rutina/events" element={<Events/>}/>
                    <Route path="/rutina/calendar" element={<Calendar/>}/>
                    <Route path="/rutina/profile" element={<Profile/>}/>
                </Routes>
            </main>
        </div>
    );
};

export default App;
