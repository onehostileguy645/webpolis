import "./style.css"


function InfoPage() {
    const goToAboutPage = () => {
        window.location.href = '/calc';
    };
    
    return (
        <div className="landing-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Онлайн Заявка</h1>
                    <h4 className="hero-subtitle">Создайте заявку на ОСАГО за 5 минут</h4>
                    <button onClick={goToAboutPage} className="hero-button">
                        Подробнее
                    </button>
                </div>
                <img 
                    src="osago_kasko.png" 
                    className="hero-image"
                    alt="Insurance App"
                />
            </div>
            
            <HowItWorks />
            <InsuranceTypes />
            <Partners />
        </div>
    )
}

function HowItWorks() {
    return (
        <div className="how-it-works">
            <hr className="divider" />
            <div className="steps-grid">
                <div className="step-item">
                    <img src="frame.png" className="step-icon" alt="Step 1" />
                    <label className="step-label">Выберите тип страховки</label>
                </div>
                <div className="step-item">
                    <img src="frame.png" className="step-icon" alt="Step 2" />
                    <label className="step-label">Выберите компанию</label>
                </div>
                <div className="step-item">
                    <img src="frame.png" className="step-icon" alt="Step 3" />
                    <label className="step-label">Введите все данные и Отправьте заявку</label>
                </div>
                <div className="step-item">
                    <img src="frame.png" className="step-icon" alt="Step 4" />
                    <label className="step-label">Через несколько минут с вами свяжутся наши сотрудники</label>
                </div>
            </div>
        </div>
    )
}

function InsuranceTypes() {
    return (
        <div className="insurance-section">
            <h2 className="section-title">Виды страхования</h2>
            <div className="insurance-grid">
                <div className="insurance-card osago">
                    <div className="card-emoji">🚗</div>
                    <h3 className="card-title">ОСАГО</h3>
                    <p className="card-description">
                        Обязательное страхование автогражданской ответственности
                    </p>
                    <ul className="card-list">
                        <li>✓ Обязательно для всех владельцев</li>
                        <li>✓ Покрывает ущерб третьим лицам</li>
                        <li>✓ Фиксированные тарифы</li>
                        <li>✓ Быстрое оформление</li>
                    </ul>
                </div>
                <div className="insurance-card kasko">
                    <div className="card-emoji">🛡️</div>
                    <h3 className="card-title">КАСКО</h3>
                    <p className="card-description">
                        Добровольное страхование вашего автомобиля
                    </p>
                    <ul className="card-list">
                        <li>✓ Защита вашего автомобиля</li>
                        <li>✓ Покрытие угона и повреждений</li>
                        <li>✓ Индивидуальные условия</li>
                        <li>✓ Расширенная защита</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

function Partners() {
    const partners = [
        { name: "Узбекистон", color: "#0066CC" },
        { name: "Apex Insurance", color: "#FF6B00" },
        { name: "Kapital Sug'urta", color: "#2E7D32" },
        { name: "Gross Insurance", color: "#C41E3A" },
        { name: "O'zbekinvest", color: "#1976D2" },
        { name: "Alfa Insurance", color: "#D32F2F" }
    ];

    return (
        <div className="partners-section">
            <h2 className="section-title">Наши партнеры</h2>
            <p className="partners-description">
                Работаем с ведущими страховыми компаниями Узбекистана
            </p>
            <div className="partners-grid">
                {partners.map((partner, index) => (
                    <div 
                        key={index} 
                        className="partner-card"
                        style={{ borderColor: partner.color }}
                    >
                        <div 
                            className="partner-icon"
                            style={{ backgroundColor: partner.color }}
                        >
                            {partner.name.charAt(0)}
                        </div>
                        <span className="partner-name">{partner.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InfoPage