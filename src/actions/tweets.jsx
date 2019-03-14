import { saveLikeToggle, saveTweet } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const LIKE_TOGGLE_TWEET = 'LIKE_TOGGLE_TWEET'
export const COMPOSE_TWEET = 'COMPOSE_TWEET'

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

export function composeTweet({ tweet, replyingTo }){
  return {
    type: COMPOSE_TWEET,
    tweet,
    replyingTo
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

export function  handleComposeTweet({ authedUser, text, replyingTo }){
  return dispatch => {
    dispatch(showLoading())
    return saveTweet({ author: authedUser, text, replyingTo })
      .then((tweet) => {
        dispatch(composeTweet({ tweet, replyingTo }))
        dispatch(hideLoading())
      })
  }
}