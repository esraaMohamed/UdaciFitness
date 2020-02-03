import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Switch,
    TextInput,
    Image,
    KeyboardAvoidingView
} from 'react-native'

export default class FormComponents extends React.Component {
    state = {
        input: '@tylermcginnis',
        showInput: false
    }
    handleToggleSwitch = () => {
        this.setState({
            showInput: !this.state.showInput
        })
    }
    handleTextChange = (input) => {
        this.setState({
            input
        })
    }

    render() {
        const {input, showInput} = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Image
                source={{uri: 'https://tylermcginnis.com/tylermcginnis_glasses-300.png'}}
                style={styles.img}
                />
                <Switch
                    value={showInput}
                    onValueChange={this.handleToggleSwitch}
                />
                {showInput === true && (
                    <TextInput
                        value={input}
                        stype={styles.input}
                        onChangeText={this.handleTextChange}
                    />
                )}
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        backgroundColor: '#ecf0f1'
    },
    input: {
        width: 200,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: '#757575',
        margin: 50
    },
    img: {
        width: 100,
        height: 100,
        margin: 50
    }
})