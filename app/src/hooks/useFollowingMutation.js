import { useMutation, useQuery, useQueryClient } from 'react-query'
import { changeFollowState, getIsFollowing } from '../services/user'
import { keys } from './queryKeys'
import firebase from 'firebase'


export const useFollowingMutation = (options = {}) => {
    const queryClient = useQueryClient()
    return useMutation(changeFollowState, {
        ...options,
        onMutate: variables => {
            queryClient.setQueryData(
                keys.userFollowing(firebase.auth().currentUser.uid, variables.otherUserId),
                !variables.isFollowing)
        }
    })
}
