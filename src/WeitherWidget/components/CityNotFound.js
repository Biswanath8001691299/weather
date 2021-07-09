import React from 'react';
import { Card, Col } from 'react-bootstrap';

const CityNotFound = () => {
    return (
        <React.Fragment>
            <Col md={1}></Col>
            <Col md={10}>
                <Card className="weather-card">
                    <h3 className="error-div-text text-danger">City Not Found</h3>
                </Card>
            </Col>
            <Col md={1}></Col>
        </React.Fragment>
    )
}

export default React.memo(CityNotFound);