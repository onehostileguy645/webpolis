import { useState } from 'react';
import './style.css';

function SettingsPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'Алишер',
        lastName: 'Каримов',
        middleName: 'Рахимович',
        dateOfBirth: '1990-05-15',
        passportSeries: 'AA',
        passportNumber: '1234567',
        passportIssueDate: '2015-06-20',
        passportIssuedBy: 'ГУВД г. Ташкента',
        address: 'г. Ташкент, Мирзо-Улугбекский район, ул. Авиасозлар, д. 15, кв. 42',
        phone: '+998 90 123 45 67',
        email: 'alisher.karimov@example.com',
        pinfl: '12345678901234'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        alert('Данные успешно сохранены!');
        console.log('Saved data:', formData);
    };

    const handleCancel = () => {
        setIsEditing(false);
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
                    <a href="/dash/history" className="nav-item-inactive">История</a>
                    <a href="/dash/settings" className="nav-item">Настройки</a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="settings-container">
                <div className="settings-content">
                    <div className="settings-header">
                        <h1 className="settings-title">⚙️ Настройки профиля</h1>
                        {!isEditing && (
                            <button 
                                className="edit-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                ✏️ Редактировать
                            </button>
                        )}
                    </div>

                    <div className="settings-form">
                        {/* Личная информация */}
                        <div className="settings-section">
                            <h2 className="section-title">👤 Личная информация</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Фамилия</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-input"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Имя</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-input"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Отчество</label>
                                    <input
                                        type="text"
                                        name="middleName"
                                        className="form-input"
                                        value={formData.middleName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Дата рождения</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        className="form-input"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">ПИНФЛ</label>
                                    <input
                                        type="text"
                                        name="pinfl"
                                        className="form-input"
                                        value={formData.pinfl}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        maxLength={14}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Паспортные данные */}
                        <div className="settings-section">
                            <h2 className="section-title">📄 Паспортные данные</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Серия паспорта</label>
                                    <input
                                        type="text"
                                        name="passportSeries"
                                        className="form-input"
                                        value={formData.passportSeries}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        maxLength={2}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Номер паспорта</label>
                                    <input
                                        type="text"
                                        name="passportNumber"
                                        className="form-input"
                                        value={formData.passportNumber}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        maxLength={7}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Дата выдачи</label>
                                    <input
                                        type="date"
                                        name="passportIssueDate"
                                        className="form-input"
                                        value={formData.passportIssueDate}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Кем выдан</label>
                                    <input
                                        type="text"
                                        name="passportIssuedBy"
                                        className="form-input"
                                        value={formData.passportIssuedBy}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Адрес регистрации</label>
                                    <textarea
                                        name="address"
                                        className="form-textarea"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        rows={2}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Контактная информация */}
                        <div className="settings-section">
                            <h2 className="section-title">📞 Контактная информация</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Номер телефона</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-input"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-input"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="form-actions">
                                <button 
                                    className="save-btn"
                                    onClick={handleSave}
                                >
                                    ✓ Сохранить изменения
                                </button>
                                <button 
                                    className="cancel-btn"
                                    onClick={handleCancel}
                                >
                                    ✕ Отменить
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Информационный блок */}
                    <div className="info-box">
                        <div className="info-icon">ℹ️</div>
                        <div className="info-content">
                            <p className="info-title">Важная информация</p>
                            <p className="info-text">
                                Убедитесь, что все данные указаны верно. Информация должна соответствовать вашим документам.
                                Изменение паспортных данных требует верификации.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;