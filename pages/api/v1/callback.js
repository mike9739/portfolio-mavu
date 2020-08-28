import auth0 from "../../../utils/auth0";
export default async function callback ( req,res ) {
    try {
        await auth0.handleCallback(req,res,{redirectTo:'/'});
    }
    catch (err){
        res.status(err.status || 400).end(`Error: ${err.message}`);
    }
}