import auth0 from "../../../../utils/auth0";
import BlogsApi from "../../../../lib/api/blogs";


export default  async function createBlog (req,res){
    try{
        const {accessToken} = await auth0.getSession(req);
        const data = await new  BlogsApi(accessToken).create(req.body);
        return res.json(data.data);
    } catch (e){
        return res.status(e.status || 422).json(e.response.data);
    }
}