// LoginPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isLogin) {
            // Handle login logic here
            console.log('Login:', { 
                email: formData.email, 
                password: formData.password 
            });
            navigate('/dash')

            alert('Login successful!');
        } else {
            // Handle register logic here
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            console.log('Register:', formData);
            
            navigate('/dash')
            alert('Registration successful!');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        // Clear form when switching modes
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            fullName: ''
        });
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
                        {!isLogin && (
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-input"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-input"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        )}

                        {isLogin && (
                            <div className="forgot-password">
                                <a href="#forgot">Forgot Password?</a>
                            </div>
                        )}

                        <button type="submit" className="submit-btn">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="toggle-mode">
                        <p>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <span onClick={toggleMode} className="toggle-link">
                                {isLogin ? 'Sign Up' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;