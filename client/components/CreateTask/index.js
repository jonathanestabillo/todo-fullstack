import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  ct_card_container: {
    height: '25%',
  },
  ct_button: {
    backgroundColor: '#f15786',
    width: 32,
  },
  ct_input: {
      flex: 1,
      flexDirection: 'row',
      width: '90%',
  }
});

const btnCreateTask = <Icon name="plus" size={15} color="white" />

class CreateTask extends Component {
  render() {
    return (
        <Card title="LET'S DO THIS!" containerStyle={styles.ct_card_container}>
          <Text>To get started, add some items to your list:</Text>
          <View style={styles.ct_input}>
            <Input placeholder='I want to do...' />
            <Button icon={btnCreateTask} buttonStyle={styles.ct_button}/>
          </View>
        </Card>
    );
  }
}

export default CreateTask;