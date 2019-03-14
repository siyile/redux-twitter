import { RECEIVE_USERS } from "../actions/users";
import { COMPOSE_TWEET } from "../actions/tweets";

export default function users(state = {}, action){
  switch(action.type){
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }

    case COMPOSE_TWEET:{
      const { tweet } = action
      const authedUser = state[tweet.author]
      return {
        ...state,
        [authedUser.id]: {
          ...authedUser,
          tweets: authedUser.tweets.concat(tweet.id)
        }
      }
    }


    default:
      return state
  }
}