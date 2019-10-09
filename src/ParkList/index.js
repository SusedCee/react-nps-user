import React from 'react';
import { Card, Icon, Button, Grid, Segment, Divider } from 'semantic-ui-react'
import '../App.css';

const ParkList = (props) => {
	console.log(props.parkData, 'props in park api')

	const favoriteSave = () => {
		//POST to api 
	}

	const parkListElements = props.parkData.data.map((park, index) => {
		console.log("props ", props.parkData)
		return (
			    <Grid.Column className="centered">
			      <Segment >
  					<div key={index} className="centered">
					    <h2 className="centered">{park.fullName} </h2>
					    <Divider />
					    <p className="row parkDescription">{park.description}</p>
					    <Divider />
					    
					    <Button  color="grey" href={park.url} target="_blank">More Info</Button> 
				    	
			  		</div>			  
			 	  </Segment>
				</Grid.Column>
			)
});

	return (
		
		<Grid stackable  columns={3}>
		
				{parkListElements}
	
		</Grid>
		
		)
};

export default ParkList;

//<Button  color="grey" onClick={favoriteSave()}>Save to Favorites</Button>

			//  <h2>This is the Park List</h2>

			//<li key={index}>
			//	<div>{park.fullName}</div>
			//	<div>{park.description}</div>
			//	<a href={park.url}>More Info</a> <br />
			//	<button onClick={favoriteSave()}>save</button>
			//</li>









			// <div key={index} className="ui card">
			// 	<div className="content"><div class="header">{park.fullName}</div></div>
			// 	<div className="content">
			// 		<div className="description">
			// 		{park.description}
			// 		</div>
			// 	</div>
			// 	<div className="extra content">
			// 		<link className="item" to={park.url}>More Info</link>
			// 	</div>
			// </div>