import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "../types/types";

const api = axios.create({
  baseURL: "https://deezerdevs-deezer.p.rapidapi.com",
  headers: {
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "2e97bc1313mshe35d6ec451e07bdp1e00fdjsn7e2b3ff18869",
  },
});

export const fetchCharts = async (): Promise<ApiResponse> => {
  const response = await api.get("/chart");
  console.log(response.data);
  return response.data;
};

export const SearchTrackDetails = async (
  query: string
): Promise<ApiResponse> => {
  const res = await api.get<ApiResponse>(`/search`, {
    params: {
      q: query, 
    },
  });
  return res.data;
};

export const useCharts = () => {
  return useQuery({
    queryKey: ["charts"],
    queryFn: fetchCharts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const fetchTrackDetails = async (): Promise<ApiResponse> => {
  const res = await api.get<ApiResponse>("infos ");
  return res.data;
};

export const useTrack = (id: number) => {
  return useQuery({
    queryKey: ["track", id],
    queryFn: () => fetchTrackDetails(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
