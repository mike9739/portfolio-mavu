
import BaseLayout from "../../components/layout/BaseLayout";
import BasePage from "../../components/BasePage";
import {useRouter} from "next/router";
import {useGetPostById} from "../../actions";

const Portfolio = () => {
    const router = useRouter();
    const {data: portfolio,error,loading} = useGetPostById(router.query.id);
    return (
        <BaseLayout>
            <BasePage>
                {loading && <p>Loading data</p>}
                {error && <div className="alert alert-danger"> ERROR:{error.message} </div>}
                {   portfolio &&
                    <>
                        <h1>I am Portfolio page</h1>
                        <h1>{portfolio.title}</h1>
                        <p>BODY: {portfolio.body}</p>
                        <p>ID: {portfolio.id}</p>
                    </>

                }
            </BasePage>
        </BaseLayout>
    )
}



export default Portfolio;