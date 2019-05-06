import React, {Component} from 'react';

export class MyLocation extends Component {

    constructor(){
        super()
        this.state = {
            latitude: 0.0,
            longitude: 0.0
        }
    }

    handleSaveLocationClick = () => {
        // send the location to the server
        fetch('http://localhost:8080/location', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: 'Hubot',
              login: 'hubot',
            })
          })

    }

    componentDidMount() {

        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }

                )
            })
          } else {
            /* geolocation IS NOT available */
          }
    }

    render() {

        return(
            <div>
                <button onClick={this.handleSaveLocationClick}>Use My Location</button>
            </div>
        )
    }
}