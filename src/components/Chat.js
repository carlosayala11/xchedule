import React, {Component} from 'react';
import ChatBox from 'react-chat-plugin';
import NavigationBar from '../components/NavigationBar'
import { withRouter } from "react-router-dom";
import { Button } from 'reactstrap';

var axios = require('axios');
var firebase = require('firebase');

class Chat extends Component{
    constructor(){ 
        super();
        this.state = {
            messages: [],
            id: '',
            bid: sessionStorage.getItem('openChat'),
            owner: '',
            business_messages: [],
            sender: sessionStorage.getItem('senderId')
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              this.setState({id: firebase.auth().currentUser.uid});
              this.getBusinessOwner();
              //this.getMessages();
              //console.log(this.state.id)
            } else {
                console.log("no user")
              // No user is signed in.
            }
          });
    }

    getMessages(){
        if(this.state.owner === this.state.id){
            console.log(this.sender.id);
            this.setState({owner: this.state.sender})
        }
        axios.get('http://localhost:5000/messages',{
            params: {
                uid: this.state.id,
                bid: this.state.bid,
                owner: this.state.owner
            }
        })
        .then(res => {
            this.setState({messages: res.data.MessagesList});
            //console.log(res.data.MessagesList)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getBusinessOwner(){
        var url = 'http://localhost:5000/business/'+this.state.bid.toString();
        // console.log(url)
        axios.get(url)
        .then(res => {
            //console.log(res.data.Business.uid)
            this.setState({owner: res.data.Business.uid});
            this.getMessages();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleOnSendMessage = (message) => {
        axios.post('http://127.0.0.1:5000/messages/add', {
            uid: this.state.id,
            bid: this.state.bid,
            body: message,
            mdate: +new Date(),
            mtype: 'text'
        }).then(function(response){
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
        });
        this.setState({
            // messages: this.state.messages.concat({
            //     author: {'id': this.state.id},
            //     text: message,
            //     timestamp: +new Date(),
            //     type: 'text'
            // })
        });
    }

    // componentDidUpdate(){
    //     //this.getBusinessOwner();
    //     this.getMessages();
    // }

    // componentDidMount(){
    //     this.getBusinessOwner();
    //     this.getMessages();
    // }

    render(){
        const{id} = this.state;
        return(
            <div className="chat-page">
            <NavigationBar/>
                <div className="chatbox-container">
                    <ChatBox
                        messages={this.state.messages}
                        userId={id}
                        onSendMessage={this.handleOnSendMessage}
                        width={'500px'}
                        height={'500px'}
                    />
                    <Button className="btn-back" onClick={() => this.props.history.goBack()}>Go Back</Button>
                </div>
            </div>
        );
    }

}
export default withRouter(Chat);