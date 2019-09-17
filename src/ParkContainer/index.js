import React, { Component } from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import ParkList from '../ParkList'
import '../App.css'


class parkContainer extends Component {
  constructor() {
    super();

    this.state = {
      parkData: [], 
      loading: true
    }
  }

    componentDidMount = async () => {
      //this is the artist data from the API
      const response = await fetch(`https://developer.nps.gov/api/v1/parks?q=${this.state.searchTerm}&api_key=TbX6MzLaWLv2dpygTLkAZgZsZvlZO4VdG5dnJfLn`);
      console.log(response)
      // ${this.state.searchTerm}
      const json = await response.json();
      // console.log(json)
      this.setState({
        parkData: json, 
        loading: false   
      });
    }

    // this changes the state of the search 
    handleTermChange = (e) => {
      this.setState({[e.target.name] : e.target.value});
    }

    // function that allows the search function to work when enter is pressed
    handleSubmit = (e) => {
      if(e) {
        e.preventDefault();}
      this.setState({
        ready: false,
        onePark: this.state.searchTerm
      })
      this.componentDidMount();
    }



  render() {
    return (
    <div className="search-form gridParkList">
     <h2 className="searchTitle"> SEARCH PARKS BY KEYWORD </h2><br/>
      <Form onSubmit={this.handleSubmit}>
        <Input 
          className='searchInput'
          size='small' 
          icon='search' 
          type="text" 
          name="searchTerm" 
          id="IDK" focus
          placeholder="Search Parks..." 
          value={this.state.searchTerm} 
          onChange={this.handleTermChange}/>
        <Button className="mainButton" color="grey" >
          SUBMIT
        </Button>
      </Form>
      <br/>


{this.state.loading ? "Parks Loading..." : <ParkList parkData={this.state.parkData} />}
    </div>
    );
  }
};

export default parkContainer;












    // <div className="search-form">
    //   <div className="searchTitle"> SEARCH PARKS BY KEYWORD </div><br/>
    //   <Form onSubmit={this.handleSubmit}>
    //     <Input 
      //     size='small' 
      //     icon='search' 
      //     type="text" 
      //     className="searchTerm" 
      //     id="IDK" focus
      //     placeholder="Search Parks..." 
      //     value={this.state.searchTerm} 
      //     onChange={this.handleTermChange}/>
      //   <Button className="mainButton" color="grey" >
      //     SUBMIT
      //   </Button>
      // </Form>
      // <br/>


// {this.state.loading ? "Parks Loading..." : <ParkList parkData={this.state.parkData} />}
//     </div>








//<ParkList parks={this.state.parks} showModal={this.showModal} deletePark={this.deletePark}/>


//if i use the edit park put it right under <ParkList>
// {this.state.showEditModal ? <EditEmployee closeAndEdit={this.closeAndEdit} employeeToEdit={this.state.employeeToEdit} handleFormChange={this.handleFormChange}/> : null}