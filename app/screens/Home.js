import React, { Component } from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConvertedText } from '../components/AppText';
import { AppHeader } from '../components/Headers';
import { connectAlert } from '../components/Alerts';

import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';


class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        amount: PropTypes.number,
        conversionRate: PropTypes.number,
        lastConversionDate: PropTypes.object,
        isFetching: PropTypes.bool,
        primaryColor: PropTypes.string,
        alertWithType: PropTypes.func,
        currencyError: PropTypes.string
    };

    componentWillMount = () => {
        this.props.dispatch(getInitialConversion());
    };

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.currencyError && nextProps.currencyError !== this.props.currencyError) {
            this.props.alertWithType('error', 'Error', nextProps.currencyError);
        }
    };

    handlePressBaseCurrency = () => {
        this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' } )        
    };

    handlePressQuoteCurrency = () => {
        this.props.navigation.navigate('CurrencyList', { title: 'Выберите валюту', type: 'quote' } )        
    };

    handlePressThreeCurrency = () => {
        this.props.navigation.navigate('CurrencyList', { title: 'Выберите валюту', type: 'quote' } )        
    };

    handleTextChange = (amount) => {
        this.props.dispatch(changeCurrencyAmount(amount));
    };

    handleSwapCurrency = () => {
        console.log(this.props)
        this.props.dispatch(swapCurrency());
    };

    handleOptionsPress = () => {
        this.props.navigation.navigate('Options', { title: 'Настройки' } )        
    };

    render() { 
        let quotePrice;
        if (this.props.isFetching) {
            quotePrice = '...';
        } else {
            quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
        }

        return (
            <Container backgroundColor={this.props.primaryColor}>
                <StatusBar translucent={false} barStyle='light-content' />
                <AppHeader onPress={this.handleOptionsPress}/>
                <KeyboardAvoidingView behavior="padding">
                    <Logo tintColor={this.props.primaryColor}/>
                    <InputWithButton 
                        buttonText={this.props.baseCurrency}
                        defaultValue={this.props.amount.toString()}
                        keyboardType="numeric"
                        onChangeText={this.handleTextChange}
                        textColor={this.props.primaryColor}
                    />
                    <InputWithButton 
                        buttonText={this.props.quoteCurrency}
                        onPress={this.handlePressQuoteCurrency}
                        editable={false}
                        value={quotePrice}
                        textColor={this.props.primaryColor}
                    />
                    <LastConvertedText 
                        date={this.props.lastConversionDate} 
                        conversionRate={this.props.conversionRate} 
                        base={this.props.baseCurrency} 
                        quote={this.props.quoteCurrency} />
                </KeyboardAvoidingView>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const baseCurrency = state.currencies.baseCurrency;
    const quoteCurrency = state.currencies.quoteCurrency;
    const conversionSelector = state.currencies.conversions[baseCurrency] || {};
    const rates = conversionSelector.rates || {};
    return {
        baseCurrency: baseCurrency,
        quoteCurrency: quoteCurrency,
        amount: state.currencies.amount,
        conversionRate: rates[quoteCurrency] || 0,
        lastConversionDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
        isFetching: conversionSelector.isFetching,
        primaryColor: state.themes.primaryColor,
        currencyError: state.currencies.error,
    }
};

export default connect(mapStateToProps)(connectAlert(Home));
