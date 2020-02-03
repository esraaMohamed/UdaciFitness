import React from 'react'
import {View, StyleSheet, Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons';

class IconComponent extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios'
                    ? <Ionicons
                        name='ios-pizza'
                        size={100}
                        color='red'
                    />
                    : <Ionicons
                        name='md-pizza'
                        size={100}
                        color='red'
                    />
                }
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
export default IconComponent