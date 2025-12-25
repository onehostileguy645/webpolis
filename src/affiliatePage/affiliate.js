import { useState } from 'react';
import './style.css';

function AffiliatePage() {
    const [referralLink] = useState('https://insurance.uz/ref/USER12345');
    const [copied, setCopied] = useState(false);

    const affiliateStats = {
        totalReferrals: 12,
        activeReferrals: 8,
        totalEarnings: 450000,
        pendingEarnings: 120000
    };

    const referrals = [
        { id: 1, name: 'Алексей М.', date: '2024-12-15', status: 'active', earnings: 50000 },
        { id: 2, name: 'Ольга К.', date: '2024-12-10', status: 'active', earnings: 50000 },
        { id: 3, name: 'Дмитрий Р.', date: '2024-12-05', status: 'pending', earnings: 50000 },
        { id: 4, name: 'Светлана И.', date: '2024-11-28', status: 'active', earnings: 50000 }
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="dashboard-container">
            {/* Left Sidebar */}
            <div className="dashboard-sidebar">
                <div className="sidebar-header">
                    <div className="user-icon">👤</div>
                    <span>Моя страница</span>
                </div>
                <nav className="dashboard-nav">
                    <a href="/dash" className="nav-item-inactive">Мои документы</a>
                    <a href="/dash/affliate" className="nav-item">Партнерская программа</a>
                    <a href="/dash/history" className="nav-item-inactive">История</a>
                    <a href="#" className="nav-item-inactive">Настройки</a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="dashboard-main-content">
                <h1 className="dashboard-title">Партнерская программа</h1>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">👥</div>
                        <div className="stat-info">
                            <div className="stat-label">Всего рефералов</div>
                            <div className="stat-value">{affiliateStats.totalReferrals}</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">✅</div>
                        <div className="stat-info">
                            <div className="stat-label">Активные</div>
                            <div className="stat-value">{affiliateStats.activeReferrals}</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-info">
                            <div className="stat-label">Заработано</div>
                            <div className="stat-value">{affiliateStats.totalEarnings.toLocaleString()} сум</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⏳</div>
                        <div className="stat-info">
                            <div className="stat-label">В ожидании</div>
                            <div className="stat-value">{affiliateStats.pendingEarnings.toLocaleString()} сум</div>
                        </div>
                    </div>
                </div>

                {/* Referral Link */}
                <div className="referral-section">
                    <h2 className="section-title">Ваша реферальная ссылка</h2>
                    <div className="referral-box">
                        <input 
                            type="text" 
                            value={referralLink} 
                            readOnly 
                            className="referral-input"
                        />
                        <button onClick={copyToClipboard} className="copy-btn">
                            {copied ? '✓ Скопировано' : 'Копировать'}
                        </button>
                    </div>
                    <p className="referral-hint">
                        Поделитесь этой ссылкой с друзьями и получайте 50,000 сум за каждого оформленного полиса!
                    </p>
                </div>

                {/* How It Works */}
                <div className="how-works-section">
                    <h2 className="section-title">Как это работает</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Поделитесь ссылкой</h3>
                            <p>Отправьте реферальную ссылку друзьям и знакомым</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Они оформляют полис</h3>
                            <p>Ваш друг регистрируется и покупает страховку</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Получаете вознаграждение</h3>
                            <p>Вы получаете 50,000 сум за каждый оформленный полис</p>
                        </div>
                    </div>
                </div>

                {/* Referrals List */}
                <div className="referrals-section">
                    <h2 className="section-title">Мои рефералы</h2>
                    <div className="referrals-list">
                        {referrals.map(referral => (
                            <div key={referral.id} className="referral-item">
                                <div className="referral-info">
                                    <div className="referral-avatar">👤</div>
                                    <div>
                                        <div className="referral-name">{referral.name}</div>
                                        <div className="referral-date">Регистрация: {referral.date}</div>
                                    </div>
                                </div>
                                <div className="referral-right">
                                    <span className={`referral-status ${referral.status}`}>
                                        {referral.status === 'active' ? 'Активен' : 'В ожидании'}
                                    </span>
                                    <div className="referral-earnings">
                                        +{referral.earnings.toLocaleString()} сум
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="dashboard-right-sidebar">
                <div className="sidebar-section">
                    <h3 className="sidebar-title">Преимущества</h3>
                    <div className="benefit-item">
                        <div className="benefit-icon">💵</div>
                        <div className="benefit-text">50,000 сум за каждого реферала</div>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">🎁</div>
                        <div className="benefit-text">Бонусы за активных рефералов</div>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">📈</div>
                        <div className="benefit-text">Неограниченный потенциал</div>
                    </div>
                </div>

                <div className="sidebar-section">
                    <h3 className="sidebar-title">Поддержка</h3>
                    <p className="empty-text">Вопросы? Напишите нам на support@insurance.uz</p>
                </div>
            </div>
        </div>
    );
}

export default AffiliatePage;