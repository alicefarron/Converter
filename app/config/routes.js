import { StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: () => null
            }
        },
        Options: {
            screen: Options,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title
            }),
        },
        Themes: {
            screen: Themes,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title
            }),
        }
    }, 
    {
        headerMode: 'screen',
        defaultNavigationOptions: {
            headerTitleStyle: {
                flex: 1,
                textAlign: 'left'
            },
            headerStyle: {
//                backgroundColor: '#F4511E'
            }
        }
    }
)

const CurrencyListStack = createStackNavigator(
    {
        CurrencyList: {
            screen: CurrencyList,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title
            }),
        }
    },
    {
        defaultNavigationOptions: {
            mode: 'modal',
            headerMode: 'none',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'left'
            },
        }
    }
)

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeStack,
        },
        CurrencyList: {
            screen: CurrencyListStack,
        }
    }, 
    {
        mode: 'modal',
        headerMode: 'none',
        defaultNavigationOptions: {
            headerTitleStyle: {
                flex: 1,
                textAlign: 'left'
            }
        }
    }
);

export default createAppContainer(AppNavigator);
