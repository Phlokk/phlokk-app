import { useQuery } from 'react-query'
import { getIsFollowing } from '../services/user'
import { keys } from './queryKeys'


export const useFollowing = (user, otherUserId, options = {}) => {
    return useQuery(keys.userFollowing(user, otherUserId), () => getIsFollowing(user, otherUserId), options)
}