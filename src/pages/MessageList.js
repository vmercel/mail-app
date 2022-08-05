import React, { useState, useEffect, Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { Message } from '../components/Message.js';
import { getMessagesByOwner } from '../services/MessageService.js';
import { SearchBar } from "react-native-elements";
import { auth, db } from "../config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";




const Item = ({ dat, navigation }) => {
    return (
        
  <Card style={styles.card}>
  <Card.Content>
      <Title style={styles.container}>{dat.subject}</Title>
  <Paragraph>{dat.content}</Paragraph>
  </Card.Content>
  <Card.Actions>
    <Button style={styles.container}  onPress={() => navigation.navigate('Details')}>See Details</Button>
  </Card.Actions>
  </Card>
  
    );
  };

    const renderItem = ({ item }) => < Item dat = { item }
        onPress = {
            () => {
                navigation.navigate('HomeStack', {screen:'MessageDetails'}, {
                    messageId: item.id,
                })
            }
        }
/>;


export default function MessageList({route, navigation }) {
const {mOwner} = route.params;
const DATA = getMessagesByOwner(mOwner);
console.log(DATA)
    function renderMessage({ item: message }) {
        return ( <Message {...message }
                    onPress = {
                        () => {
                            navigation.navigate('Details',{messageId: message.id.toString()});
                        }
                    }
            />
        );
    }

class MySearchBar extends Component {
    
        constructor(props) {
            super(props);
            this.state = {
                loading: false,
                data: DATA,
                error: null,
                searchValue: "",
            };
            this.arrayholder = DATA;
        }


        
        searchFunction = (text) => {
            const updatedData = this.arrayholder.filter((item) => {
                const item_data = `${item.subject.toUpperCase()})`;
                const text_data = text.toUpperCase();

                const dats = item_data.indexOf(text_data) > -1;
                console.log(dats);
                return dats;
            });
            this.setState({ data: updatedData, searchValue: text });
        };
        render() {
            return ( 
            <>
                <View style = { styles.container } >
                <SearchBar placeholder = "Search Here..."
                lightTheme round value = { this.state.searchValue }
                onChangeText = {
                    (text) => this.searchFunction(text) }
                autoCorrect = { false }
                /> 
                </View> 
                <FlatList style = { styles.messageList }
                contentContainerStyle = { styles.messageListContainer }
                keyExtractor = {
                    (item) => item.id.toString() }
                data = { this.state.data }
                renderItem = { renderMessage }
                /> 
            </>
            )
        }
    }



    return ( 
        <MySearchBar/> 
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 1,
        marginVertical: 20,
    },
    thumb: {
        height: 260,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
    },
    infoContainer: {
        padding: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    messageList: {
        backgroundColor: '#eeeeee',
    },
    messageListContainer: {
        backgroundColor: '#eeeeee',
        paddingVertical: 8,
        marginHorizontal: 8,
    },
});