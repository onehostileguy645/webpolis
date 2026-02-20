// Header.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

function Header() {
    const [isLoginned] = useState(0);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="topBar">
            <label>Logo</label>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/calc">Insurance</a></li>
                <li><a href="/contacts">Contacts</a></li>
            </ul>
            {isLoginned === 0 && (  
                <>              
                <button onClick={handleLoginClick}>Login</button>
                </>
            )}
        </div>
    );
}

export default Header;