import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  add_form_container: {
    flex: 0.3,
  },
  add_form_card: {
    flex: 1,
    flexDirection: 'column',
  },
  add_form: {
    flexDirection: 'row',
  },
  add_form_button: {
    backgroundColor: '#f15786',
    width: 32,
  },
});

const btnCreateTask = <Icon name="plus" size={15} color="white" />

export default class Form extends Component {
  static propTypes = {
    handleAddItem: PropTypes.func.isRequired,
  };

  state = { itemValue: '' };

  handleSubmitAndResetForm = ev => {
    this.props.handleAddItem(this.state.itemValue, this.props.gqlClient);

    // Reset value
    return this.setState({
      itemValue: '',
    });
  };

  handleItemChange = value => {
    this.setState({
      itemValue: value,
    });
  }

  render() {
    return (
      <View style={styles.add_form_container}>
        <Card title="LET'S DO THIS!" style={styles.add_form_card}>
          <Text>To get started, add some items to your list:</Text>
          <View style={styles.add_form}>
            <Input placeholder='I want to do...' value={this.state.itemValue} onChangeText={this.handleItemChange} containerStyle={{width:'90%'}} />
            <Button icon={btnCreateTask} buttonStyle={styles.add_form_button} onPress={this.handleSubmitAndResetForm} />
          </View>
        </Card>
      </View>
    );
  }
}
