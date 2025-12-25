import React, { useState } from "react";
import EndPage from "./EngPage/EngPage.js";
import CarInfoForm from "./CarInfoForm/CarInfoForm.js";
import { InsuranceTypeSelector, CompanySelector } from "./InsuranceSelector/InsuranceSelector.js";

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
          selectedCompany={selectedCompany}
          setCurrentStep={setCurrentStep}
        />
      )}

      {currentStep === 3 && (
        <CompanySelector
          insuranceType={selectedInsuranceType}
          setSelectedCompany={setSelectedCompany}
          setCurrentStep={setCurrentStep}
        />
      )}

      {currentStep === 4 && (
        <EndPage
          selectedCompany={selectedCompany}
          insuranceType={selectedInsuranceType}
        />
      )}
    </div>
  );
}

export default CalcPage;