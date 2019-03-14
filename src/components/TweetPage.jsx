import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet';
import ComposeTweet from './ComposeTweet';

export class TweetPage extends Component {
  render() {
    const { match, tweets } = this.props
    const id = match.params.id
    const replies = tweets[id].replies

    return (
      <div className="container">
        <Tweet id={id} />
        <ComposeTweet replyingTo={id} />
        <ul>
          {
            replies.map(id => (
              <li key={id}>
                <Tweet id={id} />
              </li>
            )) 
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ tweets }) => ({
  tweets,
})

export default connect(mapStateToProps)(TweetPage)
