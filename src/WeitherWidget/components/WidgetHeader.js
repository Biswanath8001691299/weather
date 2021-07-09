import React from 'react';
import { Row, Col, Card } from 'react-bootstrap'
import moment from 'moment';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { BASE_IMG_URL } from "../config";

const WidgetHeader = (props) => {
    
    // Update once switch checked
    const toggleChecked = (e) => {
        if (!e.target.checked) {
            props.updateUnit('metric');
        } else {
            props.updateUnit('imperial');
        }
    };

    return (
            <Card.Header className="weather-card-head">
            <div className="weather-card-head-align">
                <div>
                    <h1><b>{props?.city?.name}</b></h1>
                    <span className="mb-2 bottom-header-text">{moment().format('MMMM Do YYYY')}</span><br />
                </div>
                <div style={{ display: 'flex' }}>
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid  item><span className="unit-text-div">Metric Unit</span></Grid>
                        <Grid item>
                            <Switch
                                checked={props?.unit === "imperial" ? true : false}
                                onChange={toggleChecked} name="checkedC"
                                data-testid="unit-switch"
                            />
                        </Grid>
                        <Grid item><span className="unit-text-div">Imperial Unit</span></Grid>
                    </Grid>
                </div>
            </div>
            <Row>
                <Col className="weather-card-head-innerbody">
                    <img
                        className="mt-0 weather-card-body-img"
                        src={BASE_IMG_URL + props?.weather?.weather[0]?.icon + "@2x.png"}
                        onError={(e) => { e.target.src = 'images/default.jpg' }}
                        alt={props?.weather?.weather[0]?.description}
                    />
                    <span className="ml-4 bottom-header-text"  >
                        {props?.weather?.main?.temp}<span data-testid="unit-from-header-temparature">&deg;{props?.unit === "imperial" ? "F" : "C"}</span>
                    </span>
                </Col>
                <Col className="weather-card-head-innerbody-sideblock">
                    <span>Description: <b className="text-capitalize">{props?.weather?.weather[0]?.description}</b></span>
                    <span>Humidity: <b>{props?.weather?.main?.humidity}%</b></span>
                    <span>Wind Speed: <b>{props?.weather?.wind?.speed} <span data-testid="unit-from-header-wind-speed">{props?.unit === "imperial" ? "miles/hour" : "meter/sec"}</span></b></span>
                </Col>
            </Row>
            </Card.Header>
    )
}
export default WidgetHeader;