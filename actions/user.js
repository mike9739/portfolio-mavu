import useSWR from "swr";
import {fetcher} from "./index";

export const useGetUser = () => {
    const {data,error,...rest} = useSWR('/api/v1/user',fetcher);
    return {data, error, loading : !data && !error, ...rest}
}