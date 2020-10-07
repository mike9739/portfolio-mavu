
import auth0 from "../../../../utils/auth0";
import BlogsApi from "../../../../lib/api/blogs";

export default  async function handleBlog(req, res) {

    if (req.method === "GET") {
        const json = await new BlogsApi().getById(req.query.id);
        return res.json(json.data);
    }

    if (req.method === "PATCH") {
        try {
            const { accessToken } = await auth0.getSession(req);
            const json = await new BlogsApi(accessToken).update(req.query.id, req.body);
            return res.json(json.data);
        } catch(e) {
            return res.status(e.status || 422).json(e.response.data);
        }
    }

    if (req.method === 'DELETE') {
        try {
            const { accessToken } = await auth0.getSession(req);
            const json = await new BlogsApi(accessToken).delete(req.query.id, req.body);
            return res.json(json.data);
        } catch(e) {
            return res.status(e.status || 422).json(e.response.data);
        }
    }
}