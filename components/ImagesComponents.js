import React from 'react'
import {
    View, Image, StyleSheet
} from 'react-native'

export default class ImagesComponents extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                style={styles.img}
                source={require('../utils/reactRedux.jpeg')}
                />
                <View style={{margin: 50}}>
                    <Image
                        style={styles.img}
                        source={{uri: 'https://tylermcginnis.com/tylermcginnis_glasses-300.png'}}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50
    }
})