/*
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar, Image } from 'react-native';


class ViewBusinessContainer extends Component {

    constructor() {
        super(props);

        this.state = {
            id= ,
            name:'',
            twitter:'',
            facebook:'',
            instagram: '',
            website:'',
            sworkingHours:'',
            eworkingHours:'',
            workingDays:'',
            address:'',
            country:'',
            city:'',
            zip:'',
            timeRestriction:''
        }
    }

    componentWillMount() {
        this.getBusiness();
    }

    getBusiness() {
        let permission = await Permissions.askAsync(Permissions.LOCATION);
        if (permission.status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});

            WeatherService.getWeather(location.coords.latitude, location.coords.longitude).then((weatherData) => {
                this.setState({
                    location: {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude,
                    },
                    weather: WeatherService.format(weatherData)
                });
            });
        }
    }

    renderLocation(location) {
        if (!location) {
            return (
                <View style={styles.weatherBanner}>
                    <ActivityIndicator />
                    <Text>Getting your location...</Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.weatherBanner}>
                    <Text>{'Latitude: ' + location.lat + ', Longitude: ' + location.lng}</Text>
                </View>
            );
        }
    }

    renderWeather() {
        if (this.state.weather) {
            return (
                <View style={styles.weather}>
                    <Image source={{ uri: this.state.weather.iconUrl }} style={styles.weatherIcon} />
                    <Text style={styles.weatherDescription}>{this.state.weather.description}</Text>
                </View>
            );
        }
    }

    renderUmbrella() {
        return (
            <View style={styles.umbrellaWrapper}>
                <Image style={styles.umbrella} source={require('./umbrella.png')} />
            </View>
        );
    }

    render() {

        const showUmbrella = this.showUmbrella()

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                {this.renderLocation(this.state.location)}
                {showUmbrella ? null : this.renderWeather()}
                {showUmbrella ? this.renderUmbrella() : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    }
});*/
