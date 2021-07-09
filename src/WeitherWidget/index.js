import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import _ from 'lodash';
import { API_KEY, BASE_API_URL } from "./config";

import WidgetHeader from './components/WidgetHeader';
import WidgetBottomCard from './components/WidgetBottomCard';
import CityNotFound from './components/CityNotFound';
import SearchBox from './components/SearchBox';

const WeatherWidget = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState([]);
    const [unit, setUnit] = useState("metric");
    const [loader, setLoader] = useState(false);
    const [errorLoocation, setErrorLocation] = useState(false);
    const [searchValue, setSearchValue] = useState(null);

    const[currentgeoLoocation, setCurrentgeoLoocation] = useState([]);

    // Update the unit by clicking on the switch
    const updateUnit = (selectedUnit) => {
        setUnit(selectedUnit);
        getData(selectedUnit, null, searchValue);
    };

    // Universal function to fetch data from API
    const getData = (unitValue, currentLoocation = null, search = null) => {
        setErrorLocation(false);
        let url;

        // If search value available
        if (search !== null && search.trim() !== "") {

            url = `${BASE_API_URL}?units=${unitValue}&APPID=${API_KEY}&q=${search}`;


        }// If current Lati. & Longi is available 
        else if (currentLoocation !== null) {

            url = `${BASE_API_URL}?units=${unitValue}&lat=${currentLoocation.latitude}&lon=${currentLoocation.longitude}&APPID=${API_KEY}`;
        } // In case of initial render both of them are unidentified then it goes for location and comes back 
        else {
            getMyCurrentLocation(unitValue);
            return;
        }

        setLoader(true);
        var config = {
            method: 'get',
            url: url, // Dynamic URL generation 
        };
        axios(config)
            .then((response) => {
                // As we get data from API in 3 hours but the requirement is to show 1 data for each day, Filter applied
                const forecasts = response.data.list.filter((_, index) => index % 8 === 0);
                setWeatherData(forecasts);
                setCity(response.data.city);
                setLoader(false);
            })
            .catch((error) => {
                setLoader(false);
                setErrorLocation(true);
            });
    }


    // This will ask the user to allow location and set this to state
    const getMyCurrentLocation = (unitValue) => {
        setLoader(true);

        if(currentgeoLoocation.length === 0){
            navigator?.geolocation?.getCurrentPosition((c) => {
                let currentLoocation = {
                    longitude: c.coords.longitude,
                    latitude: c.coords.latitude
                };
                setCurrentgeoLoocation(currentLoocation);
                getData(unitValue, currentLoocation, null);
            },
            function errorCallback(error) {
                if (error.code == error.PERMISSION_DENIED) {
                    // pop up dialog asking for location
                    setErrorLocation(true);
               
                 
                }
            });
        }else{
            getData(unitValue, currentgeoLoocation, null);
        }
        


    }

    // Ask location and show the weather of the current location initially.
    useEffect(() => {
        getMyCurrentLocation(unit);
    }, []) // We need it to be run only in the initial rendering 


    // Search Functionality for every City
    // A debounce function is applied that follow 500ms timeline
    var search = _.debounce(function (search) {
        if (search !== null && search.trim !== "" && (search || search.length !== 0)) {
            setSearchValue(search)
            getData(unit, null, search);
        } else {
            setSearchValue(null);
            getMyCurrentLocation(unit);
        }
    }, 500);

    return (
        <Container className="mt-5">
            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <SearchBox search={search} />
                </Col>
                <Col md={1}></Col>
                {errorLoocation ? <CityNotFound /> : (
                    <React.Fragment>
                        <Col md={1}></Col>
                        <Col md={10}>
                            {loader ? <div className="spinner-wrapper"><Spinner animation="border" /></div> : (
                                <Card className="weather-card">
                                    <WidgetHeader
                                        weather={weatherData[0]}
                                        city={city}
                                        updateUnit={updateUnit}
                                        unit={unit}
                                    />
                                    <Card.Body>
                                        <Row>
                                            {weatherData?.length > 0 && (
                                                weatherData.map((data, index) => (
                                                    <WidgetBottomCard weather={data} key={'weather_' + index} unit={unit} />
                                                ))
                                            )}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                        <Col md={1}></Col>
                    </React.Fragment>)}
            </Row>
        </Container>
    );
}
export default WeatherWidget;
