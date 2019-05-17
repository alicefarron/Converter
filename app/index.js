import React from 'react';
import { Provider } from 'react-redux';
import { Font, Asset, AppLoading } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';

import { AlertProvider } from './components/Alerts';
import Home from './screens/Home';
import CurrencyList from './screens/CurrencyList';
import Options from './screens/Options';
import Navigator from './config/routes';
import store from './config/store';

EStyleSheet.build({
    $primary: '#4F6D7A',
    $primaryOrange: '#D57A66',
    $primaryGreen: '#00BD9D',
    $primaryPurple: '#95768F',
    $primaryText: '#FFF',
    $darkText: '#343434',
    $border: '#E2E2E2',
    $inputText: '#797979',
    $disabled: '#F0F0F0',
})

export default class App extends React.Component {
  state = {
    isReady: false,
    fontLoaded: false
  };

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
        <Provider store={store}>
            <AlertProvider>
                <Navigator onNavigationStateChange={null}/>
            </AlertProvider>
        </Provider>
    );
  }

  async _cacheResourcesAsync() {
    
    const fonts = [
        require('../assets/fonts/Roboto-Bold.ttf')
    ];

    const cacheFonts = fonts.map(font => {
        return Asset.fromModule(font).downloadAsync();
    })
    return Promise.all(cacheFonts)

  }
}

