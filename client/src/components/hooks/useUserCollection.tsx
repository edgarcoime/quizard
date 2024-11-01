import { fetchUserCollection } from "@/lib/api/userCollection";
import { userCollection } from "@/types/userCollection";
import { useQuery } from "@tanstack/react-query";

export default async function useUserCollection(){
    
    const resolvedPromise = useQuery<userCollection>({
        queryFn: async () => await fetchUserCollection(),
        queryKey: ["collection"]
    });

    return resolvedPromise


}