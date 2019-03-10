import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  footer_container: {
    flex: 0.07,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#23aaaa',
  },
  footer_p: {
    margin: 0,
    color: '#fff',
  },
});

const Footer = () => {
  return (
    <View style={styles.footer_container}>
      <Text style={styles.footer_p}>
        Jonathan Estabillo
      </Text>
    </View>
  );
}

export default Footer;
