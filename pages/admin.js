import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/BasePage";

import withAuth from "../HOC/withAuth";

const Admin = ({user,loading}) => {

    return (
        <BaseLayout user={user} loading={loading}>
            <BasePage>
                <h1>I Welcome Admin - {user.name} </h1>
            </BasePage>
        </BaseLayout>
    )

}

export default withAuth(Admin)('admin');





