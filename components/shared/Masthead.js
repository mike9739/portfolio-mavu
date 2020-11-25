import {Button, Container, Row} from "reactstrap";
import Link from "next/link";
import BaseLayout from "../layout/BaseLayout";

{/* MASTHEAD */}
const Masthead = () => {
    return(
        <div className="masthead" style={{"backgroundImage": `url(/images/home-bg.jpg)`}}>
            <div className="overlay"/>
            <Container>
                <Row>
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div className="site-heading">
                            <h1>Blogs Dashboard</h1>
                            <span className="subheading">
                            Let's share your knowledge to the world 🤓{' '}
                            </span>
                            <span>
                                <Link href='/blogs/editor'>
                                    <Button   color="info" className={'mt-4'} >Create a new Blog</Button>
                                </Link>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}
{/* MASTHEAD */}

export default Masthead;