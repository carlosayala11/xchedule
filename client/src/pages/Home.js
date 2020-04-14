import React, {Component} from 'react';
import logo_black_circle from "../logo_black_circle.png";
import '../styles/Home.css'
import Slideshow from "../components/Carousel";
import Calendar from "../components/Calendar"
import NavigationBar from '../components/NavigationBar'

class Home extends Component{
    constructor(){
        super();
        this.state={
        }

    }

    render(){
        return(
            <div className="home-page">
                <NavigationBar/>
                <div className="lheader">
                    <img src={logo_black_circle} className="home-logo"/>
                </div>
                <div className="rheader">
                    <br/><br/><br/><h1 className="h1">Xchedule</h1>
                    <h2 className="h2">Organize your appointments effectively.</h2><br/>
                </div>
                <div className="carousel">
                    <Slideshow></Slideshow>
                </div>
                <div className="calendar">
                    <Calendar></Calendar>
                </div>

            </div>
        )
    }
}

export default Home;