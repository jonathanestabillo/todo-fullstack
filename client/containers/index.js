import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import AppLayout from '../components/Layout';
import { AddItem } from '../actions/AddItem';
import { CancelEditItem } from '../actions/CancelEditItem';
import { DeleteItem } from '../actions/DeleteItem';
import { EditItem } from '../actions/EditItem';
import { ItemCompletion } from '../actions/ItemCompletion';
import { SelectEditItem } from '../actions/SelectEditItem';
import { LoadStateAsyncStorage } from '../actions/LoadStateAsyncStorage';
import { SaveStateAsyncStorage } from '../actions/SaveStateAsyncStorage';
import { ReorderItem } from '../actions/ReorderItem';

const appPropTypes = {
  handleAddItem: PropTypes.func.isRequired,
  handleCancelEditItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleEditItem: PropTypes.func.isRequired,
  handleItemCompletion: PropTypes.func.isRequired,
  handleSelectEditItem: PropTypes.func.isRequired,
  handleLoadStateAsyncStorage: PropTypes.func.isRequired,
  handleSaveStateAsyncStorage: PropTypes.func.isRequired,
  handleReorderItem: PropTypes.func.isRequired,
};

const gqlClient = new ApolloClient({
  link: new HttpLink({uri: 'http://192.168.1.5:4000/graphql'}),
  cache: new InMemoryCache()
});

class AppContainer extends Component {
  componentDidMount = () => this.props.handleLoadStateAsyncStorage(gqlClient);
  componentDidUpdate = () => this.props.handleSaveStateAsyncStorage(this.props.items);

  handleAddItem = (itemValue, gqlClient) => this.props.handleAddItem(itemValue, gqlClient);
  handleCancelEditItem = () => this.props.handleCancelEditItem();
  handleDeleteItem = (selectedItemId, gqlClient) => this.props.handleDeleteItem(selectedItemId, gqlClient);
  handleEditItem = (modifiedItem, gqlClient) => this.props.handleEditItem(modifiedItem, gqlClient);
  handleItemCompletion = (modifiedItem, gqlClient) => this.props.handleItemCompletion(modifiedItem, gqlClient);
  handleSelectEditItem = id => this.props.handleSelectEditItem(id);
  handleReorderItem = (initialPosition, newPosition) =>
    this.props.handleReorderItem(initialPosition, newPosition);

  render() {
    return <AppLayout {...this.props} />;
  }
}

const mapStateToProps = state => ({
  items: state.todos.items,
  editingItem: state.todos.editingItem,
  gqlClient: gqlClient,
});

const mapDispatchToProps = {
  handleAddItem: AddItem,
  handleCancelEditItem: CancelEditItem,
  handleDeleteItem: DeleteItem,
  handleEditItem: EditItem,
  handleItemCompletion: ItemCompletion,
  handleSelectEditItem: SelectEditItem,
  handleSaveStateAsyncStorage: SaveStateAsyncStorage,
  handleLoadStateAsyncStorage: LoadStateAsyncStorage,
  handleReorderItem: ReorderItem,
};

AppContainer.propTypes = appPropTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
