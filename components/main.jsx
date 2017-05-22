'use babel';

import React from 'react';
import moment from 'moment';
const osa = require('osa2')
// const Config = require('electron-config');
// const config = new Config();

function getName(number, done){
    var cache = localStorage.getItem(number)
    if (cache){
        return done(null, cache)
    }

    osa(number => {
    const Messages = Application('Messages')
    return Messages.buddies.whose({ handle: number }) ? Messages.buddies.whose({ handle: number })[0].name() : 'Not Found'
})(number).then(function(name) {
    localStorage.setItem(number, name)
    done(null, name)
        //console.log(name)
}).catch(function(err){
    done(null, 'Not Found')
})

}

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             message : props.message,
             name: 'Loading'
        }
    }
     componentDidMount() {
         getName(this.state.message.id, function(err, data){
            this.setState({
                name: data
            });
         }.bind(this))
    }
    render() {
        //console.log(this.state.data[0])
        var date = moment('2001-01-01').add(moment(this.state.message.date).valueOf(), 'seconds').format("dddd, MMMM Do YYYY, h:mm:ss a")
        var message = (<li>{this.state.name} - {date} - {this.state.message.id} - {this.state.message.text}</li>)
        
        return (<li> 
            {message}  
        </li>);
    }
}

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             data : []
        }
    }
     componentDidMount() {
         window.sql.getMessages(function(err, data){
            this.setState({
                data: data
            });
         }.bind(this))
    }
    render() {
        console.log(this.state.data[0])
        const listItems = this.state.data.map((message) => {

           return (<Message key={message.guid} message={message}/>)
           })
        
        return (<div> 
            <ul>
                {listItems}
            </ul>   
        </div>);
    }
}
