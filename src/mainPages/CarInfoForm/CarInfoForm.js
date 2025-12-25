import axios from "axios";
import React, { useState } from "react";

function CarInfoForm({
  formData,
  setFormData,
  insuranceType,
  selectedCompany,
  setCurrentStep,
}) {
  const [formStep, setFormStep] = useState(1);

  const [vehicleInfoData, setVehicleInfoData] = useState({
    carBrand: "",
    color: "",
    owner: "",
    pinfl: "",
    idcard: "",
    year: "",
    type: "",
    bodyNumber: "",
    fullWeight: "",
    emptyWeight: "",
    engineNumber: "",
    enginePower: "",
    fuelType: "",
    seatsCount: "",
    standingPlaces: "",
    notes: "",
    issueDate: "",
    issuePlace: "",
  });

  const [userInfoData, setUserInfoData] = useState({
    owner: "",
    idcard: "",
    pinfl: "",
    number: "",
    gmail: "",
    birthDate: "",
    gender: "",
    address: "",
    passportIssueDate: "",
    passportIssuePlace: "",
  });

  const [drivers, setDrivers] = useState([]);
  const [currentDriver, setCurrentDriver] = useState({
    idcard: "",
    pinfl: "",
    name: "",
  });

  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [driverLoading, setDriverLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleUserInfoChange = (field, value) => {
    setUserInfoData({ ...userInfoData, [field]: value });
  };

  const handleAddDriver = async () => {
    if (drivers.length >= 5) {
      alert("Максимум 5 водителей");
      return;
    }
    if (!currentDriver.idcard || !currentDriver.pinfl) {
      alert("Пожалуйста, заполните ID и ПИНФЛ водителя");
      return;
    }

    setDriverLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/kafolat", {
        path: "/api/provider/driver-summary-v2",
        data: {
          transactionId: String(
            Math.floor(Math.random() * (9999999999999 - 1000000000000 + 1)) +
              1000000000000
          ),
          isConsent: "Y",
          senderPinfl: "00000000000000",
          document: currentDriver.idcard,
          pinfl: currentDriver.pinfl,
        },
      });

      console.log("Driver summary data:", response.data);

      if (response.data.result) {
        const result = response.data.result;
        const personInfo = result.DriverPersonInfo;
        const driverInfo = result.DriverInfo;

        const fullName = `${personInfo.lastNameLatin || ""} ${
          personInfo.firstNameLatin || ""
        } ${personInfo.middleNameLatin || ""}`.trim();

        const issueDateRaw = driverInfo.issueDate;
        const licenseIssueDate = issueDateRaw
          ? new Date(issueDateRaw).toISOString().split("T")[0]
          : "";

        setDrivers([
          ...drivers,
          {
            idcard: currentDriver.idcard,
            pinfl: currentDriver.pinfl,
            name: fullName,
            birthDate: personInfo.birthDate || "",
            issueDate: personInfo.datebegin || "",
            issuedBy: personInfo.docgiveplace || "",
            licenseSeria: driverInfo.licenseSeria || "",
            licenseNumber: driverInfo.licenseNumber || "",
            licenseIssueDate: licenseIssueDate,
          },
        ]);

        setCurrentDriver({ idcard: "", pinfl: "", name: "" });
        alert("Водитель успешно добавлен!");
      } else {
        alert("Данные водителя не найдены или ошибка API.");
      }
    } catch (error) {
      console.error("Error fetching driver summary:", error);
      alert("Ошибка при получении данных водителя. Проверьте ID и ПИНФЛ.");
    } finally {
      setDriverLoading(false);
    }
  };

  const handleRemoveDriver = (index) => {
    setDrivers(drivers.filter((_, i) => i !== index));
  };

  const prepareInsuranceData = () => {
    const techPassportSeria = formData.number.substring(0, 3);
    const techPassportNumber = formData.number.substring(3);

    const passportSeria = userInfoData.idcard.substring(0, 2);
    const passportNumber = userInfoData.idcard.substring(2);

    const [lastname, firstname, middlename] = userInfoData.owner.split(" ");

    const today = new Date();
    const startDate = today.toISOString().split("T")[0];
    const endDate = new Date(today.setFullYear(today.getFullYear() + 1))
      .toISOString()
      .split("T")[0];

    // Премия зависит от типа страхования
    const premiumAmount =
      formData.insuranceVariant === "Безгранично"
        ? 120000
        : selectedCompany
        ? parseInt(selectedCompany.price.replace(/[^\d]/g, ""))
        : 40000;

    return {
      applicant: {
        person: {
          passportData: {
            pinfl: userInfoData.pinfl,
            seria: passportSeria,
            number: passportNumber,
            issuedBy: userInfoData.passportIssuePlace || "MVD",
            issueDate: userInfoData.passportIssueDate || "2020-01-01",
          },
          fullName: {
            firstname: firstname || "",
            lastname: lastname || "",
            middlename: middlename || "",
          },
          phoneNumber: userInfoData.number
            .replace(/[^\d]/g, "")
            .replace(/^8/, "998"),
          gender: userInfoData.gender === "m" ? "0" : "f",
          birthDate: userInfoData.birthDate || "1990-01-01",
          regionId: "13",
          districtId: "1301",
        },
        address: userInfoData.address || "Tashkent",
        residentOfUzb: "1",
        citizenshipId: "210",
      },

      owner: {
        person: {
          passportData: {
            pinfl: userInfoData.pinfl,
            seria: passportSeria,
            number: passportNumber,
            issuedBy: userInfoData.passportIssuePlace || "MVD",
            issueDate: userInfoData.passportIssueDate || "2020-01-01",
          },
          fullName: {
            firstname: firstname || "",
            lastname: lastname || "",
            middlename: middlename || "",
          },
        },
        applicantIsOwner: true,
      },

      details: {
        issueDate: startDate,
        startDate: startDate,
        endDate: endDate,
        driverNumberRestriction: formData.insuranceVariant !== "Безгранично",
      },

      cost: {
        discountId: "1",
        discountSum: "0",
        insurancePremium: String(premiumAmount),
        sumInsured: "40000000",
        contractTermConclusionId: "1",
        useTerritoryId: "2",
        commission: "0",
        insurancePremiumPaidToInsurer: premiumAmount,
      },

      vehicle: {
        techPassport: {
          number: techPassportNumber,
          seria: techPassportSeria,
          issueDate:
            vehicleInfoData.issueDate &&
            /^\d{4}-\d{2}-\d{2}$/.test(vehicleInfoData.issueDate)
              ? vehicleInfoData.issueDate
              : new Date().toISOString().split("T")[0],
        },
        modelCustomName: vehicleInfoData.carBrand || "Unknown",
        engineNumber: vehicleInfoData.engineNumber || "000000",
        typeId: vehicleInfoData.type || "1",
        issueYear: String(vehicleInfoData.year || "2020"),
        govNumber: formData.plateNumber,
        bodyNumber: vehicleInfoData.bodyNumber || "000000",
        regionId: "13",
      },

      drivers:
        formData.insuranceVariant === "Безгранично"
          ? []
          : drivers.map((driver) => {
              const seria = driver.idcard.substring(0, 2);
              const number = driver.idcard.substring(2);
              const [dLast, dFirst, dMiddle] = driver.name.split(" ");

              return {
                passportData: {
                  pinfl: driver.pinfl,
                  seria,
                  number,
                  issueDate: driver.issueDate || "",
                  issuedBy: driver.issuedBy || "",
                },
                fullName: {
                  firstname: dFirst || "",
                  lastname: dLast || "",
                  middlename: dMiddle || "",
                },
                licenseNumber: driver.licenseNumber || "",
                licenseSeria: driver.licenseSeria || "",
                licenseIssueDate: driver.licenseIssueDate || "",
                birthDate: driver.birthDate || "",
                relative: "",
                residentOfUzb: "1",
              };
            }),
    };
  };

  const handleVehicleFetchData = async () => {
    if (!formData.plateNumber || !formData.number) {
      alert("Пожалуйста, заполните номер машины и номер тех-паспорта");
      return;
    }

    setVehicleLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/kafolat", {
        path: "/api/provider/osago/vehicle",
        data: {
          techPassportSeria: formData.number.substring(0, 3),
          techPassportNumber: formData.number.substring(3),
          govNumber: formData.plateNumber,
        },
      });

      console.log("Vehicle data:", response.data);

      if (response.data.result) {
        const result = response.data.result;

        const vehicleData = {
          carBrand: result.modelName || "",
          color: result.vehicleColor || "",
          owner: result.owner || "",
          pinfl: result.pinfl || "",
          year: result.issueYear || "",
          type: result.vehicleTypeId || "1",
          bodyNumber: result.bodyNumber || "",
          fullWeight: result.fullWeight || "",
          emptyWeight: result.emptyWeight || "",
          engineNumber: result.engineNumber || "",
          enginePower: result.horsePowers || "",
          fuelType: result.fuelType || "",
          seatsCount: result.seats || "",
          standingPlaces: result.stands || "",
          notes: result.comment || "",
          issueDate: result.techPassportIssueDate || "",
          issuePlace: result.division || "",
        };

        setVehicleInfoData(vehicleData);
        setUserInfoData({
          ...userInfoData,
          owner: result.owner || "",
          pinfl: result.pinfl || "",
          address: result.division || "",
        });

        setFormStep(2);
      } else {
        alert("Данные автомобиля не найдены. Проверьте введенные данные.");
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      alert(
        "Ошибка при получении данных. Проверьте номер машины и тех-паспорта."
      );
    } finally {
      setVehicleLoading(false);
    }
  };

  const handleUserFetchData = async () => {
    if (!userInfoData.idcard) {
      alert("Пожалуйста, введите ID владельца");
      return;
    }

    setUserLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/kafolat", {
        path: "/api/provider/pinfl-v2",
        data: {
          transactionId: String(
            Math.floor(Math.random() * (9999999999999 - 1000000000000 + 1)) +
              1000000000000
          ),
          isConsent: "Y",
          senderPinfl: "00000000000000",
          document: userInfoData.idcard,
          pinfl: userInfoData.pinfl,
        },
      });

      console.log("User data:", response.data);

      if (response.data.result) {
        const result = response.data.result;

        setUserInfoData({
          ...userInfoData,
          birthDate: result.birthDate || userInfoData.birthDate,
          gender: result.gender || userInfoData.gender,
          passportIssueDate:
            result.passportIssueDate || userInfoData.passportIssueDate,
          passportIssuePlace:
            result.passportIssuePlace || userInfoData.passportIssuePlace,
        });

        setFormStep(3);
      } else {
        alert("Данные пользователя не найдены. Проверьте ID владельца.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert(
        "Ошибка при получении данных пользователя. Проверьте ID владельца."
      );
    } finally {
      setUserLoading(false);
    }
  };

  const handleInsuranceVariantSelect = (variant) => {
    setFormData({ ...formData, insuranceVariant: variant });
    if (variant === "Безгранично") {
      setDrivers([]);
      setCurrentDriver({ idcard: "", pinfl: "", name: "" });
    }
  };

  const handleFinalSubmit = async () => {
    if (!userInfoData.number) {
      alert("Пожалуйста, введите номер телефона!");
      return;
    }

    if (
      formData.insuranceVariant === "Ограниченно для 5 водителей" &&
      drivers.length === 0
    ) {
      alert("Пожалуйста, добавьте хотя бы одного водителя!");
      return;
    }

    setSubmitLoading(true);

    try {
      const insuranceData = prepareInsuranceData();

      console.log("=== Submitting insurance data ===");
      console.log(JSON.stringify(insuranceData, null, 2));

      const response = await axios.post(
        "http://localhost:5000/api/insurance/submit",
        insuranceData
      );

      console.log("=== Response from server ===");
      console.log(response.data);

      if (response.data.success !== false) {
        setCurrentStep(3);
      } else {
        alert(
          `Ошибка: ${response.data.message || "Не удалось отправить заявку"}`
        );
      }
    } catch (error) {
      console.error("=== Error submitting insurance data ===");
      console.error("Message:", error.message);
      console.error("Response:", error.response?.data);

      const errorMessage =
        error.response?.data?.details?.message ||
        error.response?.data?.message ||
        error.message ||
        "Произошла ошибка при отправке заявки";

      alert(`Ошибка при отправке заявки: ${errorMessage}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="car-info-container">
      <h1 className="car-info-title">Информация о транспортном средстве</h1>
      <p className="car-info-subtitle">
        Тип страхования: <strong>{insuranceType}</strong>
      </p>

      <div className="form-white-box">
        {/* STEP 1: Tech Passport Info */}
        {formStep === 1 && (
          <>
            <div className="form-section">
              <h2 className="section-heading">Данные тех-паспорта</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Номер Машины</label>
                  <input
                    className="form-input"
                    placeholder="01A123BC"
                    value={formData.plateNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, plateNumber: e.target.value })
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Серия и Номер Тех-Паспорта
                  </label>
                  <input
                    className="form-input"
                    placeholder="ADF0000000"
                    value={formData.number}
                    onChange={(e) =>
                      setFormData({ ...formData, number: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="buttons-flex-center" style={{ marginTop: "20px" }}>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="back-button"
              >
                Назад
              </button>
              <button
                type="button"
                onClick={handleVehicleFetchData}
                disabled={vehicleLoading}
                className="submit-button"
              >
                {vehicleLoading ? "Загрузка..." : "Получить данные"}
              </button>
            </div>
          </>
        )}

        {/* STEP 2: ID Card Details */}
        {formStep === 2 && (
          <>
            <div className="form-section">
              <h2 className="section-heading">Информация о владельце</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">ID Владельца</label>
                  <input
                    className="form-input"
                    placeholder="AA0000000"
                    value={userInfoData.idcard}
                    onChange={(e) =>
                      handleUserInfoChange("idcard", e.target.value)
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">ПИНФЛ (автоматически)</label>
                  <input
                    className="form-input"
                    placeholder="12345678901234"
                    value={userInfoData.pinfl}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="buttons-flex-center" style={{ marginTop: "20px" }}>
              <button
                type="button"
                onClick={() => setFormStep(1)}
                className="back-button"
              >
                Назад
              </button>
              <button
                type="button"
                onClick={handleUserFetchData}
                disabled={userLoading}
                className="submit-button"
              >
                {userLoading ? "Загрузка..." : "Проверить данные"}
              </button>
            </div>
          </>
        )}

        {/* STEP 3: Insurance Variant Selection */}
        {formStep === 3 && (
          <>
            <div className="form-section">
              <h2
                className="section-heading"
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                Выберите вид страхования
              </h2>

              <div
                className="insurance-cards-wrapper"
                style={{ marginBottom: "30px" }}
              >
                <div
                  onClick={() => handleInsuranceVariantSelect("Безгранично")}
                  className={`insurance-card-selector ${
                    formData.insuranceVariant === "Безгранично"
                      ? "selected-osago"
                      : ""
                  }`}
                >
                  <h2>Безгранично</h2>
                  <p>Любое количество водителей может управлять автомобилем</p>
                </div>

                <div
                  onClick={() =>
                    handleInsuranceVariantSelect("Ограниченно для 5 водителей")
                  }
                  className={`insurance-card-selector ${
                    formData.insuranceVariant === "Ограниченно для 5 водителей"
                      ? "selected-kasko"
                      : ""
                  }`}
                >
                  <h2>5 или меньше водителей</h2>
                  <p>Ограниченное количество водителей (до 5 человек)</p>
                </div>
              </div>
            </div>

            {/* Driver Management Section */}
            {formData.insuranceVariant === "Ограниченно для 5 водителей" && (
              <div className="form-section">
                <h2 className="section-heading">Список водителей (до 5)</h2>

                {drivers.length > 0 && (
                  <div className="drivers-list-container">
                    {drivers.map((driver, index) => (
                      <div key={index} className="driver-card">
                        <div className="driver-info">
                          <div className="driver-name">
                            {driver.name || "Имя не найдено"}
                          </div>
                          <div className="driver-details">
                            ID: {driver.idcard} | ПИНФЛ: {driver.pinfl}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveDriver(index);
                          }}
                          className="remove-driver-btn"
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {drivers.length < 5 && (
                  <>
                    <div className="form-grid">
                      <div className="form-field">
                        <label className="form-label">ID водителя</label>
                        <input
                          className="form-input"
                          placeholder="AA0000000"
                          value={currentDriver.idcard}
                          onChange={(e) =>
                            setCurrentDriver({
                              ...currentDriver,
                              idcard: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label">ПИНФЛ водителя</label>
                        <input
                          className="form-input"
                          placeholder="12345678901234"
                          value={currentDriver.pinfl}
                          onChange={(e) =>
                            setCurrentDriver({
                              ...currentDriver,
                              pinfl: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="add-driver-btn-container">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddDriver();
                        }}
                        disabled={
                          driverLoading ||
                          !currentDriver.idcard ||
                          !currentDriver.pinfl
                        }
                        className="add-driver-btn"
                      >
                        {driverLoading
                          ? "Загрузка..."
                          : `+ Добавить водителя (${drivers.length}/5)`}
                      </button>
                    </div>
                  </>
                )}

                {drivers.length >= 5 && (
                  <div className="max-drivers-message">
                    Достигнут максимум водителей (5)
                  </div>
                )}
              </div>
            )}

            {/* Contact Info */}
            <div className="form-section">
              <h2 className="section-heading">Контактная информация</h2>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Номер Телефона *</label>
                  <input
                    className="form-input"
                    placeholder="+998 XX XXX XX XX"
                    value={userInfoData.number}
                    onChange={(e) =>
                      handleUserInfoChange("number", e.target.value)
                    }
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    Электронная Почта (необязательно)
                  </label>
                  <input
                    className="form-input"
                    placeholder="example@example.com"
                    value={userInfoData.gmail}
                    onChange={(e) =>
                      handleUserInfoChange("gmail", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="buttons-flex-center">
              <button
                type="button"
                onClick={() => setFormStep(2)}
                className="back-button"
              >
                Назад
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleFinalSubmit();
                }}
                disabled={submitLoading}
                className="submit-button"
              >
                {submitLoading ? "Отправка..." : "Отправить заявку"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CarInfoForm;