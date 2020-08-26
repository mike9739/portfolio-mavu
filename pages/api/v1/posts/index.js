import axios from "axios";


const  getPosts = async (req, res) => {
    try {
        const axiosResponse = await axios.get('http://jsonplaceholder.typicode.com/posts');
        const posts = axiosResponse.data;
        res.status(200).json(posts.slice(0,10));

    } catch (e) {
        res.status(e.status || 400).end(`Something went wrong`);
    }
}

export default  getPosts;
