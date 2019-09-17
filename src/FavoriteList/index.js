import React from 'react';


const FavoriteList = (props) => {
	console.log(props.favData, 'props in favorite api')

	// const favoriteSave = () => {
	// 	//POST to api 
	// }

	// const favListElements = props.favData.data.map((park, index) => {
	// 	console.log("props ", props.parkData)
	// 	return (
	// 		<li key={index}>
	// 			<div>{park.fullName}</div>
	// 			<div>{park.description}</div>
	// 			<a href={park.url}>More Info</a> <br />
	// 			<button onClick={favoriteSave()}>save</button>
	// 		</li>
	// 		)
// });

	return (
		<div>
			<h2>This is the Park List</h2>
			<ul>
				
			</ul>
		</div>

		)
};

export default FavoriteList;


// {favListElements}