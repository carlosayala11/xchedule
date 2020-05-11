import React, { Component, useState} from 'react';
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap';

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

    <li key={r.bid}>
     <ul>
         Business Name: {r.bname}
     </ul>
        <Button variant="primary">
            View Business Information
       </Button>
    </li>

  ))
  return <ul>{options}
  </ul>
}

export default BusinessList