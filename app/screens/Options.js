import React, { Component } from 'react';
import { ScrollView, StatusBar, Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
        
import { ListItem, Separator } from '../components/List';
import { connectAlert } from '../components/Alerts';

const ICON_COLOR = '#868686';
const ICON_SIZE = 23;
const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';

class Options extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        alertWithType: PropTypes.func
    };

    handleThemesPress = () => {
        this.props.navigation.navigate('Themes', { title: 'Тема' } )
    };

    handleSitePress = () => {
        Linking.openURL('https://api.exchangeratesapi.io/latest').catch(() => {
            this.props.alertWithType('error')
        })
    };

    render() {
        return (
            <ScrollView>
                <StatusBar translucent={false} barStyle="default" />
                <ListItem
                    text="Выбор темы"
                    customIcon={
                        <Ionicons name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE} />
                    }
                    onPress={this.handleThemesPress} />
                <Separator />
                <ListItem
                    text="API"
                    customIcon={
                        <Ionicons name={`${ICON_PREFIX}-link`} color={ICON_COLOR} size={ICON_SIZE} />
                    }
                    onPress={this.handleSitePress} />
                <Separator />
            </ScrollView>
        )
    }
}

export default connectAlert(Options);
