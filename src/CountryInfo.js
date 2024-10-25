import React from "react";
import "./scss/countryInfo.scss";

const CountryInfo = ({ country, onBack }) => {
  if (!country) return null;

  return (
    <div className="country-info-wrapper">
      {/* Back Button */}
      <div className="back-button">
        <button onClick={onBack}>
          <div className="backIcon">
            <svg width="20" height="20" viewBox="0 0 26 26" fill="none">
              <title>Back</title>
              <path
                d="M12.3766 1L1 12.9995L12.3766 25M25 12.9995H1.36"
                stroke="var(--very-dark-blue-text)"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <span>Back</span>
        </button>
      </div>

      {/* Country Details */}
      <div className="country-details">
        <div className="flag-and-details">
          {/* Left Section: Flag */}
          <div className="country-flag-section">
            <img
              className="country-flag"
              src={country?.flags?.svg}
              alt={`${country?.name || "Country"} flag`}
            />
          </div>

          {/* Right Section: Country Information */}
          <div className="country-info-section">
            <h2 className="country-name">{country?.name}</h2>

            <div className="country-sub-details">
              <div>
                <p>
                  <strong>Native Name:</strong> {country?.nativeName || "N/A"}
                </p>
                <p>
                  <strong>Population:</strong>{" "}
                  {country?.population?.toLocaleString() || "N/A"}
                </p>
                <p>
                  <strong>Region:</strong> {country?.region || "N/A"}
                </p>
                <p>
                  <strong>Sub Region:</strong> {country?.subregion || "N/A"}
                </p>
                <p>
                  <strong>Capital:</strong> {country?.capital || "N/A"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Top Level Domain:</strong>{" "}
                  {country?.topLevelDomain?.join(", ") || "N/A"}
                </p>
                <p>
                  <strong>Currencies:</strong>{" "}
                  {country?.currencies
                    ?.map((currency) => currency.name)
                    .join(", ") || "N/A"}
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {country?.languages?.map((lang) => lang.name).join(", ") ||
                    "N/A"}
                </p>
              </div>
            </div>

            {/* Border Countries */}
            <div className="border-countries">
              <p>
                <strong>Border Countries:</strong>
              </p>
              <div className="border-country-buttons">
                {country?.borders?.length > 0 ? (
                  country.borders.map((border, index) => (
                    <button key={index} className="border-button">
                      {border}
                    </button>
                  ))
                ) : (
                  <p>No border countries</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryInfo;
