import React, { Component } from 'react';

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
    }
    
    render() {
        return (
            <form className="search" onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" />
            </form>
        );
    }
}

export default Search;
