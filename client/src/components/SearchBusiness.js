import React, { Component } from 'react'
import axios from 'axios'
import Suggestions from './Suggestions'

class SearchBusiness extends Component {
  state = {
    query: '',
    results: []
  }

  getInfo = () => {
    axios.get(`http://localhost:5000/business/${this.state.query}`)
      .then(res => {
          console.log(res.data)
        this.setState({
          results: res.data.BusinessList
        })
      })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      }
    })
  }

    render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    )
  }
}

export default SearchBusiness