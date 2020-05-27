import React, { Component, useState} from 'react';
import axios from 'axios'


class BusinessList extends Component {
  state = {
    results: []

  }

  getAllBusiness = () => {
    axios.get(`https://xchedule-api.herokuapp.com/business`)
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
      {this.state.results.map(r => (
        <ul key={r.bid}>
            <ul>Business Name:{r.bname}</ul>
            <ul>Twitter:{r.twitter}</ul>
            <ul>Facebook:{r.facebook}</ul>
            <ul>Instagram:{r.instagram}</ul>
            <ul>Start Time:{r.sworkingHours}</ul>
            <ul>End Time:{r.eworkingHours}</ul>
            <ul>Working days:{r.workingDays}</ul>
            <ul>Time Restriction:{r.timeRestriction}</ul>
            </ul>

         ))}
      </form>
    )
  }



}

export default BusinessList