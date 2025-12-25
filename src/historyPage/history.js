// HistoryPage.js
import { useState } from 'react';
import './style.css';

function HistoryPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    
    const historyItems = [
        {
            id: 1,
            type: 'policy_created',
            title: 'Создан полис OSAGO',
            description: '202502-OSG1020-001 для Toyota Camry',
            date: '2025-01-15',
            time: '14:30',
            amount: 850000,
            status: 'completed'
        },
        {
            id: 2,
            type: 'payment',
            title: 'Оплата полиса',
            description: 'Оплата через Click',
            date: '2025-01-15',
            time: '14:35',
            amount: 850000,
            status: 'completed'
        },
        {
            id: 3,
            type: 'policy_created',
            title: 'Создан полис KASKO',
            description: '202502-KSK1011-001 для BMW X5',
            date: '2024-12-10',
            time: '10:15',
            amount: 2500000,
            status: 'completed'
        },
        {
            id: 4,
            type: 'payment',
            title: 'Оплата полиса',
            description: 'Оплата через Payme',
            date: '2024-12-10',
            time: '10:20',
            amount: 2500000,
            status: 'completed'
        },
        {
            id: 5,
            type: 'policy_updated',
            title: 'Обновлен полис',
            description: 'Добавлен дополнительный водитель',
            date: '2024-11-25',
            time: '16:45',
            amount: 0,
            status: 'completed'
        },
        {
            id: 6,
            type: 'policy_created',
            title: 'Создан полис OSAGO',
            description: '202501-OSG1021-003 для Chevrolet Lacetti',
            date: '2024-11-20',
            time: '11:30',
            amount: 750000,
            status: 'completed'
        },
        {
            id: 7,
            type: 'payment',
            title: 'Возврат средств',
            description: 'Отмена полиса 202412-OSG1021-002',
            date: '2024-11-15',
            time: '09:20',
            amount: 650000,
            status: 'refunded'
        }
    ];

    const filteredHistory = activeFilter === 'all' 
        ? historyItems 
        : historyItems.filter(item => item.type === activeFilter);

    const getIcon = (type) => {
        switch(type) {
            case 'policy_created': return '📄';
            case 'payment': return '💳';
            case 'policy_updated': return '✏️';
            default: return '📌';
        }
    };

    const getTypeLabel = (type) => {
        switch(type) {
            case 'policy_created': return 'Создание полиса';
            case 'payment': return 'Оплата';
            case 'policy_updated': return 'Обновление';
            default: return 'Действие';
        }
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
                    <a href="/dash/affliate" className="nav-item-inactive">Партнерская программа</a>
                    <a href="/dash/history" className="nav-item">История</a>
                    <a href="#" className="nav-item-inactive">Настройки</a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="dashboard-main-content">
                <h1 className="dashboard-title">История</h1>

                {/* Filter Buttons */}
                <div className="history-filters">
                    <button 
                        className={activeFilter === 'all' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setActiveFilter('all')}
                    >
                        Все
                    </button>
                    <button 
                        className={activeFilter === 'policy_created' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setActiveFilter('policy_created')}
                    >
                        Полисы
                    </button>
                    <button 
                        className={activeFilter === 'payment' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setActiveFilter('payment')}
                    >
                        Платежи
                    </button>
                    <button 
                        className={activeFilter === 'policy_updated' ? 'filter-btn active' : 'filter-btn'}
                        onClick={() => setActiveFilter('policy_updated')}
                    >
                        Обновления
                    </button>
                </div>

                {/* History Timeline */}
                <div className="history-timeline">
                    {filteredHistory.map((item, index) => (
                        <div key={item.id} className="timeline-item">
                            <div className="timeline-marker">
                                <div className="timeline-icon">{getIcon(item.type)}</div>
                                {index !== filteredHistory.length - 1 && <div className="timeline-line"></div>}
                            </div>
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <div>
                                        <h3 className="timeline-title">{item.title}</h3>
                                        <p className="timeline-description">{item.description}</p>
                                    </div>
                                    <div className="timeline-meta">
                                        <span className="timeline-date">{item.date}</span>
                                        <span className="timeline-time">{item.time}</span>
                                    </div>
                                </div>
                                <div className="timeline-footer">
                                    <span className={`timeline-badge ${item.type}`}>
                                        {getTypeLabel(item.type)}
                                    </span>
                                    {item.amount > 0 && (
                                        <span className={`timeline-amount ${item.status === 'refunded' ? 'refund' : ''}`}>
                                            {item.status === 'refunded' ? '+' : '-'}{item.amount.toLocaleString()} сум
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredHistory.length === 0 && (
                    <div className="empty-state">
                        <p>История пуста</p>
                    </div>
                )}
            </div>

            {/* Right Sidebar */}
            <div className="dashboard-right-sidebar">
                <div className="sidebar-section">
                    <h3 className="sidebar-title">Статистика</h3>
                    <div className="stats-box">
                        <div className="stats-item">
                            <span className="stats-label">Всего операций</span>
                            <span className="stats-value">{historyItems.length}</span>
                        </div>
                        <div className="stats-item">
                            <span className="stats-label">Этот месяц</span>
                            <span className="stats-value">2</span>
                        </div>
                    </div>
                </div>

                <div className="sidebar-section">
                    <h3 className="sidebar-title">Фильтры</h3>
                    <div className="date-filter">
                        <label className="filter-label">Период</label>
                        <select className="filter-select">
                            <option>Все время</option>
                            <option>Этот месяц</option>
                            <option>Последние 3 месяца</option>
                            <option>Последний год</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistoryPage;