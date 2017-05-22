import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../components/main.jsx';

console.log(window.sql.data)

window.onload = function() {
    ReactDOM.render( < Main / > , document.getElementById('app'));
}