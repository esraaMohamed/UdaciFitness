import React from 'react';
import {Text, View, StyleSheet} from 'react-native'

export default class StylingComponent extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Hello!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'red'
    }
})