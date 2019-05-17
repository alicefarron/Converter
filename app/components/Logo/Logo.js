import React, { Component } from 'react';
import { View, ImageBackground, Text, Keyboard, Animated, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { AppText } from '../../components/AppText';
import styles from './styles';

const ANIMATION_DURATION = 300;

class Logo extends Component {
    constructor(props) {
        super(props);

        this.containerImageWidth = new Animated.Value(styles.$largeContainerSize)
        this.imageWidth = new Animated.Value(styles.$largeImageSize)
    };
    
    static propTypes = {
        tintColor: PropTypes.string,
    };

    componentDidMount = () => {
        let showListener = 'keyboardWillShow';
        let hideListener = 'keyboardWillHide';
        if (Platform.OS === 'android') {
            showListener = 'keyboardDidShow';
            hideListener = 'keyboardDidHide';
        }
        this.keyboardShowListener = Keyboard.addListener(showListener, () => {
            Animated.parallel([
                Animated.timing(this.containerImageWidth, {
                    toValue: styles.$smallContainerSize,
                    duration: ANIMATION_DURATION
                }),
                Animated.timing(this.imageWidth, {
                    toValue: styles.$smallImageSize,
                    duration: ANIMATION_DURATION
                })
            ]).start();
        })
        this.keyboardHideListener = Keyboard.addListener(hideListener, () => {
            Animated.parallel([
                Animated.timing(this.containerImageWidth, {
                    toValue: styles.$largeContainerSize,
                    duration: ANIMATION_DURATION
                }),
                Animated.timing(this.imageWidth, {
                    toValue: styles.$largeImageSize,
                    duration: ANIMATION_DURATION
                })
            ]).start();
        })
    };

    componentWillUnmount = () => {
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    };

    render() {
        const containerImageStyles = [
            styles.containerImage,
            { width: this.containerImageWidth, height: this.containerImageWidth }
        ];
        const imageStyles = [
            styles.logo,
            { width: this.imageWidth },
            this.props.tintColor ? { tintColor: this.props.tintColor } : null
        ];
        return (
            <View style={styles.container}>
                <Animated.View style={containerImageStyles}>
                    <ImageBackground resizeMode='contain' style={styles.backgroundImage} source={require('./images/background.png')}>
                        <Animated.Image resizeMode='contain' style={imageStyles} source={require('./images/logo.png')} />
                    </ImageBackground>
                </Animated.View>
                <AppText style={[styles.title]}>Конвертер валют</AppText>
            </View>
        )
    }
}

export default Logo;
