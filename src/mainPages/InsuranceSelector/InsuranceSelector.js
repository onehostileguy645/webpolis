import React, { useState } from "react";

export function InsuranceTypeSelector({ setSelectedInsuranceType, setCurrentStep }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (type) => {
    setSelected(type);
  };

  const handleNext = () => {
    if (selected) {
      setSelectedInsuranceType(selected);
      setCurrentStep(2);
    }
  };

  return (
    <div className="insurance-type-container">
      <h1 className="insurance-type-title">Выберите тип страхования</h1>

      <div className="insurance-cards-wrapper">
        <div
          onClick={() => handleSelect("ОСАГО")}
          className={`insurance-card-selector ${
            selected === "ОСАГО" ? "selected-osago" : ""
          }`}
        >
          <h2>ОСАГО</h2>
          <p>
            Обязательное страхование автогражданской ответственности владельцев
            транспортных средств
          </p>
        </div>

        <div
          onClick={() => handleSelect("КАСКО")}
          className={`insurance-card-selector ${
            selected === "КАСКО" ? "selected-kasko" : ""
          }`}
        >
          <h2>КАСКО</h2>
          <p>
            Добровольное страхование транспортных средств от ущерба, хищения и
            других рисков
          </p>
        </div>
      </div>

      <div className="button-container-center">
        <button
          type="button"
          onClick={handleNext}
          disabled={!selected}
          className="continue-button"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}

// export function CompanySelector({
//   insuranceType,
//   setSelectedCompany,
//   setCurrentStep,
// }) {
//   const [selected, setSelected] = useState({ name: "Кафолат Суғурта" });

//   const companies = [
//     { name: "Кафолат Суғурта", rating: 4.6, price: "40,000 сум" },
//     {
//       name: "Узбекистон Темир Йуллари Суғурта",
//       rating: 4.5,
//       price: "50,000 сум",
//     },
//     { name: "Капитал Суғурта", rating: 4.8, price: "55,000 сум" },
//     { name: "Узбекистон Республика Суғурта", rating: 4.3, price: "60,000 сум" },
//   ];

//   const handleNext = () => {
//     if (selected) {
//       setSelectedCompany(selected);
//       setCurrentStep(4);
//     }
//   };

//   return (
//     <div className="company-selector-container">
//       <h1 className="company-selector-title">Выберите страховую компанию</h1>
//       <p className="company-selector-subtitle">
//         Тип страхования: <strong>{insuranceType}</strong>
//       </p>

//       <div className="company-cards-grid">
//         {companies.map((company, index) => (
//           <div
//             key={index}
//             onClick={() => setSelected(company)}
//             className={`company-card-item ${
//               selected?.name === company.name ? "selected" : ""
//             }`}
//           >
//             <div className="company-card-content">
//               <div className="company-info">
//                 <h3>{company.name}</h3>
//                 <p>Рейтинг: {company.rating} ⭐</p>
//               </div>
//               <div className="company-price">
//                 <p>{company.price}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="buttons-flex-center">
//         <button
//           type="button"
//           onClick={() => setCurrentStep(4)}
//           className="back-button"
//         >
//           Назад
//         </button>
//         <button
//           type="button"
//           onClick={handleNext}
//           disabled={!selected}
//           className="continue-button"
//         >
//           Продолжить
//         </button>
//       </div>
//     </div>
//   );
// }