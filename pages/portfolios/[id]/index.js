import {useRouter} from "next/router";
import {useGetUser} from "../../../actions/user";
import BaseLayout from "../../../components/layout/BaseLayout";
import BasePage from "../../../components/BasePage";
import PortfolioApi from "../../../lib/api/portfolio";

const Portfolio = ({portfolio}) => {

    const router = useRouter();
    const { data:dataUser, loading:loadingUser } = useGetUser();
    return (
        <BaseLayout
            user={dataUser}
            loading={loadingUser}
        >
            <BasePage header="Portfolio Description ">
                {JSON.stringify(portfolio)}
            </BasePage>
        </BaseLayout>
    )
}

// export async function getServerSideProps({query}) {
//     const json = await new PortfolioApi().getById(query.id);
//     const portfolio = json.data;
//     return { props :{portfolio}}
// }

export async function getStaticPaths() {
    const json = await new PortfolioApi().getAll();
    const portfolios = json.data;
    const paths = portfolios.map(portfolio => {
        return {
            params: {id: portfolio._id}
        }
    });
    return { paths, fallback:false}
}
export async function getStaticProps({params}) {
    const JSON = await new PortfolioApi().getById(params.id);
    const portfolio = JSON.data;
    return {props:{portfolio}}

}


export default Portfolio;