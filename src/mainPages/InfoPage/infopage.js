import { useNavigate } from "react-router-dom";
import "./style.css";

function InfoPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <HeroSection navigate={navigate} />
            <HowItWorks />
            <InsuranceTypes navigate={navigate} />
            <Partners />
        </div>
    );
}

/* ═══════════════════════════════════════
HERO SECTION
═══════════════════════════════════════ */
function HeroSection({ navigate }) {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <span className="hero-badge">⚡ Быстро и удобно</span>
                <h1 className="hero-title">Онлайн Заявка<br />на Страховку</h1>
                <p className="hero-subtitle">
                    Создайте заявку на ОСАГО за 5 минут. Сравните предложения
                    ведущих страховых компаний Узбекистана и выберите лучшее.
                </p>
                <div className="hero-actions">
                    <button onClick={() => navigate("/calc")} className="hero-btn-primary">
                        Оформить заявку →
                    </button>
                    <button onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" })} className="hero-btn-outline">
                        Как это работает
                    </button>
                </div>
                <div className="hero-stats">
                    <div className="hero-stat">
                        <strong>5 мин</strong>
                        <span>на оформление</span>
                    </div>
                    <div className="hero-stat-divider" />
                    <div className="hero-stat">
                        <strong>6+</strong>
                        <span>партнёров</span>
                    </div>
                    <div className="hero-stat-divider" />
                    <div className="hero-stat">
                        <strong>100%</strong>
                        <span>онлайн</span>
                    </div>
                </div>
            </div>
            <div className="hero-image-wrap">
                <img src="2.png" className="hero-image" alt="Insurance App" />
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════
HOW IT WORKS
═══════════════════════════════════════ */
const steps = [
    {
        number: "01",
        icon: "🛡️",
        title: "Выберите тип",
        desc: "ОСАГО или КАСКО — выберите нужный вид страхования",
    },
    {
        number: "02",
        icon: "🏢",
        title: "Выберите компанию",
        desc: "Сравните предложения партнёров и выберите лучшее",
    },
    {
        number: "03",
        icon: "📋",
        title: "Заполните данные",
        desc: "Введите данные об автомобиле и владельце",
    },
    {
        number: "04",
        icon: "📞",
        title: "Ждите звонка",
        desc: "Наш сотрудник свяжется с вами в течение нескольких минут",
    },
];

function HowItWorks() {
    return (
        <section className="hiw-section" id="how-it-works">
            <div className="section-header">
                <span className="section-badge">Процесс</span>
                <h2 className="section-title">Как это работает?</h2>
                <p className="section-sub">Получить страховку онлайн — проще, чем вы думаете</p>
            </div>
            <div className="hiw-grid">
                {steps.map((step, i) => (
                    <div className="hiw-card" key={i}>
                        <div className="hiw-number">{step.number}</div>
                        <div className="hiw-icon">{step.icon}</div>
                        <h3 className="hiw-title">{step.title}</h3>
                        <p className="hiw-desc">{step.desc}</p>
                        {i < steps.length - 1 && <div className="hiw-arrow">→</div>}
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════
INSURANCE TYPES
═══════════════════════════════════════ */
function InsuranceTypes({ navigate }) {
    return (
        <section class="services-section" id="services">
            <div class="services-inner">

                <div>
                    <h2 class="section-title">Our Insurance Services</h2>

                    <div class="service-cards">

                        <div class="service-card" id="auto-home">
                            <div class="card-icon">🏠</div>
                            <h3>Auto & Home</h3>
                            <p>Find great rates on auto and home insurance from top-rated companies tailored to your needs and budget.</p>
                            <a href="#quote" class="btn-green" >Get a Quote</a>
                        </div>

                        <div class="service-card" id="health">
                            <div class="card-icon">🩺</div>
                            <h3>Health Insurance</h3>
                            <p>Get the best health coverage options tailored to your needs from leading providers you can trust.</p>
                            <a href="#quote" class="btn-green">Get a Quote</a>
                        </div>

                        <div class="service-card" id="travel">
                            <div class="card-icon">✈️</div>
                            <h3>Travel Insurance</h3>
                            <p>Secure travel insurance from leading providers, ensuring you are covered wherever your journey takes you.</p>
                            <a href="#quote" class="btn-green">Get a Quote</a>
                        </div>

                    </div>
                </div>

                <div class="contact-panel">
                    <h3>Contact Us Today</h3>
                    <div class="phone">123-456-7890</div>
                    <p>Our licensed agents are standing by to help you find the right coverage at the right price.</p>
                    <a href="tel:1234567890" class="btn-blue">Call Now</a>
                </div>

            </div>
        </section>
    );
}

/* ═══════════════════════════════════════
PARTNERS
═══════════════════════════════════════ */
const partners = [
    { name: "Узбекинвест", short: "УИ", color: "#0066CC" },
    { name: "Apex Insurance", short: "AP", color: "#FF6B00" },
    { name: "Kapital Sug'urta", short: "KS", color: "#2E7D32" },
    { name: "Gross Insurance", short: "GI", color: "#C41E3A" },
    { name: "O'zbekinvest", short: "OI", color: "#1976D2" },
    { name: "Alfa Insurance", short: "AL", color: "#D32F2F" },
];

function Partners() {
    return (
        <section className="partners-section">
            <div className="section-header">
                <span className="section-badge">Партнёры</span>
                <h2 className="section-title">Наши партнёры</h2>
                <p className="section-sub">
                    Работаем с ведущими страховыми компаниями Узбекистана
                </p>
            </div>
            <div className="partners-grid">
                {partners.map((p, i) => (
                    <div key={i} className="partner-card" style={{ "--p-color": p.color }}>
                        <div className="partner-avatar" style={{ background: p.color }}>
                            {p.short}
                        </div>
                        <span className="partner-name">{p.name}</span>
                        <span className="partner-tag">Партнёр</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default InfoPage;