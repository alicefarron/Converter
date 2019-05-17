import React from 'react';
import { Text } from 'react-native';

import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './styles';

const LastConvertedText = ({ date, base, conversionRate, quote }) => {
    let conversionString = `Актуальный курс на ${moment(date).format('MMMM D, YYYY')}`
    return (
        <Text style={styles.smallText}>{conversionString}</Text>
    )
}

LastConvertedText.propTypes = {
    date: PropTypes.object,
    base: PropTypes.string,
    quote: PropTypes.string,
    conversionRate: PropTypes.number
};

export default LastConvertedText;
