import React from 'react';
import { Col } from 'react-bootstrap';
import moment from 'moment';
import { BASE_IMG_URL } from "../config";


const WidgetBottomCard = (props) => {
    return (
            <Col
                md={3} xs={6} sm={6} lg={2}
                className="weather-card-body-col mb-4">
                <b>{moment(props?.weather?.dt_txt).format('dddd')}</b>
                <img
                    className="mt-1 weather-card-body-img"
                    src={BASE_IMG_URL + props?.weather?.weather[0]?.icon + "@2x.png"}
                    onError={(e) => { e.target.src = 'images/default.jpg' }}
                    alt={props?.weather?.weather[0]?.description}
                />
                <span style={{ fontSize: 12 }}>
                    <b>{props?.weather?.main?.temp_min}&deg;{props?.unit === "imperial" ? "F" : "C"}</b>
                    &nbsp; {props?.weather?.main?.temp_max}&deg;{props?.unit === "imperial" ? "F" : "C"}</span>
                <span className="weather-card-body-col-span">Humidity: <b>{props?.weather?.main?.humidity}%</b></span>
            </Col>
    )
}

export default WidgetBottomCard;