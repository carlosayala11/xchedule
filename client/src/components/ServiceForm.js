import {Button, Col, Container, Input, Row, Spinner} from "reactstrap";
import React, {Component} from 'react';
import "flatpickr/dist/themes/dark.css";
import '../styles/CreateBusiness.css'
import {Redirect} from "react-router-dom";
import axios from 'axios'




class ServiceForm extends Component {
    constructor() {
        super();
        this.state = {
            serviceType:'',
            serviceDetails:'',
            bid:'',
            loadingServiceCreation:false,
            serviceCreated:false,
            errorMessage:'',
            errorCode:''
        };
    }
   onInputChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

   createService(){
        this.setState({loadingServiceCreation:true});
        var service = {
                   bid: sessionStorage.getItem('bid'),
                   serviceType: this.state.serviceType,
                   serviceDetails: this.state.serviceDetails
                }
                console.log(service)
       axios.post("http://127.0.0.1:5000/services/insert", service).then((res)=>{
                    this.setState({serviceCreated:true})
                 console.log(res)
                }).catch((error) => {
                this.setState({errorMessage: error.message})
                this.setState({errorCode: error.code})
              });
       sessionStorage.clear();

    }

    renderErrorMessage(){
        if(this.state.errorMessage){
            console.log(this.state.errorMessage)
            return <p className="login-error-message">{this.state.errorMessage}</p>}

        }


    renderCreateServiceSpinner(){
        if(this.state.loadingServiceCreation){
            return <Spinner color="primary" />
        }else{
            return <p className="button-text">Add Service</p>
        }
    }


    render(){
        if(this.state.serviceCreated){
            return <Redirect to='/business/manage'/>;

        }
        return(
            <div className="signUp-form">
                <p className="login-title">Add Service</p>
                <Container>
                    <Row>
                        <Col>
                            <Input className="login-input" name="serviceType" placeholder="Service Type" onChange={this.onInputChange}/>
                        </Col>
                        <Col>
                            <Input className="login-input" name="serviceDetails" placeholder="Service Details" onChange={this.onInputChange}/>
                        </Col>
                    </Row>
                </Container>

                <Button className="login-button" color="primary" onClick={this.createService.bind(this)}>
                    {this.renderCreateServiceSpinner()}
                </Button>
                {this.renderErrorMessage()}

            </div>


        )
    }
}

export default ServiceForm;