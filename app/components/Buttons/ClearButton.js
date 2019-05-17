import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { AppText } from '../../components/AppText';

import styles from './styles';

const ClearButton = ({ text, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.wrapper}>
            <Image resizeMode="contain" style={styles.icon} source={require('./images/icon.png')} />
            <AppText style={styles.text}>{text}</AppText>
        </View>
    </TouchableOpacity>
);

ClearButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func
};

export default ClearButton;
