// Dashboard.js
import { useState } from 'react';
import './style.css';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('all');
    
    // Sample insurance policies data
    const policies = [
        {
            id: 1,
            type: 'OSAGO',
            policyNumber: '202502-OSG1020-001',
            company: 'Uzagrosugurta',
            status: 'active',
            validUntil: '2026-01-15',
            carModel: 'Toyota Camry',
            carNumber: 'AA 123 BC'
        },
        {
            id: 2,
            type: 'OSAGO',
            policyNumber: '202501-OSG1021-003',
            company: 'O\'zbekinvest',
            status: 'active',
            validUntil: '2025-12-20',
            carModel: 'Chevrolet Lacetti',
            carNumber: 'BB 456 DE'
        },
        {
            id: 3,
            type: 'KASKO',
            policyNumber: '202502-KSK1011-001',
            company: 'Gross Insurance',
            status: 'active',
            validUntil: '2026-02-10',
            carModel: 'BMW X5',
            carNumber: 'CC 789 FG'
        },
        {
            id: 4,
            type: 'OSAGO',
            policyNumber: '202412-OSG1021-002',
            company: 'Alskom',
            status: 'expired',
            validUntil: '2024-12-15',
            carModel: 'Hyundai Sonata',
            carNumber: 'DD 321 HI'
        }
    ];

    const filteredPolicies = activeTab === 'all' 
        ? policies 
        : policies.filter(p => p.status === activeTab);

    return (
        <div className="dashboard-container">
            {/* Left Sidebar */}
            <div className="dashboard-sidebar">
                <div className="sidebar-header">
                    <div className="user-icon">👤</div>
                    <span>Моя страница</span>
                </div>
                <nav className="dashboard-nav">
                    <a href="/dash" className="nav-item">Мои документы</a>
                    <a href="/dash/affliate" className="nav-item-inactive">Партнерская программа</a>
                    <a href="/dash/history" className="nav-item-inactive">История</a>
                    <a href="/dash/settings" className="nav-item-inactive">Настройки</a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="dashboard-main-content">
                <h1 className="dashboard-title">Мои документы</h1>

                {/* Tabs */}
                <div className="dashboard-tabs">
                    <button 
                        className={activeTab === 'all' ? 'dashboard-tab-active' : 'dashboard-tab'}
                        onClick={() => setActiveTab('all')}
                    >
                        Все
                    </button>
                    <button 
                        className={activeTab === 'active' ? 'dashboard-tab-active' : 'dashboard-tab'}
                        onClick={() => setActiveTab('active')}
                    >
                        Активные
                    </button>
                    <button 
                        className={activeTab === 'expired' ? 'dashboard-tab-active' : 'dashboard-tab'}
                        onClick={() => setActiveTab('expired')}
                    >
                        Истекшие
                    </button>
                </div>

                {/* Policy Cards */}
                <div className="card-container">
                    {filteredPolicies.map(policy => (
                        <div key={policy.id} className="policy-card">
                            <div className="card-top">
                                <div className="status-row">
                                    <span className={policy.status === 'active' ? 'status-active' : 'status-expired'}>
                                        {policy.status === 'active' ? 'АКТИВЕН' : 'ИСТЕК'}
                                    </span>
                                    <span className="type-badge">{policy.type}</span>
                                </div>
                                <h3 className="policy-title">{policy.policyNumber}</h3>
                                <p className="company-name">{policy.company}</p>
                            </div>
                            <div className="card-bottom">
                                <div className="info-row">
                                    <span className="info-label">Автомобиль:</span>
                                    <span className="info-value">{policy.carModel}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Номер:</span>
                                    <span className="info-value">{policy.carNumber}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Действителен до:</span>
                                    <span className={`info-value ${policy.status === 'active' ? 'active' : 'expired'}`}>
                                        {policy.validUntil}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPolicies.length === 0 && (
                    <div className="empty-state">
                        <p>Нет документов</p>
                    </div>
                )}
            </div>

            {/* Right Sidebar */}
            <div className="dashboard-right-sidebar">
                <div className="sidebar-section">
                    <h3 className="sidebar-title">Напоминания</h3>
                    <div className="reminder-box">
                        <div className="reminder-text">OSAGO истекает через 30 дней</div>
                        <div className="reminder-sub">Toyota Camry</div>
                    </div>
                </div>

                <div className="sidebar-section">
                    <h3 className="sidebar-title">Объявления</h3>
                    <p className="empty-text">Нет объявлений</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;