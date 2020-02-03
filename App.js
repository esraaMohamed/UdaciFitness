import React from 'react';
import {
    View, Platform, StatusBar
} from 'react-native';
import AddEntry from "./components/AddEntry";
import {createStore} from "redux";
import {Provider} from 'react-redux'
import reducer from './reducers'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack";
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {gray, purple, white} from "./utils/color";
import CalendarHistoryComponent from "./components/CalendarHistoryComponent";
import Constants from "expo-constants";
import EntryDetail from "./components/EntryDetail";
import Live from "./components/Live";

export const UdaciStatusBar = ({backgroundColor, ...props}) => {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

const RouteConfigs = {
    History: {
        screen: CalendarHistoryComponent,
        navigationOptions: {
            tabBarLabel: "History",
            tabBarIcon: ({tintColor}) => <Ionicons
                name='ios-bookmarks' size={30} color={tintColor}/>
        }
    },
    AddEntry: {
        screen: AddEntry,
        navigationOptions: {
            tabBarLabel: "Add Entry",
            tabBarIcon: ({tintColor}) => <FontAwesome
                name='plus-square' size={30} color={tintColor}/>
        }
    },
    Live: {
        screen: Live,
        navigationOptions: {
            tabBarLabel: 'Live',
            tabBarIcon: ({tintColor}) => <Ionicons
                name='ios-speedometer' size={30} color={tintColor}/>
        }
    }
}


const TabNavigatorConfig = {
    navigationOptions: {
        header: null,
    },
    accessibilityRole: 'label',
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        inactiveTintColor: Platform.OS === 'ios' ? gray : white,
        accessibilityRole: 'header',
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
};

const Tabs =
    Platform.OS === "ios"
        ? createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig)
        : createMaterialBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

const MainNavigator = createStackNavigator({
        Home: {
            screen: Tabs
        },
        EntryDetail: {
            screen: EntryDetail,
            navigationOptions: {
                headerTintColor: white,
                headerStyle: {
                    backgroundColor: purple
                }
            }
        }
    }
)

const TabNav = createAppContainer(MainNavigator)

class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
                    <TabNav/>
                </View>
            </Provider>
        )
    }
}

export default App;

