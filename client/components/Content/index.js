import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist'
import PropTypes from 'prop-types';

import Form from '../Form';
import FormItem from '../FormItem';
import FormEdit from '../FormEdit';

const styles = StyleSheet.create({
  content_container: {
    flex: 0.82,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  draggable_list:{
    flex:0.7,
    marginTop: 20,
  }
});

class Content extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    editingItem: PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.string,
      completed: PropTypes.bool,
    }),
    handleAddItem: PropTypes.func.isRequired,
    handleCancelEditItem: PropTypes.func.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    handleEditItem: PropTypes.func.isRequired,
    handleItemCompletion: PropTypes.func.isRequired,
    handleSelectEditItem: PropTypes.func.isRequired,
    handleReorderItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
    editingItem: {},
  };

  state = {
    data: [],
  }

  onDragEnd = result => {
    this.props.handleReorderItem(result);
    this.setState({ result });
  };

  renderItem = (renderItemsArgs) => {
    const { item, move, moveEnd } = renderItemsArgs;

    if (this.props.editingItem.id === item.id) {
      return (
        <FormEdit
          item={this.props.editingItem}
          handleEditItem={this.props.handleEditItem}
          handleCancelEditItem={this.props.handleCancelEditItem}
          gqlClient={this.props.gqlClient}
        />
      );
    } else {
      return (
        <FormItem
          item={item}
          handleDeleteItem={this.props.handleDeleteItem}
          handleSelectEditItem={this.props.handleSelectEditItem}
          handleItemCompletion={this.props.handleItemCompletion}
          move={move}
          moveEnd={moveEnd}
          gqlClient={this.props.gqlClient}
        />
      );
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      data: nextProps.items.map((task, index) => ({
        key: `item-${index}`,
        id: task.id,
        label: task.value,
        completed: task.completed,
        value: task.value,
      }))
    })
  }

  render() {
    return (
      <View style={styles.content_container}>
        <Form handleAddItem={this.props.handleAddItem} gqlClient={this.props.gqlClient} />
        <DraggableFlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          scrollPercent={5}
          onMoveEnd={this.onDragEnd}
          style={styles.draggable_list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default Content;
