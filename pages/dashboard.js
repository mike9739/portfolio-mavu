import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/BasePage";
import {  Row, Col  } from 'reactstrap';
import Link from 'next/link'
import Masthead from "../components/shared/Masthead";
import auth0, {withAuth} from "../utils/auth0";
import BlogApi from "../lib/api/blogs";
import PortButtonDropdown from "../components/shared/Dropdown";


const Dashboard = ({user,blogs}) => {

    const createOptions = (blog) => {
        return [{key: `${blog._id}-published`,text:'Publish',handlers: { onClick: () => { alert(`${blog._id}`)}}},
            {key: `${blog._id}-delete`,text:'Delete'}]
    }

    const renderBlogs = (blogs,type) => (
        <ul className={'user-blogs-list'}>
            {
                blogs.filter(blog => blog.status === type).map(blog =>
                    <li key ={blog._id}>
                        <Link href={"/blogs/editor/[id]"} as={`/blogs/editor/${blog._id}`} ><a>{blog.title}</a></Link>
                        <PortButtonDropdown items={createOptions(blog)}/>
                    </li>)
            }
        </ul>)

    return(
        <BaseLayout navClass="transparent" user={user} loading={false}>
            <Masthead/>
            <BasePage className="blog-user-page">
                <Row>
                    <Col md="6" className="mx-auto text-center">
                        <h2 className="blog-status-title"> Published Blogs </h2>
                        {renderBlogs(blogs,'published')}
                    </Col>
                    <Col md="6" className="mx-auto text-center">
                        <h2 className="blog-status-title"> Draft Blogs </h2>
                        {renderBlogs(blogs,'draft')}
                    </Col>
                </Row>
            </BasePage>
        </BaseLayout>
    )
}
export const getServerSideProps = withAuth(async ({req, res}, user) => {
    const {accessToken} = await auth0.getSession(req);
    const json = await new BlogApi(accessToken).getByUser();
    return {blogs:json.data}
})('admin');
export default Dashboard;