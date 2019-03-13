import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet';


export class Home extends Component {
  render() {
    const { tweetsList } = this.props
    return (
      <div>
        <h1>Your time line</h1>
          <ul>
            {tweetsList.map(tweet => (
            <li key={tweet.id} className="tweet">
              <Tweet id={tweet.id} />
            </li>
            ))}
          </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { tweets, users, authedUser } = state;
  const tweetsList = Object.keys(tweets)
    .map(id => tweets[id])
    .sort((a, b) => - a.timestamp + b.timestamp )

  return { tweetsList, users, authedUser }
}

export default connect(mapStateToProps)(Home)
