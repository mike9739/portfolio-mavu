import auth0 from "../../../../utils/auth0";
import PortfolioApi from "../../../../lib/api/portfolio";


export default  async function createPortfolio (req,res){
    try{
        const {accessToken} = await auth0.getSession(req);
        const data = await new  PortfolioApi(accessToken).createPortfolio(req.body);
        return res.json(data.data);
    } catch (e){
        return res.status(e.status || 422).json(e.response.data);
    }
}