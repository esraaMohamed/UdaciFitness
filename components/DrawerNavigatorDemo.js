import React from 'react'
import {View, StyleSheet, Platform, Text, TouchableOpacity} from 'react-native'
import {DrawerNavigator} from 'react-navigation'
import {FontAwesome, Ionicons} from '@expo/vector-icons'

const Home = ({navigation}) => (
    <View>
        <Text>This is the Home View</Text>
        <TouchableOpacity
            onPress={() => navigation.navigate('DrawerOpen')}>
            <Text>Open Drawer</Text>
        </TouchableOpacity>
    </View>
)

const Dashboard = () => (
    <View>
        <Text>Dashboard</Text>
        <TouchableOpacity
            onPress={() => navigation.navigate('DrawerOpen')}>
            <Text>Open Drawer</Text>
        </TouchableOpacity>
        <Text>This is the Dashboard</Text>
    </View>
)

const Drawer = DrawerNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: () => <FontAwesome name='home'
                                           size={20}
                                           color='red'/>
        }
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            drawerLabel: 'Dashboard',
            drawerIcon: () => <FontAwesome name='dashboard'
                                           size={20}
                                           color='red'/>
        }
    }
})

class DrawerNavigatorDemo extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Drawer/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default DrawerNavigatorDemo