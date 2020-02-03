import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    FlatList
} from 'react-native'
import getReviews from '../utils/reviews'

const Review = ({name, text, avatar}) => {
    return (
        <View>
            <Image
                source={{uri: avatar}}
                style={styles.avatar}/>
                <View style={{flex: 1, flexWrap:'wrap'}}>
                    <Text style={{fontSize: 20}}>{name}</Text>
                    <Text>{text}</Text>
                </View>
        </View>
    )
}

export default class  ListReview extends React.Component {
    renderItem = ({item}) => {
        return <Review {...item}/>
    }
    render() {
        const reviews = getReviews();
        return (
            <View style={styles.container}>
                <FlatList data={reviews} renderItem={this.renderItem}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    }
})