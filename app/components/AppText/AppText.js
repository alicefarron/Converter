import React from 'react';
import PropTypes from 'prop-types';
import { Text, ViewPropTypes } from 'react-native';

import styles from './styles';

const AppText = ({ style, children, ...props }) => {
  let newStyle;
  if (Array.isArray(style)) {
    newStyle = [styles.text, ...style];
  } else {
    newStyle = [styles.text, style];
  }

  return (
     <Text {...props} style={newStyle}>
       {children}
     </Text>
  );
};

AppText.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
};

AppText.defaultProps = {
  style: {},
};

export default AppText;
