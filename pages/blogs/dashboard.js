import BaseLayout from "../../components/layout/BaseLayout";
import BasePage from "../../components/BasePage";
import withAuth from "../../HOC/withAuth";

const Dashboard = ({user,loading}) => {


    return(
        <BaseLayout
            user={user}
            loading={loading}
        >
            <BasePage header={'Dashboard'}>
                <h1>DAsh Page</h1>
            </BasePage>
        </BaseLayout>
    )
}
export default withAuth(Dashboard)('admin');