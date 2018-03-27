import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

// @flow
export default class WalletPage extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.welcome}>
                    Wallet page
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});
