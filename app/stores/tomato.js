"use strict";

var AppDispatcher = require('../AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
const CHANGE_EVENT = 'change';
var moment = require('moment');

var State = {
    pomodor: {
        dial: '00:00',
        interest: '0',
        time: '00:00',
        type: 'red',
        handler: () => {
            console.log('showNotifications');
        }
    },
    curTimer: null
};

var Store = assign({}, EventEmitter.prototype, {
        getState() {
            return State;
        },

        emitChange() {
            this.emit(CHANGE_EVENT);
        },

        addChangeListener(callback) {
            this.on(CHANGE_EVENT, callback);
        },

        removeChangeListener(callback) {
            this.removeListener(CHANGE_EVENT, callback);
        },

        startTimer(){
            if (State.curTimer === null) {
                this._startTimer();
            } else {
                this._cancelTimer()
            }
        },

        _startTimer(){
            var timeArr = State.pomodor.time.split(':');

            State.pomodor.current = moment().add(timeArr[0], 'minutes').add(timeArr[1], 'seconds');
            State.pomodor.curMls = State.pomodor.current.diff(moment(), 'milliseconds');
            this._tiktak();
        },

        _tiktak(){
            const mls = State.pomodor.current.diff(moment(), 'milliseconds');

            if (mls < 0) {
                this._cancelTimer('end of time');
                return;
            }

            State.pomodor.interest = (100 - Math.floor(mls / (State.pomodor.curMls / 100))) + 1;
            State.pomodor.dial = moment.utc(mls).format("mm:ss");

            this.emitChange();
            State.curTimer = setTimeout(this._tiktak.bind(this), 1000);
        },

        _cancelTimer(type){
            clearTimeout(State.curTimer);

            State.pomodor.interest = (type === 'end of time') ? 100 : 0;
            State.pomodor.dial = State.pomodor.time;

            this.emitChange();

            State.curTimer = null;

            if (type === 'end of time') {
                State.pomodor.handler();
            }
        },

        setTimer(obj){
            State.pomodor.time = obj.time;
            State.pomodor.dial = State.pomodor.time;
            State.pomodor.type = obj.color;
            State.pomodor.handler = obj.handler;
            this._cancelTimer();
        }
    })
    ;

var actionsDateStore = {
    tomato__startTimer(){
        Store.startTimer();
        Store.emitChange();
    },
    tomato__setTimer(obj){
        Store.setTimer(obj);
        Store.emitChange();
    }
};

AppDispatcher.register(function (action) {
    if (actionsDateStore[action.actionType]) {
        actionsDateStore[action.actionType](action.actionData);
    }
});

module.exports = Store;