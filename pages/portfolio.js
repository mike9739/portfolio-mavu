import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import axios from "axios";


class Portfolio extends React.Component{
    constructor(props){
        super (props)
    }
    static async getInitialProps({query}) {
        let post = null;
        let id =  query.id;
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            post = res.data;
        } catch (e) {
            console.log(e);
        }
        return {post}
    }


    render(){
        return (<BaseLayout>
            <h1>{this.props.post.title}</h1>
            <h2>Body: {this.props.post.body}</h2>
            <h2>ID: {this.props.post.id}</h2>
        </BaseLayout>)
    }
}
export default Portfolio;