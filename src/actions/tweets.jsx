import { saveLikeToggle } from "../utils/api";

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const LIKE_TOGGLE_TWEET = 'LIKE_TOGGLE_TWEET'

export function receiveTweets(tweets){
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

export function likeToggleTweet( { authedUser, id, hasLiked }){
  return {
    type: LIKE_TOGGLE_TWEET,
    authedUser,
    id,
    hasLiked
  }
}

export function handleToggleLikeTweet({ authedUser, id, hasLiked }){
  return dispatch => {
    dispatch(likeToggleTweet( { authedUser, id, hasLiked }))
    return saveLikeToggle({ id, hasLiked, authedUser })
      .catch(() => {
        hasLiked = !hasLiked
        dispatch(likeToggleTweet( { authedUser, id, hasLiked }))
      })
  }
}