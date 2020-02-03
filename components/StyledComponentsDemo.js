import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import styled from 'styled-components/native'

const CenterView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background: #333;
`

const WelcomeText = styled.Text`
    color: white;
    font-size: 20;
`

const WelcomeBtn = styled.TouchableOpacity`
    width: 100px;
    height: 100px;
    background: red;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`

class StyledComponentsDemo extends React.Component {
    render() {
        return (
            <CenterView>
                <WelcomeText>Hello</WelcomeText>
                <WelcomeBtn
                    onPress={() => alert('Hello')}>
                    <WelcomeText>Push me!</WelcomeText>
                </WelcomeBtn>
            </CenterView>
        )
    }
}

export default StyledComponentsDemo