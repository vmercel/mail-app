import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { logout, saveMessage } from '../config/firebase';


export default function SettingsScreen ({navigation}) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginTop: 50, fontSize: 30, fontWeight:'bold', fontColor:'red' }}>Settings!</Text>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
          <View>
          <Button
            onPress={() => navigation.navigate('HomeStack', {screen: "Home"})}
            title="  Home "
            color="#841584"
            accessibilityLabel="View Messages"
          />
          </View>
          <br/>
          <View>
          <Button
            onPress = { logout }
            title="Sign Out"
            color="#841584"
            accessibilityLabel="View Messages"
          />
        </View>
        <br/>
          <View>
          <Button
            onPress = {() =>  {saveMessage} }
            title="Save Messages"
            color="#841584"
            accessibilityLabel="View Messages"
          />
        </View>
        </View>
      </View>


    );
  
}
const styles = StyleSheet.create({
  Setting: {
    fontSize: 20
  }
});