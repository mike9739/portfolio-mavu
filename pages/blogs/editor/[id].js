import BaseLayout from "../../../components/layout/BaseLayout";
import BasePage from "../../../components/BasePage";
import withAuth from "../../../HOC/withAuth";
import {Editor} from "slate-simple-editor";
import {useGetBlog, useUpdateBlog} from "../../../actions/blogs";
import {toast} from "react-toastify";
import {useRouter} from "next/router";


const BlogUpdateEditor = ({user,loading}) => {
    const router = useRouter();
    const {data} = useGetBlog(router.query.id);
    const [updateBlog,{loading:isLoading,data:updatedBlog,error}] = useUpdateBlog();


    const _updateBlog = async(data)=>{
        await  updateBlog(router.query.id,data);
        toast('Blog updated successfully');

    }
    if(error) {
        toast.error(error);
    }

    return(
        <BaseLayout
            user={user}
            loading={loading}
        >
            <BasePage>
                {data && data.content && <Editor initialContent={data.content} loading={isLoading} onSave={_updateBlog} header={'Update your work!'} /> }
            </BasePage>
        </BaseLayout>
    )
}
export default withAuth(BlogUpdateEditor)('admin');