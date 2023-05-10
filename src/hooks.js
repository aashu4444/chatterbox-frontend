import useSWR from "swr";

import axios from 'axios'
 
const fetcher = url => axios.get(url).then(res => res.data)

function useUser(id) {
  const { data, error, isLoading } = useSWR(`/api/user/${''}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
