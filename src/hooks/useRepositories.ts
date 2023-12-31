import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {GitHubRepositoryResponse} from "@/types/github-reponses";

export function useRepositoriesWithUsername(username?: string) {
    return useQuery(["repositories", username], async () => {
        const {data} = await axios.get(`/api/repositories`, {
            params: {
                username
            }
        });
        return data as GitHubRepositoryResponse[];
    }, {
        refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
        refetchOnReconnect: process.env.NODE_ENV !== 'development',
        refetchOnMount: process.env.NODE_ENV !== 'development',
    });
}

export function useRepositoriesWithToken() {
    return useQuery(["repositories"], async () => {
        const {data} = await axios.get(`/api/repositories`);
        return data as GitHubRepositoryResponse[];
    }, {
        refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
        refetchOnReconnect: process.env.NODE_ENV !== 'development',
        refetchOnMount: process.env.NODE_ENV !== 'development',
    });
}