import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('screen').width;
const btnSave = <Icon name="save" size={15} color="white" />
const btnCancel = <Icon name="close" size={15} color="white" />

const styles = StyleSheet.create({
  fe_btn_1: {
    backgroundColor: '#2d3f51',
    width: 32,
    marginRight: 3,
    marginLeft: 3,
  },
  fe_btn_2: {
    backgroundColor: '#e74d3d',
    width: 32,
    marginRight: 5,
  },
  fe_form: {
    flexDirection: 'row',
    width: width - 30,
    marginTop: 20,
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 80,
  },
});

export default class FormEdit extends Component {
  static propTypes = {
    item: PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
    handleEditItem: PropTypes.func.isRequired,
    handleCancelEditItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      itemValue: props.item.value,
    };
  }

  handleItemChange = (value) =>
    this.setState({
      itemValue: value,
    });

  handleEditAndResetForm = () => {
    this.props.handleEditItem({
      ...this.props.item,
      value: this.state.itemValue,
    }, this.props.gqlClient);

    // Reset value
    return this.setState({ itemValue: '' });
  };

  render() {
    return (
      <TouchableOpacity
        onLongPress={this.props.move}
        onPressOut={this.props.moveEnd}
      >
        <View style={styles.fe_form}>
          <Input placeholder='You should have something here...'
            value={this.state.itemValue}
            onChangeText={this.handleItemChange}
            containerStyle={{ flex: 1, alignSelf: 'center' }}
            autoFocus={true}
          />
          <Button icon={btnSave} buttonStyle={styles.fe_btn_1} onPress={this.handleEditAndResetForm} containerStyle={{ alignSelf: 'center' }} />
          <Button icon={btnCancel} buttonStyle={styles.fe_btn_2} onPress={this.props.handleCancelEditItem} containerStyle={{ alignSelf: 'center' }} />
        </View>
      </TouchableOpacity>
    );
  }
}
