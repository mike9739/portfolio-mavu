import {useApiHandler} from "./index";
import axios from 'axios';
import useSWR from "swr";
import {fetcher} from "./index";

const savePortfolio = (data) => axios.post("/api/v1/portfolios",data);
const updatePortfolio = (id,data) => axios.patch(`/api/v1/portfolios/${id}`,data);

export const  useCreatePortfolio = () =>  useApiHandler(savePortfolio);

export const useGetPortfolio = (id) => {
    const {data,error,...rest} = useSWR(id ? `/api/v1/portfolios/${id}` : null,fetcher);
    return {data, error, loading : !data && !error, ...rest}
}
export const useUpdatePortfolio = () => useApiHandler(updatePortfolio)