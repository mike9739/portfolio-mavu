import {Card, CardBody, CardHeader, CardText, CardTitle} from "reactstrap";
import React from "react";

const PortfolioCard = ({portfolio}) =>{
    return (
        <>
            <Card className="portfolio-card">
                <CardHeader className="portfolio-card-header">{portfolio.jobTitle}</CardHeader>
                <CardBody>
                    <p className="portfolio-card-city">{portfolio.location}</p>
                    <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
                    <CardText className="portfolio-card-text">{portfolio.description}</CardText>
                </CardBody>
            </Card>
        </>
    )
}

export default PortfolioCard;