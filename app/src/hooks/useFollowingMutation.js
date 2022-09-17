// import { useMutation, useQuery, useQueryClient } from 'react-query'
// import { useSelector } from 'react-redux';
// import { changeFollowState, getIsFollowing } from '../services/user'
// import { keys } from './queryKeys'





// export const useFollowingMutation = (options = {}) => {
//   const auth = useSelector((state) => state.auth);

//     const queryClient = useQueryClient()
//     return useMutation(changeFollowState, {
//         ...options,
//         onMutate: variables => {
//             queryClient.setQueryData(
//                 keys.userFollowing(user.id, variables.otherUserId),
//                 !variables.isFollowing)
//         }
//     })
// }
