import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import CreateTask from '../CreateTask';

const styles = StyleSheet.create({
  content_container: {
    flex: 0.75,
    alignItems: 'center',
    width: '100%',
  },
});

class Content extends Component {
  render() {
    return (
      <View style={styles.content_container}>
        <CreateTask />
      </View>
    );
  }
}

export default Content;
