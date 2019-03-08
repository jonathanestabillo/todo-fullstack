import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  header_container: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#23aaaa',
  },
  header_span: {
    paddingTop: 50,
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

const myIcon = <Icon name="table" size={30} color="#fff" />;

const Header = () => {
  return (
    <View style={styles.header_container}>
        <Text style={styles.header_span}>{myIcon} TODO App</Text>
    </View>
  );
}

export default Header;
