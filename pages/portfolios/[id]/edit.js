import BaseLayout from "../../../components/layout/BaseLayout";
import BasePage from "../../../components/BasePage";
import withAuth from "../../../HOC/withAuth";
import PortfolioForm from "../../../components/PortfolioForm";
import {useGetPortfolio, useUpdatePortfolio} from "../../../actions/portfolio";
import {useRouter} from "next/router";
import {toast} from "react-toastify";



const PortfolioEdit = ({user}) => {

    const router = useRouter();
    const [updatePortfolio,{error}] = useUpdatePortfolio();
    const {data:initialData} = useGetPortfolio(router.query.id);

    const handlerUpdatePortfolio =async (data) => {

            await updatePortfolio(router.query.id, data).then(()=>{
                toast.info('👽 Portfolio Updated!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch((e)=>{
                toast.info(e, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })




    }

    return (
        <BaseLayout
            user={user}
            loading={false}
        >
            <BasePage header="Portfolio Edit ">
                {   initialData &&
                    <PortfolioForm buttonText={'Update'} onSubmit={handlerUpdatePortfolio} initalData={initialData}/>}

            </BasePage>
        </BaseLayout>
    )
}


export default withAuth(PortfolioEdit)('admin');