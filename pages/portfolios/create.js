import BaseLayout from "../../components/layout/BaseLayout";
import BasePage from "../../components/BasePage";
import withAuth from "../../HOC/withAuth";
import PortfolioForm from "../../components/PortfolioForm";
import {useCreatePortfolio} from "../../actions/portfolio";
import Redirect from "../../components/shared/Redirect";



const createPortfolio = ({user,loading:userLoading}) => {
    const [createPortfolio,{data,loading,error}] = useCreatePortfolio();

    if (data) return <Redirect to='/portfolios'/>

    return(
        <BaseLayout user={user} loading={userLoading}>
            <BasePage header="Create portfolio">
                <PortfolioForm onSubmit={createPortfolio}/>
                {error && <div className='alert alert-danger mt-3'>{error}</div>}
            </BasePage>
        </BaseLayout>
    )
}
export default withAuth(createPortfolio)('admin');