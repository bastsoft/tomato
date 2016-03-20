const React = require('react');
const ReactDOM = require('react-dom');
import Tomato from './components/tomato.jsx';
import TomatoAction from './actions/tomato.js';
import './app.css';

exports.init = function (selector) {
    ReactDOM.render(
        React.createElement(Tomato),
        document.querySelector(selector)
    );
};


exports.setTimer = function (time, color, handler) {
    TomatoAction.setTimer({
        time: time,
        color: color,
        handler: handler
    });
};

exports.startTimer = function () {
    TomatoAction.startTimer();
};
