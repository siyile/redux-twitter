import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleComposeTweet } from '../actions/tweets';
import { Redirect } from 'react-router-dom'


export class ComposeTweet extends Component {
  state = {
    text: "",
    redirect: false,
  }

  handleOnChange = (e) => {
    this.setState({text: e.target.value})
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state
    const { authedUser, dispatch, replyingTo } = this.props
    dispatch(handleComposeTweet({ authedUser, text, replyingTo }))
    this.setState(() => ({
      redirect: true
    }))
  }

  render() {
    if (this.state.redirect){
      return <Redirect to="/" />
    }
    return (
      <div className="container">
        <h1 className="text-center">Compose New Tweet</h1>
        <div className="form-group">
          <textarea className="form-control d-block m-3" rows="10" value={this.state.text} onChange={this.handleOnChange}></textarea>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={this.handleOnSubmit}>Submit!</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser
})

export default connect(mapStateToProps)(ComposeTweet)
