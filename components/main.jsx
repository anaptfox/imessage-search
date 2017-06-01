'use babel';

import React from 'react';
import moment from 'moment';
const osa = require('osa2')

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
        console.log('Could not find name for ' + number)
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
        var message = (<p>{this.state.name} - {date} - {this.state.message.text}</p>)

        if(this.state.message.is_from_me) {
          message = (<p>Taron Foxworth - {date} - {this.state.name} - {this.state.message.text}</p>)

        }
        return (<li>
            {message}
        </li>);
    }
}

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.back = this.back.bind(this);
        this.state = {
             data : [],
             searchTerm: '',
             loading: false,
             clean: true
        }
    }
    back(){
      this.setState({
          clean: true
      });
    }
    handleSubmit(event) {
        this.setState({
            loading: true,
            clean: false
        });
        window.sql.getMessagesByValue(this.input.value, function(err, data){
            this.setState({
                data: data,
                loading: false
            });
         }.bind(this))
        event.preventDefault();
    }
    render() {
        //console.log(this.state.data[0])
        const listItems = this.state.data.map((message) => {
           return (<Message key={message.guid} message={message}/>)
        })

        if(this.state.clean){
          return (
            <div className="column">
              <h1>IMessage Search</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="field has-addons">

                        <p className="control">
                        <input  className="input" ref={(input) => this.input = input} type="text" placeholder="Search by term"/>
                    </p>
                    <p className="control">
                        <a type="submit" className="button is-info">
                        Search
                        </a>
                    </p>


                    </div>
                     </form>
                <ul>
                <p> Wecome to Imessage Search. Just type in the term you're looking for </p>
                </ul>
        </div>);
        }

        if(this.state.loading){
          return (
            <div className="column">
              <h1>IMessage Search</h1>
              <p> Loading </p>
        </div>);
        }

        return (
          <div className="column">
              <h1>IMessage Search</h1>
              <button className="button" onClick={this.back}> Back </button>
                <ul>
                {listItems}
                </ul>
        </div>);
    }
}
