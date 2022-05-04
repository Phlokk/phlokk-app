import { useQuery } from 'react-query'
import { getIsFollowing } from '../services/user'
import { keys } from './queryKeys'


export const useFollowing = (currentUser, otherUserId, options = {}) => {
    return useQuery(keys.userFollowing(currentUser, otherUserId), () => getIsFollowing(currentUser, otherUserId), options)
}