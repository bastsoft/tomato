var AppDispatcher = require('../AppDispatcher.js');

var Actions = {
    startTimer(){
        AppDispatcher.dispatch({
            actionType: 'tomato__startTimer',
            actionData: null
        });
    },
    setTimer(obj){
        AppDispatcher.dispatch({
            actionType: 'tomato__setTimer',
            actionData: obj
        });
    }
};

module.exports = Actions;