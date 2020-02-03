import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'

const Home = ({navigation}) => (
    <View>
        <Text>This is the Home View</Text>
        <TouchableOpacity
            onPress={() => navigation.navigate('Dashboard')}>
            <Text>Press here for the Dashboard</Text>
        </TouchableOpacity>
    </View>
)

const Dashboard = () => (
    <View>
        <Text>This is the Dashboard</Text>
    </View>
)

const Stack = createStackNavigator({
    Home: {
        screen: Home
    },
    Dashboard: {
        screen: Dashboard
    }
})

class StackNavDemo extends React.Component {
    render(){
        return(
            <Stack/>
        )
    }
}

export default StackNavDemo