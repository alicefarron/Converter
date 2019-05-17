import React from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import color from 'color';
import { AppText } from '../../components/AppText';

import styles from './styles';

const InputWithButton = (props) => {
    const underlayColor = color(styles.$buttonBackgroundColorBase).darken(styles.$buttonBackgroundColorModifier);
    const containerStyles = [styles.container];
    const buttonTextStyles = [styles.buttonText]
    if (props.editable === false) {
        containerStyles.push(styles.containerDisabled)
    }
    if (props.textColor) {
        buttonTextStyles.push({ color: props.textColor });
    };
    return (
        <View style={containerStyles}>
            <TouchableHighlight onPress={props.onPress} style={styles.buttonContainer} underlayColor={underlayColor}>
                <AppText style={buttonTextStyles}>{props.buttonText}</AppText>
            </TouchableHighlight>
            <View style={styles.border} />
            <TextInput style={styles.input} {...props} underlineColorAndroid="transparent" />
        </View>
    )
}

InputWithButton.propTypes = {
    onPress: PropTypes.func,
    buttonText: PropTypes.string,
    editable: PropTypes.bool,
    textColor: PropTypes.string
};

export default InputWithButton;
