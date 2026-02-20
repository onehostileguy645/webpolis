// LoginPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function LoginPage() {
    const [isLogin] = useState(true);
    const [formData, setFormData] = useState({
        number: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Login:', {
            number: formData.number
        });
        navigate('/dash')

        alert('Login successful!');
    };

    return (
        <div className="login-page-container">
            <div className="login-wrapper">
                <div className="login-card">
                    <div className="login-header">
                        <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                        <p>{isLogin ? 'Login to your account' : 'Sign up to get started'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="number"
                                name="number"
                                className="form-input"
                                placeholder="Enter your Phone number"
                                value={formData.number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;