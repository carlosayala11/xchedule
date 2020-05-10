import React, { Component } from 'react'
import axios from 'axios'
import {Form} from "reactstrap";

class BusinessList extends Component {
  state = {
    results: []
  }

  getAllBusiness = () => {
    axios.get(`http://localhost:5000/business`)
      .then(res => {
          console.log(res.data)
        this.setState({
          results: res.data.BusinessList
        })
      })
  }


    render() {
      this.getAllBusiness();
    return (
      <form>
        <List results={this.state.results} />
      </form>
    )
  }
}

const List = (props) => {
  const options = props.results.map(r => (

    <li key={r.bid}>Business Name: {r.bname}
      <ul>
          <Form action="http://localhost:3000/business/search">
              <button type="submit">View Business</button>
            </Form>
      </ul>
    </li>
  ))
  return <ul>{options}
  </ul>
}

export default BusinessList