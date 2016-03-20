var React = require('react');
import Store from '../stores/tomato.js';
import './tomato.css';
import Actions  from '../actions/tomato.js';

module.exports = React.createClass({
    getInitialState: function () {
        return Store.getState();
    },

    componentDidMount: function () {
        Store.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        Store.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(Store.getState());
    },

    _onClickTimer(){
        Actions.startTimer();
    },

    render() {
        var typeClass = 'tomato__type_' + this.state.pomodor.type;

        return (
            <div className={'tomato '+ typeClass}>
                <div className='tomato-pie' style={{animationDelay: '-' + this.state.pomodor.interest + 's'}}></div>
                <div className="tomato-dial">
                    <div className="tomato-dial__time" onClick={this._onClickTimer}>
                        {this.state.pomodor.dial}
                    </div>
                </div>
            </div>
        );
    }
});