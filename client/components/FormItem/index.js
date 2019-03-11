import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  fi_container: {
    flexDirection: 'row',
    width: width - 30,
    marginTop: 20,
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 80,
  },
  fi_btn_1: {
    backgroundColor: '#f15786',
    width: 32,
    marginRight: 3,
    marginLeft: 3,
  },
  fi_btn_2: {
    backgroundColor: '#f15786',
    width: 32,
    marginRight: 5,
  },
  fi_lbl: {
    flex: 1,
    fontSize: 17,
    justifyContent: 'center',
    paddingTop: 15,
    marginLeft: -15,
  },
});

const btnTrash = <Icon name="trash" size={15} color="white" />
const btnEdit = <Icon name="edit" size={15} color="white" />

export default class FormItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      value: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
    }),
    handleDeleteItem: PropTypes.func.isRequired,
    handleSelectEditItem: PropTypes.func.isRequired,
    handleItemCompletion: PropTypes.func.isRequired,
  };

  state = { displayMenu: false };

  setDisplayMenu = bool => {
    if (this.state.displayMenu !== bool) {
      this.setState({ displayMenu: bool });
    }
  };

  render() {
    return (
      <TouchableOpacity
        onLongPress={this.props.move}
        onPressOut={this.props.moveEnd}
      >
        <View style={styles.fi_container}>
          <CheckBox
            size={32}
            containerStyle={{ alignSelf: 'center', }}
            onIconPress={() => (this.props.handleItemCompletion(this.props.item, this.props.gqlClient))}
            checked={this.props.item.completed} />
          <Text style={{ flex: 1, textAlignVertical: 'center', fontSize: 16,}} numberOfLines={1}>{this.props.item.label}</Text>
          <Button
            icon={btnEdit}
            buttonStyle={styles.fi_btn_1}
            onPress={() => (this.props.handleSelectEditItem(this.props.item.id))}
            containerStyle={{ alignSelf: 'center', }} />
          <Button
            icon={btnTrash}
            buttonStyle={styles.fi_btn_2}
            onPress={() => (this.props.handleDeleteItem(this.props.item.id, this.props.gqlClient))}
            containerStyle={{ alignSelf: 'center', }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}