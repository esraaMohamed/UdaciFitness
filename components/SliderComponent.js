import React from 'react'
import {View, StyleSheet, Text, Slider} from 'react-native'


class SliderComponent extends React.Component{
    state = {
        value: 0
    }
    render() {
        return (
            <View styles={styles.container}>
                <Slider
                    minimumValue={-10}
                    maximumValue={10}
                    step={1}
                    value={this.state.value}
                    onValueChange={(value) => this.setState({ value})}
                />
                <Text>
                    Value: {this.state.value}
                </Text>
            </View>
        )
    }
}

export default SliderComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center'
    }
})