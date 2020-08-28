import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/BasePage";

import withAuth from "../HOC/withAuth";

const Secret = ({user,loading}) => {

    return (
        <BaseLayout user={user} loading={loading}>
            <BasePage>
                <h1>Im A secret page - Welcome {user.name} </h1>
            </BasePage>
        </BaseLayout>
    )

}

export default withAuth(Secret);


