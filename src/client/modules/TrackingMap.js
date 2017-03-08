import React, {Component} from 'react';

let map;

window.google.maps.Marker.prototype.moveTo = function (newLatLng) {
    const duration = 1000;  // animate for 1 sec

    this.gg_startPostion__lat = this.getPosition().lat();
    this.gg__startPosition__lng = this.getPosition().lng();
    const newLatLng_lat = newLatLng.lat();
    const newLatLng_lng = newLatLng.lng();

    function moveAndAnimate (marker, startingTime) {
        const ellapsedTime = (new Date()).getTime() - startingTime;
        const increasingFactor = ellapsedTime / duration;

        // still inside the animation duration
        if (increasingFactor < 1) {
            const deltaPosition = new window.google.maps.LatLng(
                marker.gg_startPostion__lat + (newLatLng_lat - marker.gg_startPostion__lat) * increasingFactor,
                marker.gg__startPosition__lng + (newLatLng_lng - marker.gg__startPosition__lng) * increasingFactor
            );

            marker.setPosition(deltaPosition);

            // call recursively
            marker.gg__animation__handler = window.requestAnimationFrame(()=> {
                moveAndAnimate(marker, startingTime)
            });
        } else {
            // breaks the
            marker.setPosition(newLatLng);
        }
    }

    // to remove if any prev aniamtion is going on
    window.cancelAnimationFrame(this.gg__animation__handler);

    moveAndAnimate(this, (new Date()).getTime());
};

export default class TrackingMap extends Component {
    constructor(props) {
        super(props);

        this.markers = [];

        this.addMarkers = this.addMarkers.bind(this);
    }


    addMarkers (markerArray) {
        /**
         * Plot all the points
         */
        markerArray.forEach((point) => {
            this.markers.push((new window.google.maps.Marker({
                position: point,
                map: map,
            })))
        });
    }

    componentWillReceiveProps(newProps) {
        if (this.props.deliveryBoyLocation !== newProps.deliveryBoyLocation) {

            const deliveryBoyMarker = this.markers[1];

            // animate the delivery marker
            deliveryBoyMarker.moveTo(new google.maps.LatLng(newProps.deliveryBoyLocation));
        }
    }

    componentDidMount() {

        map = new window.google.maps.Map(document.getElementById('g-map'), {
            zoom: 14,
            center: this.props.shopLocation
        });

        // intital representation of the map
        const markerArray = [this.props.shopLocation, this.props.deliveryBoyLocation, this.props.customerLocation];

        this.addMarkers(markerArray);
    }

    render () {
        return(
            <div className="map" id="g-map">
            </div>
        );
    }

}

