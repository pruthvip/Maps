import React, {Component} from 'react';
import {TrackingMap} from './modules';


export default class App extends Component {
    constructor(props) {
        super(props);

        function getLatLng(lat,lng) {
            return {
                lat: lat,
                lng: lng
            }
        }

        this.state = {
            deliveryBoy: {
                lat: 12.986269, lng: 77.646646
            }
        };


        this.path = [
            getLatLng(12.987260, 77.648574),
            getLatLng(12.988117, 77.650527),
            getLatLng(12.989143, 77.652775),
            getLatLng(12.990497, 77.655700),
            getLatLng(12.992023, 77.658633),
            getLatLng(12.993650, 77.662199),
            getLatLng(12.989597, 77.663941),
            getLatLng(12.986288, 77.663855)
        ]
    }

    componentDidMount() {
        let i = 0;
        let interval = window.setInterval(()=> {
            if (!this.path[i]) {
                window.clearInterval(interval);
            }

            this.setState({
                deliveryBoy: this.path[i]
            });
            i++;
        }, 2000)
    }



    render() {

        const shop = {
            lat: 12.993650, lng: 77.662199
        };

        const customer = {
            lat: 12.986288, lng: 77.663855
        };

        return(
            <div>
                <h1>
                    Maps
                </h1>

                <TrackingMap
                    deliveryBoyLocation={this.state.deliveryBoy}
                    shopLocation={shop}
                    customerLocation={customer}
                />
            </div>
        );
    }

}

