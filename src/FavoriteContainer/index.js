import React, {Component} from 'React';
import FavoriteList from '../FavoriteList';
import '../App.css';

class FavoriteContainer extends Component {
  constructor() {
    super();

    this.state = {
      favParks: [], 
      userId: '',
      loading: true
    }
  }

  componentDidMount(){
    this.getfav();
  }
  // addFav = async (fav, e) => {
  //   e.preventDefault(); // prevent the page from refreshing
  //   console.log(fav, e, ' inside of addFav')

  //   try {
  //     const createFav = await fetch('http://localhost:9000/api/v1/favorite',{
  //       method: 'POST',
  //       credentials: 'include',
  //       body: JSON.stringify(fav),
  //       headers: {
  //         'Content-Type': 'application/json' // lets our server (express app)

  //         // know that the contents of the request is json
  //       }
  //     })
  //     console.log(createFav, "<createFavfetch")
  //     if(createFav.status !== 200){
  //       // from the fetch request itself seeing if its a successful request

  //       throw Error('Resource not found')
  //     }

  //     const createFavResponse = await createFav.json();
  //     console.log(createFavResponse.data, ' createFavResponse');
  //     // we only want to add the favorite to the park array, if it has
  //     // its mongo id, and it should because thats what are express
  //     // api is sending back
  //     this.setState({
  //       favs: [...this.state.favs, createFavResponse.data]
  //     })


  //   } catch(err) {
  //     console.log(err, ' addFav');
  //     return err
  //   }
  // }



  // getFavs = async () => {

  //   try {

  //     const responseGetFavs = await fetch('http://localhost:9000/api/v1/favorite', {
  //       credentials: 'include',
  //       method: 'GET'
  //     });

  //     console.log(responseGetFavs, ' responseGetParks')

  //     if(responseGetFavs.status !== 200){
  //       // before we parse

  //       // fetch won't reject a 404
  //       // throw error ends the try and sends
  //       // the error to the catch
  //       throw Error('404 from server');
  //     }

  //     // parse the json from a string into a js object we
  //     // can manipulate
  //     const favsResponse = await responseGetFavs.json();
  //     // in the browser console
  //     console.log(favsResponse, ' favsResponse <')

  //     this.setState({
  //       favs: [...favsResponse.data]
  //     });


  //   } catch(err){
  //     console.log(err, ' getFavs errors');
  //     return err
  //   }


  // }
  
  // deleteFav = async (id) => {
  //   console.log(id, ' delete fav ID')

  //   try {

  //     const deleteFav = await fetch('http://localhost:9000/api/v1/favorite/' + id, {
  //       method: 'DELETE',
  //       credentials: 'include'
  //     });

  //     if(deleteFav.status !== 200){
  //       throw Error('Something happened on delete')
  //     }

  //     // this object is the actual response from the api
  //     const deleteFavJson = await deleteFav.json();

  //     this.setState({
  //       favs: this.state.favs.filter((fav) => fav._id !== id)
  //     })

  //   } catch(err){
  //     console.log(err);
  //     return err
  //   }
  // }
  render(){
    console.log(this.state, "<-- state in render");
    return (
      <div className='favorite-container'>
      <h3>This is the favorite container</h3>
        <FavoriteList favoriteData={this.state} />
        
      </div>
      )
  }
}

export default FavoriteContainer;
