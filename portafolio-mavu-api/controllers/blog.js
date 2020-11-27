const Blog = require('../models/blogs');



const getBlogs = async(req, res) =>{
    await Blog.find({status:'published'}).sort({createdAt: -1}).exec((err,Blogs)=>{
        if (err){
            return res.status(400).json(err)
        }
        res.json(Blogs);
    });
}

const getBlogById = async(req,res) =>{
    let id = req.params.id;
    await Blog.findById(id).exec((err,Blog) =>{
        if (!Blog){
            return res.status(500).json({message:'Blog not found'});
        }
        if (err){
            return res.status(500).json({err,message:'This is our fault our API FAIL :('});
        }
        res.json(Blog);
    });
}

const getBlogBySlug = async(req,res) =>{
    await Blog.findOne({slug:req.params.slug}).exec((err,Blog) =>{
        if (!Blog){
            return res.status(500).json({message:'Blog not found'});
        }
        if (err){
            return res.status(500).json({err,message:'This is our fault our API FAIL :('});
        }
        res.json(Blog);
    });
}

const createBlog = async(req, res) =>{
    const BlogData = req.body;
    const userId = req.user.sub;
    //const userId = 'google-oauth2|112274507355592940092';
    let blog = new Blog(BlogData);
    blog.userId = userId;
    await blog.save((err, BlogDB)=>{
        if (err){
            return res.status(400).json(err)
        }
        res.json({data: BlogDB});
    })
}

const updateBlog = async(req,res) => {
    const { body, params: {id}} = req;

    Blog.findById(id, async (err, blog) => {
        if (err) {
            return res.status(422).send(err.message);
        }

        // TODO: Check if user is publishing blog
        // and if user is publishing then create SLUG

        blog.set(body);
        blog.updateAt = new Date();

        try {
            const updatedBlog = await blog.save();
            return res.json(updatedBlog);
        } catch(err) {
            return res.status(422).send(err.message);
        }
    });
}

const deleteBlog = async(req,res) => {
    await Blog.findOneAndRemove({_id:req.params.id},(err,deletedBlog)=>{
        if (err){
            return res.status(500).json(err)
        }
        if(!deletedBlog){
            return  res.status(404).json({err:'User not found'});
        }
        return res.json({data: deletedBlog});
    });
}

const getBlobByUser = async (req,res) => {
    const userId  = await req.user.sub;
    const blogs = await Blog.find({userId});
    return res.json(blogs)
}

module.exports ={
    getBlogs,
    getBlogById,
    getBlogBySlug,
    saveBlog: createBlog,
    getBlobByUser,
    updateBlog,
    deleteBlog
}