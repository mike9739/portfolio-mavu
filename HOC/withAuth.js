import {useGetUser} from "../actions/user";
import Redirect from "../components/shared/Redirect";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/BasePage";

const withAuth = (Component) => props => {
    const  {data,loading} = useGetUser();
    if (loading) return <p>Loading....</p>

    if (!data){
        return <Redirect ssr={true}  to={'/api/v1/login'} />
    }else{
        return<Component  user={data} loading={loading} { ...props }/>
    }

}
export default withAuth;