import React, { useState } from "react";
import EndPage from "./EngPage/EngPage.js";
import CarInfoForm from "./CarInfoForm/CarInfoForm.js";
import { InsuranceTypeSelector } from "./InsuranceSelector/InsuranceSelector.js";

function CalcPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInsuranceType, setSelectedInsuranceType] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    plateNumber: "",
    number: "",
    idcard: "",
    insuranceVariant: "Безгранично",
  });

  return (
    <div className="calc-page-container">
      {currentStep === 1 && (
        <InsuranceTypeSelector
          setSelectedInsuranceType={setSelectedInsuranceType}
          setCurrentStep={setCurrentStep}
        />
      )}

      {currentStep === 2 && (
        <CarInfoForm
          formData={formData}
          setFormData={setFormData}
          insuranceType={selectedInsuranceType}
          setCurrentStep={setCurrentStep}
          setSelectedCompany={setSelectedCompany}
        />
      )}

      {currentStep === 3 && (
        <EndPage
          selectedCompany={selectedCompany}
          insuranceType={selectedInsuranceType}
        />
      )}
    </div>
  );
}

export default CalcPage;