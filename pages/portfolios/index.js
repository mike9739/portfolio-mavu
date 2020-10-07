import BaseLayout from "../../components/layout/BaseLayout";
import BasePage from "../../components/BasePage";
import  {Button,Row,Col} from "reactstrap";
import PortfolioCard from "../../components/shared/PortfolioCard";
import PortfolioApi from "../../lib/api/portfolio";
import {isAuthorized} from "../../utils/auth0";
import {useGetUser} from "../../actions/user";
import {useRouter} from "next/router";

import {useState} from "react";
import {useDeletePortfolio} from "../../actions/portfolio";


const Portfolios = ({portfolios:initialPortfolios}) => {
    const router = useRouter();
    const { data:dataUser, loading:loadingUser } = useGetUser();
    const [deletePortfolio, {data, error}] = useDeletePortfolio();
    const [portfolios,setPortfolios] = useState(initialPortfolios)
    const _deletePortfolio = async (e, portfolioId) => {
        e.stopPropagation();
        const isConfirm = confirm('Are you sure you want to delete this portfolio?');
        if (isConfirm) {
            await deletePortfolio(portfolioId);
            setPortfolios(portfolios.filter(portfolio => portfolio._id !== portfolioId))
        }
    }

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
                            <PortfolioCard portfolio={portfolio}>
                                { dataUser && isAuthorized(dataUser,'admin') &&
                                    <>
                                    <Button
                                        onClick={ (e)=> {
                                            e.stopPropagation();
                                            router.push('/portfolios/[id]/edit', `portfolios/${portfolio._id}/edit`)
                                        } }
                                        className="mr-2" color="warning">Edit</Button>
                                    <Button
                                        onClick={(e) => _deletePortfolio(e, portfolio._id)}
                                        color="danger">Delete</Button>
                                </>}
                            </PortfolioCard>
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
        props:{portfolios},
        revalidate:1
    }
}

export default Portfolios;