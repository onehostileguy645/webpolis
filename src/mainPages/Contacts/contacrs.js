import { useState } from 'react';
import './style.css'

function ContactsPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', phone: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="contacts-page-container">
            {/* Header */}
            <div className="contacts-header">
                <h1>Контакты</h1>
                <p>Мы всегда на связи и готовы помочь вам</p>
            </div>

            {/* Contact Info Cards */}
            <div className="contact-cards-grid">
                <div className="contact-card phone-card">
                    <div className="contact-card-icon">📞</div>
                    <h3>Телефон</h3>
                    <a href="tel:+998712005050">+998 71 200 50 50</a>
                    <a href="tel:+998901234567">+998 90 123 45 67</a>
                </div>

                <div className="contact-card email-card">
                    <div className="contact-card-icon">✉️</div>
                    <h3>Email</h3>
                    <a href="mailto:info@insurance.uz">info@insurance.uz</a>
                    <a href="mailto:support@insurance.uz">support@insurance.uz</a>
                </div>

                <div className="contact-card address-card">
                    <div className="contact-card-icon">📍</div>
                    <h3>Адрес</h3>
                    <p>
                        г. Ташкент, Мирабадский район,<br />
                        ул. Мустакиллик, 45
                    </p>
                </div>

                <div className="contact-card hours-card">
                    <div className="contact-card-icon">🕐</div>
                    <h3>Режим работы</h3>
                    <p>
                        Пн-Пт: 9:00 - 18:00<br />
                        Сб: 9:00 - 14:00<br />
                        Вс: Выходной
                    </p>
                </div>
            </div>

            {/* Contact Form and Map Section */}
            <div className="form-map-grid">
                {/* Contact Form */}
                <div className="contact-form-wrapper">
                    <h2>Напишите нам</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="contact-form-group">
                            <label className="contact-form-label">Имя *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="contact-form-input"
                            />
                        </div>

                        <div className="contact-form-group">
                            <label className="contact-form-label">Телефон *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="contact-form-input"
                            />
                        </div>

                        <div className="contact-form-group">
                            <label className="contact-form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="contact-form-input"
                            />
                        </div>

                        <div className="contact-form-group">
                            <label className="contact-form-label">Сообщение *</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="contact-form-textarea"
                            />
                        </div>

                        <button type="submit" className="contact-form-submit">
                            Отправить сообщение
                        </button>
                    </form>
                </div>
            </div>

            {/* Social Media */}
            <div className="social-media-section">
                <h2>Следите за нами в социальных сетях</h2>
                <div className="social-links-wrapper">
                    <a href="https://t.me/yourinsurance" className="social-link">
                        📱
                    </a>
                    <a href="https://instagram.com/yourinsurance" className="social-link">
                        📷
                    </a>
                    <a href="https://facebook.com/yourinsurance" className="social-link">
                        👍
                    </a>
                    <a href="https://youtube.com/yourinsurance" className="social-link">
                        ▶️
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ContactsPage;