import BaseLayout from "../../components/layout/BaseLayout";
import BasePage from "../../components/BasePage";
import {useGetUser} from "../../actions/user";
import PortfolioApi from "../../lib/api/portfolio";
import  {CardText,Row,Col,Card,CardHeader,CardBody,CardTitle} from "reactstrap";
import React from "react";
import PortfolioCard from "../../components/shared/PortfolioCard";
import {useRouter} from "next/router";



const Portfolios = ({portfolios}) => {
    const { data:dataUser, loading:loadingUser } = useGetUser();
    const router = useRouter();
    return (
        <BaseLayout
            user={dataUser}
            loading={loadingUser}
        >
            <BasePage
                header="Portfolios"
                className="portfolio-page">
                <Row>
                    {portfolios.map(portfolio => (
                        <Col key={portfolio._id} md="4" onClick={() => {
                            router.push('/portfolios/[id]',`/portfolios/${portfolio._id}`)
                        }}>
                            <PortfolioCard portfolio={portfolio}/>
                        </Col>
                    ))}
                </Row>
            </BasePage>
        </BaseLayout>
    )
}

export async function getStaticProps() {
    const data = await new PortfolioApi().getAll();
    const portfolios = data.data;
    return {
        props:{portfolios}
    }
}

export default Portfolios;