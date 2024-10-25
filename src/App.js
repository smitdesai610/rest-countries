import { useState } from "react";
import "../src/scss/App.scss";
import DarkModeIcon from "./shared/night-mode.png";
import SunIcon from "./shared/light-mode.png";
import SearchIcon from "./shared/searchIcon.svg";
import Data from "./data.json";
import CountryInfo from "./CountryInfo";

function CountryFinder() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = Data.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRegion === "" || country.region === selectedRegion)
  );

  const regionCountryCount = Data.reduce((acc, country) => {
    acc[country.region] = (acc[country.region] || 0) + 1;
    return acc;
  }, {});

  const handleCountryClick = (country) => {
    setSelectedCountry(country); // Show country details on click
  };

  const handleBackClick = () => {
    setSelectedCountry(null); // Go back to country list
  };

  const regions = Object.keys(regionCountryCount);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "wrapper dark-mode" : "wrapper light-mode"}>
      <header className="header">
        <div className="title">Where in the world?</div>
        <div className="modeChange" onClick={toggleTheme}>
          <div className="modeIcon">
            <img
              src={isDarkMode ? SunIcon : DarkModeIcon}
              alt={isDarkMode ? "light mode" : "dark mode"}
            />
          </div>
          <div className="modeText">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </div>
        </div>
      </header>

      <main>
        {selectedCountry ? (
          <CountryInfo country={selectedCountry} onBack={handleBackClick} />
        ) : (
          <>
            <div className="searchFilter">
              <div className="searchBar">
                <img
                  className="searchIcon"
                  src={SearchIcon}
                  alt="search icon"
                />
                <input
                  type="text"
                  placeholder="Search for a country..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-container">
                <select
                  className="filter-dropdown"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="">
                    Filter by Region
                    <svg
                      height="48"
                      viewBox="0 0 48 48"
                      width="48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z" />
                      <path
                        d="M0-.75h48v48h-48z"
                        fill="none"
                        stroke="var(--very-dark-blue-text);
                      }"
                      />
                    </svg>
                  </option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region} ({regionCountryCount[region]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="countryList">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <div
                    className="countryItems"
                    key={index}
                    onClick={() => handleCountryClick(country)}
                  >
                    <div className="countryFlagWrapper">
                      <img
                        className="country-flag"
                        src={country.flags.svg}
                        alt={`${country.name} flag`}
                      />
                    </div>
                    <div className="countrySubInfo">
                      <div className="countryName">{country.name}</div>
                      <div className="population">
                        Population: {country.population.toLocaleString()}
                      </div>
                      <div className="region">Region: {country.region}</div>
                      <div className="capital">Capital: {country.capital}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data">Data not found</div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function App() {
  return <CountryFinder />;
}

export default App;
