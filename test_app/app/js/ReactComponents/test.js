/*
import React from 'react';

class TestComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {                   // initial state defined here
            count: props.initialCount,
            message: "Curse you react!"
        }

        this.handleClick = this.handleClick.bind(this) // this = this
    }
    
    render(){
        return (
                <h1>This is a very basic test without quotes, {this.props.name}</h1>
                <button onClick={this.handleClick}>
                Nani Kore
            </button>
        }

        handleClick(){
            console.log("Yataaa");
        }
    }
}

TestComponent.defaultProps = {
    name: "Jerry"
}

render(
    new TestComponent();
);
*/

// Link.react.js
import React from 'react';

const STATUS = {
    HOVERED: 'hovered',
    NORMAL: 'normal',
};

export default class Link extends React.Component {

    constructor(props) {
        super(props);

        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);

        this.state = {
            class: STATUS.NORMAL,
        };
    }

    _onMouseEnter() {
        this.setState({class: STATUS.HOVERED});
    }

    _onMouseLeave() {
        this.setState({class: STATUS.NORMAL});
    }

    render() {
        return (
                <a
            className={this.state.class}
            href={this.props.page || '#'}
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave}>
                {this.props.children}
            </a>
        );
    }
}
