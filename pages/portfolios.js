
import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import axios from "axios";
import {Link} from "../server/routes";

class Portfolios extends React.Component  {

    static async getInitialProps() {
        let posts = [];
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            posts = res.data;
        } catch (e) {
            console.log(e);
        }
        return {posts: posts.slice(0,10)}
    }


    renderPosts(posts) {
        return posts.map(post =>
            <li style={{'fontSize':'22px'}} key={post.id}>
                <Link route={`/portfolios/${post.id}`} >
                    <a>{post.title}</a> 
                </Link>
            </li>)
    }

    render(){
        const {posts} = this.props;
        return (
            <BaseLayout>
                <h1>Portfolios Page</h1>
                {this.renderPosts(posts)}
            </BaseLayout>)
    }
}
export default Portfolios;
