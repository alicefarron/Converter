import React, { Component } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

import { ListItem, Separator } from '../components/List';
import { changePrimaryColor } from '../actions/themes';

const styles = EStyleSheet.create({
    $blue: '$primary',
    $green: '$primaryGreen',
    $orange: '$primaryOrange',
    $purple: '$primaryPurple'
});

class Themes extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
    };

    handleThemePress = (color) => {
        this.props.dispatch(changePrimaryColor(color))
        this.props.navigation.goBack(null);        
    };

    render() {
        return (
            <ScrollView>
                <StatusBar translucent={false} barStyle="default" />
                <ListItem
                    text="Blue" 
                    iconBackground={styles.$blue}
                    selected
                    checkmark={false}
                    onPress={() => this.handleThemePress(styles.$blue)}
                />
                <Separator />
                <ListItem
                    text="Orange" 
                    iconBackground={styles.$orange}
                    selected
                    checkmark={false}
                    onPress={() => this.handleThemePress(styles.$orange)}
                />
                <Separator />
                <ListItem
                    text="Green" 
                    iconBackground={styles.$green}
                    selected
                    checkmark={false}
                    onPress={() => this.handleThemePress(styles.$green)}
                />
                <Separator />
                <ListItem
                    text="Purple" 
                    iconBackground={styles.$purple}
                    selected
                    checkmark={false}
                    onPress={() => this.handleThemePress(styles.$purple)}
                />
                <Separator />
            </ScrollView>
        )
    };
};

export default connect()(Themes);
