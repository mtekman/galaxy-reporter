import React from 'react';

export default class FilterTable extends React.Component {
   constructor() {
    super();
        this.state = {search_text: ''}  //  init state
    }
    
    __handleUserInput(text) {
        this.setState({search_text: text});
    }
    
    render(){
        
        return (
            <div>
            <Search 
                search_text={this.state.search_text}
                onUserInput={this.__handleUserInput.bind(this)}
            />
            <Table 
            data={this.props.data} 
            search_text={this.state.search_text}
            />
            </div>
        );
    }
}

class Search extends React.Component {
    
    __onChange() {
        this.props.onUserInput(
            this.refs.search_text.value
        );
    }
    render(){

        return (
            <form>
                <input 
                type="text" 
                placeholder="Keyword" 
                ref="search_text"
                value= {this.props.search_text}
                onChange= {this.__onChange.bind(this)} 
                />
            </form>
        );
    }
}

class Table extends React.Component {
    render(){
        let sections = [];
        let data = this.props.data;
        data.forEach(function(item){
            if (item.name.indexOf(this.props.filterText) === -1) {
                return;
            }
            sections.push(<Field key={item.name} data={item} />);
        }.bind(this))
        return(
            <div>{sections}</div>
        );
    }
}

class Field extends React.Component {
    render(){
        return(
            <div>
        <p>{this.props.data.name} = {this.props.data.value} </p>
        </div>
    );
    }
}
