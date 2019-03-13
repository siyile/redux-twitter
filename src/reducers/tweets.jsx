import { RECEIVE_TWEETS, LIKE_TOGGLE_TWEET } from "../actions/tweets";

export default function tweets(state = {}, action){
  switch(action.type){
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    case LIKE_TOGGLE_TWEET:{
      const { id, authedUser, hasLiked } = action
      const tweet = state[id]
      
      if (hasLiked)
        return {
          ...state,
          [id]: {
            ...tweet,
            likes: tweet.likes.filter(id => id !== authedUser)
          }
        }
      else 
        return {
          ...state,
          [id]: {
            ...tweet,
            likes: tweet.likes.concat(authedUser)
          }
        }
    }

    default:
      return state
  }
}