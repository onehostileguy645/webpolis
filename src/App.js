import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CalcPage from "./mainPages/calcpage.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./mainPages/Footer/footer.js";
import Header from "./mainPages/Header/header.js";
import ContactsPage from "./mainPages/Contacts/contacrs.js";
import LoginPage from "./login/login.js";
import Dashboard from "./profilesection/insuranceDashboard/insuranceDashboard.js";
import AffiliatePage from "./profilesection/affiliatePage/affiliate.js";
import HistoryPage from "./profilesection/historyPage/history.js";
import InfoPage from "./mainPages/InfoPage/infopage.js";
import SettingsPage from "./profilesection/settingsPage/settings.js";

function App() {
    return (
        <BrowserRouter>
            <div className="page-content">
                <Routes>
                    <Route path="/" element={<div><Header/><InfoPage/></div>} />
                    <Route path="/calc" element={<div><Header/><CalcPage/></div>} />
                    <Route path="/contacts" element={<div><Header/><ContactsPage/></div>} />
                    <Route path="/login" element={<div><Header/><LoginPage/></div>} />
                    <Route path="/dash" element={<div><Dashboard/></div>} />
                    <Route path="/dash/affliate" element={<div><AffiliatePage/></div>} />
                    <Route path="/dash/history" element={<div><HistoryPage/></div>} />
                    <Route path="/dash/settings" element={<div><SettingsPage/></div>} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App