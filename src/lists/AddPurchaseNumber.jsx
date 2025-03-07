import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import AddCard from "./AddCard";
import Cards from "./Cards";
import {
  GetCountries,
  GetState,
  GetCity,
} from "react-country-state-city";

const AddPurchaseNumber = () => {
  const [localAreaCodeFilter, setLocalAreaCodeFilter] = useState("");
  const [localCityFilter, setLocalCityFilter] = useState("");
  const [tollFreeAreaCodeFilter, setTollFreeAreaCodeFilter] = useState("");
  const [tollFreeCityFilter, setTollFreeCityFilter] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [selectedState, setSelectedState] = useState(0);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(0);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      GetState(selectedCountry).then((result) => {
        setStateList(result);
        setCityList([]); // Clear cities when country changes
      });

      const fetchNumbers = async () => {
        try {
          const response = await fetch(`api/fetchnumber${selectedCountry}`);
          const data = await response.json();
          setNumbers(data.numbers);
        } catch (error) {
          console.error("Error fetching numbers:", error);
        }
      };
      fetchNumbers();
    } else {
      setStateList([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      GetCity(selectedCountry, selectedState).then((result) => {
        setCityList(result);
      });
    }
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (e) => {
    const country = countriesList[e.target.value];
    setSelectedCountry(country.id);
    setSelectedState(0);
    setSelectedCity(0);
  };

  const handleStateChange = (e) => {
    const state = stateList[e.target.value];
    setSelectedState(state.id);
    setSelectedCity(0);
  };

  const handleCityChange = (e) => {
    const city = cityList[e.target.value];
    setSelectedCity(city.id);
  };

  const [activeTab, setActiveTab] = useState("local");

  const Filters = ({
    areaCodeFilter,
    setAreaCodeFilter,
    cityFilter,
    setCityFilter,
  }) => {
    return (
      <div className="custom-select-container">
        <div className="select-container">
          <Form.Select
            className="custom-select"
            value={selectedCountry}
            onChange={(e)=>{
              handleCountryChange(e);
              // handleChange(e)
            }}
            name="country"
            
          >
            <option value={0}>Select Country</option>
            {countriesList.map((country, index) => (
              <option key={country.isoCode} value={index}>
                {country.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="select-container">
          <Form.Select
            className="custom-select"
            value={selectedState}
            onChange={handleStateChange}
            disabled={stateList.length === 0}
          >
            <option value={0}>Select State</option>
            {stateList.map((state, index) => (
              <option key={state.id} value={index}>
                {state.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="select-container">
          <Form.Select
            className="custom-select"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={cityList.length === 0}
          >
            <option value={0}>Select City</option>
            {cityList.map((city, index) => (
              <option key={city.id} value={index}>
                {city.name}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
    );
  };

  return (
    <>
     <main id="main" className="main">
        <section>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"></h5>
              <ul
                className="nav nav-tabs nav-tabs-bordered d-flex"
                id="borderedTabJustified"
                role="tablist"
              >
                <li className="nav-item flex-fill" role="presentation">
                  <button
                    className={`nav-link w-50 ${
                      activeTab === "local" ? "active" : ""
                    }`}
                    id="campaign-tab"
                    onClick={() => setActiveTab("local")}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "local"}
                  >
                    Local
                  </button>
                </li>
                <li className="nav-item flex-fill" role="presentation">
                  <button
                    className={`nav-link w-50 ${
                      activeTab === "tollfree" ? "active" : ""
                    }`}
                    id="publisher-tab"
                    onClick={() => setActiveTab("tollfree")}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "tollfree"}
                  >
                    Toll Free
                  </button>
                </li>
              </ul>
              <div
                className="tab-content pt-2"
                id="borderedTabJustifiedContent"
              >
                <div
                  className={`tab-pane fade ${
                    activeTab === "local" ? "show active" : ""
                  }`}
                  id="bordered-justified-campaign"
                  role="tabpanel"
                  aria-selected={activeTab === "local"}
                >
                  {activeTab === "local" && (
                    <div className="card" style={{ boxShadow: "none" }}>
                      <div className="card-body" style={{ padding: "0" }}>
                        <Filters
                          areaCodeFilter={localAreaCodeFilter}
                          setAreaCodeFilter={setLocalAreaCodeFilter}
                          cityFilter={localCityFilter}
                          setCityFilter={setLocalCityFilter}
                        />
                        <Cards isLocal={true} />
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "tollfree" ? "show active" : ""
                  }`}
                  id="bordered-justified-publisher"
                  role="tabpanel"
                  aria-selected={activeTab === "tollfree"}
                >
                  {activeTab === "tollfree" && (
                    <div className="card" style={{ boxShadow: "none" }}>
                      <div className="card-body" style={{ padding: "0" }}>
                        <Filters
                          areaCodeFilter={tollFreeAreaCodeFilter}
                          setAreaCodeFilter={setTollFreeAreaCodeFilter}
                          cityFilter={tollFreeCityFilter}
                          setCityFilter={setTollFreeCityFilter}
                        />
                        <Cards isLocal={false} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AddPurchaseNumber;
