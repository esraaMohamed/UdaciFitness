import React from 'react'
import {View, Text, StyleSheet, ImageEditor, TouchableOpacity, Image, Platform} from 'react-native'
import Permissions from 'expo-permissions'
import ImagePicker from "expo-image-picker";

class ImagePickerDemo extends React.Component {
    state = {
        image: null
    }
    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
    }
    getPermissionAsync = async () => {
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    pickImage = () => {
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [2, 1]
        }).then(result => {
            if (result.cancelled) {
                return
            }
            ImageEditor.cropImage(result, uri, {
                    offset: {x: 0, y: 0},
                    size: {width: result.width, height: result.height},
                    displaySize: {width: 200, height: 100},
                    resizeMode: 'contain'
                }, (uri) => {
                    this.setState({image: uri})
                }, () => console.log(Error)
            )
        })
    }

    render() {
        const {image} = this.state
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.pickImage}>
                    <Text>Open Camera Roll</Text>
                </TouchableOpacity>
                {image && (
                    <Image style={styles.image} src={{uri: image}}/>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        backgroundColor: 'black'
    }
})
export default ImagePickerDemo