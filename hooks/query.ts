import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

export const fetcher = async (uri:string) => {
    const response:AxiosResponse = await axios.get(uri);
    if(response.status === 200) return response.data;
    return null;
};
    

export const useGetTags = (categoryIds?:string, difficultyId?:number) => {
    const baseApiUri:string = process.env.NEXT_PUBLIC_API_URI || "";
    const categoryParam = !categoryIds ? "" : `?categories=${categoryIds}&`;
    const difficultyParam = !difficultyId ? "" : `difficultyId=${difficultyId}`;
    
    return useSWR(baseApiUri + "/api/questions/tags" + categoryParam + difficultyParam,fetcher);
};