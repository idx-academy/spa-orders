import { useUserDetailsSelector } from "@/store/slices/userSlice";

const useGetUserDetails = () => {
  const userDetails = useUserDetailsSelector();

  if (!userDetails) {
    throw new Error("User details are not available");
  }

  return userDetails;
};

export default useGetUserDetails;
