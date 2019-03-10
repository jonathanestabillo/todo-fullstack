import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
});

const Layout = props => (
  <View style={styles.container}>
    <Header />
    <Content {...props} />
    <Footer />
  </View>
);

export default Layout;