import { useQuery } from "react-query";
import { getUserById, getUserRealtime } from "../services/user";
import { keys } from "./queryKeys";

export const useUser = (userId, options = {}) => {
  return useQuery(keys.user(userId), () => getUserById(userId), options);
};

export const useUserRealtime = (userId, cb) => {
  return getUserRealtime(userId, cb);
};
