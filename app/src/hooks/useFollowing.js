import { useQuery } from 'react-query'
import { getIsFollowing } from '../services/user'
import { keys } from './queryKeys'


// export const useFollowing = (userId, otherUserId, options = {}) => {
//     return useQuery(keys.userFollowing(userId, otherUserId), () => getIsFollowing(userId, otherUserId), options)
// }