import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { timeConverter } from "../utils/helpers";
import { handleToggleLikeTweet } from '../actions/tweets';

export class Tweet extends Component {
  state = {
    hasLiked: false
  }

  handleLiked = (e) => {
    e.preventDefault()
    const { id, authedUser, dispatch, tweets } = this.props
    const hasLiked = tweets[id].likes.includes(authedUser)
    dispatch(handleToggleLikeTweet( { authedUser, id, hasLiked }))
  }

  render() {
    const { id, tweets, users, authedUser } = this.props
    const tweet = tweets[id]
    const user = users[tweet.author]
    const hasLiked = tweet.likes.includes(authedUser)

    return (
      <Link to={`/tweet/${tweet.id}`}>
        <img src={user.avatarURL} alt="user avatar" className="avatar" />
        <div>
          <h5>{user.name}</h5>
          <p>{timeConverter(tweet.timestamp)}</p>
          {tweet.replyingTo
            ? <p>Reply to: @{tweets[tweet.replyingTo].author}</p>
            : null
          }
          <p>{tweet.text}</p>
          <div>
            <div>
              <i className="fas fa-reply"></i>
              <span>
                {tweet.replies.length === 0
                  ? null
                  : tweet.replies.length
                }
              </span>
              <span onClick={this.handleLiked}>
                <i className="far fa-heart" style={hasLiked?{color: 'red'}:null}></i>
              </span>
              <span>
                {tweet.likes.length === 0
                  ? null
                  : tweet.likes.length
                }
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = ({ tweets, users, authedUser }) => ({
  tweets, users, authedUser,
})

export default connect(mapStateToProps)(Tweet)

