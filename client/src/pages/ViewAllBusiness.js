import React, {Component} from 'react';
import NavigationBar from "../components/NavigationBar";
//import BusinessList from "../components/BusinessList";
//import SearchBusiness from "../components/SearchBusiness"
import '../styles/AllBusiness.css'
import {Redirect} from 'react-router-dom'
import { Card, CardTitle, Button, Form} from 'reactstrap';
import axios from 'axios'

var firebase = require('firebase');


class ViewAllBusiness extends Component{
    constructor(){
        super();
        this.state={
            results: [],
            data: '',
            filtered:'',
            route:'',
            businessSelected:false,
        }
        this.passBusinessId = this.passBusinessId.bind(this)
        this.passRoute = this.passRoute.bind(this)
    }

    componentDidMount(){
        this.getAllBusiness();
      }

      getAllBusiness = () => {
        axios.get(`http://localhost:5000/business`)
          .then(res => {
              console.log(res.data)
            this.setState({
              data: res.data.BusinessList,
              filtered: res.data.BusinessList
            })
          })
      }

      handleChange = e => {
        // Variable to hold the original version of the list
        let currentList = [];
            // Variable to hold the filtered list before putting into state
        let newList = [];
            // If the search bar isn't empty
        if (e.target.value !== "") {
                // Assign the original list to currentList
          currentList = this.state.data;

                // Use .filter() to determine which items should be displayed
                // based on the search terms
          newList = currentList.filter(item => {
                    // change current item to lowercase
            const lc = item.bname.toLowerCase();
                    // change search term to lowercase
            const filter = e.target.value.toLowerCase();
                    // check to see if the current list item includes the search term
                    // If it does, it will be added to newList. Using lowercase eliminates
                    // issues with capitalization in search terms and search content
            return lc.includes(filter);
          })
          console.log(newList)

        } else {
                // If the search bar is empty, set newList to original task list
          newList = this.state.data;
        }

        this.setState({
            filtered: newList
        });
    }

    passBusinessId(bid){
        console.log(bid)
        sessionStorage.setItem('bid', bid)
        this.setState({businessSelected:true})
    }

    passRoute(bid){
        console.log(bid)
        var id = firebase.auth().currentUser.uid;
        console.log(id);
        this.setState({route:`http://localhost:5000/route/${bid}/${id}`})
    }


    render(){

        if(this.state.businessSelected){
            return(
                <Redirect to="/service/all"/>
            )
        }
        const businesses = Array.from(this.state.filtered);

        const listItems = businesses.map((business) =>
           <Card key={business.bid}>
                <img className="business-img" src="https://via.placeholder.com/150x150"></img>
                <CardTitle>{business.bname}</CardTitle>
                <p className="working-hours">Working Hours:</p>
                <p className="hours">{business.sworkingHours} - {business.eworkingHours}</p>
                <p className="working-days">{business.workingDays}</p>
                <Form>
                <Button onClick={() => this.passBusinessId(business.bid)}>View Services</Button>
                </Form>
                <Form onClick={() => this.passRoute(business.bid)} action={this.state.route}>
                <Button>View Route</Button>
                </Form>
            </Card>);


        return(
            <div className='all-business-page'>
                <NavigationBar></NavigationBar>
                <input
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleChange}
                    className="search-bar"
                />
                <div className="cards-container">
                    {listItems}
                </div>
            </div>
        )
    }

}


export default ViewAllBusiness;