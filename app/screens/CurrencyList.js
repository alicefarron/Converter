import React, { Component } from 'react';
import { FlatList, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ListItem, Separator } from '../components/List';
import currencies from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';

const TEMP_CURRENT_CURRENCY = 'EUR';

class CurrencyList extends Component {
    static propTypes = {
        navigation: PropTypes.navigation,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        primaryColor: PropTypes.string,
    };

    handlePress = (currency) => {
        const { type } = this.props.navigation.state.params;
        if (type === 'base') {
            this.props.dispatch(changeBaseCurrency(currency));
        } else if (type === 'quote') {
            this.props.dispatch(changeQuoteCurrency(currency));
        };
        this.props.navigation.goBack(null);
    };

    render() {
        let compareCurrency = this.props.baseCurrency;
        if (this.props.navigation.state.params.type === 'quote') {
            compareCurrency = this.props.quoteCurrency;
        }
        return (
            <View style={{flex:1}}>
                <StatusBar barStyle="default" translucent={false} />
                <FlatList
                    data={currencies}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <ListItem 
                            text={item}
                            checkmark={true}
                            visible={true}
                            selected={item === compareCurrency}
                            onPress={() => this.handlePress(item)}
                            iconBackground={this.props.primaryColor}
                        />
                    )}
                    ItemSeparatorComponent={Separator}
                />
            </View>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        baseCurrency: state.currencies.baseCurrency,
        quoteCurrency: state.currencies.quoteCurrency,
        primaryColor: state.themes.primaryColor,
    }
};

export default connect(mapStateToProps)(CurrencyList);
