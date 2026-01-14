import React from "react";
import './style.css'

function EndPage({ selectedCompany, insuranceType, formData }) {
  return (
    <div className="end-page-container">
      <div className="end-page-box">
        <div className="success-icon-wrapper">
          <svg
            className="success-svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="5"
            />
            <path
              d="M30 50 L45 65 L70 35"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="end-page-title">Заявка успешно отправлена!</h1>

        <p className="end-page-description">
          {formData?.resultMessage || "Ваша заявка на оформление полиса успешно обработана."}
        </p>

        {/* Contract Information */}
        {formData?.contractId && (
          <div className="selected-company-box">
            <h3>Информация о договоре:</h3>
            <div style={{ textAlign: "left", marginTop: "15px" }}>
              <p style={{ marginBottom: "10px" }}>
                <strong>Номер договора:</strong> {formData.contractId}
              </p>
              {formData.uuid && (
                <p style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>
                  <strong>UUID:</strong> {formData.uuid}
                </p>
              )}
              {formData.responseAmount && (
                <p style={{ marginBottom: "10px", fontSize: "18px", color: "#4CAF50" }}>
                  <strong>Сумма:</strong> {formData.responseAmount.toLocaleString()} сум
                </p>
              )}
            </div>
          </div>
        )}

        {/* Selected Company Info */}
        {selectedCompany && (
          <div className="selected-company-box" style={{ marginTop: "20px" }}>
            <h3>Выбранная компания:</h3>
            <p className="company-name-display">{selectedCompany.name}</p>
            {selectedCompany.price && (
              <p className="company-price-display">
                Стоимость: {selectedCompany.price}
              </p>
            )}
          </div>
        )}

        <div className="email-icon-wrapper">
          <svg className="email-svg" width="50" height="50" viewBox="0 0 50 50">
            <rect
              x="5"
              y="12"
              width="40"
              height="26"
              rx="3"
              fill="none"
              stroke="#333"
              strokeWidth="2"
            />
            <path
              d="M5 15 L25 28 L45 15"
              fill="none"
              stroke="#333"
              strokeWidth="2"
            />
          </svg>
          <p className="email-sent-text">
            Все документы и информация о вашем полисе были отправлены на вашу
            электронную почту.
          </p>
          <p className="email-hint-text">
            Пожалуйста, проверьте папку "Входящие" или "Спам"
          </p>
        </div>

        <div className="next-steps-box">
          <h3>Что дальше?</h3>
          <ul className="next-steps-list">
            <li>✓ Проверьте свою электронную почту</li>
            <li>✓ Сохраните полученные документы</li>
            <li>✓ Представитель компании свяжется с вами в ближайшее время</li>
          </ul>
        </div>

        <button
          type="button"
          onClick={() => (window.location.href = "/")}
          className="home-button"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
}

export default EndPage;