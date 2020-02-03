import React from 'react'
import {View, TouchableOpacity, Text, Platform, StyleSheet} from 'react-native'
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from "../utils/helpers";
import UdacitySlider from "./UdacitySlider";
import UdacitySteppers from "./UdacitySteppers";
import DateHeader from "./DateHeader";
import {Ionicons} from '@expo/vector-icons';
import TextButton from "./TextButton";
import {removeEntry, submitEntry} from "../utils/api";
import {connect} from 'react-redux'
import {addEntry} from "../actions";
import {purple, white} from "../utils/color";
import { NavigationActions } from "react-navigation";

const SubmitBtn = ({onPress}) => {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends React.Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    };

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);
        this.setState((state) => {
            const count = state[metric] + step;
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    };

    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step;
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    };

    slide = (metric, value) => {
        this.setState({
            [metric]: value
        })
    };

    submit = () => {
        const key = timeToString()
        const entry = this.state
        this.setState({
            run: 0,
            bike: 10,
            swim: 0,
            sleep: 0,
            eat: 5,
        })
        // Update redux
        this.props.dispatch(addEntry({
            [key]: entry
        }));
        //Navigate to home
        this.toHome()
        //Save to DB (Async storage)
        submitEntry({entry, key})
        // Clear local notification
    }

    reset = () => {
        const key = timeToString()
        // Update Redux
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))
        // Route to home
        this.toHome()
        // update DB
        removeEntry(key)
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddEntry'
        }))
    }

    render() {
        const metaInfo = getMetricMetaInfo()
        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-happy': 'md-happy'}
                        size={100}
                    />
                    <Text>You already logged your information for today</Text>
                    <TextButton style={{padding: 10}} onPress={this.reset}>Reset</TextButton>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map(
                    (key) => {
                        const {getIcon, type, ...rest} = metaInfo[key]
                        const value = this.state[key]
                        return (
                            <View key={key} style={styles.row}>

                                {getIcon()}
                                {type === 'slider'
                                    ? <UdacitySlider value={value}
                                                     onChange={(value) => this.slide(key, value)}
                                                     {...rest}
                                    />
                                    : <UdacitySteppers
                                        value={value}
                                        onIncrement={() => this.increment(key)}
                                        onDecrement={() => this.decrement(key)}
                                        {...rest}/>}
                            </View>
                        )
                    }
                )}
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginRight: 40,
        marginLeft: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30
    }
})

const mapStateToProps = (state) => {
    const key = timeToString()
    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry)