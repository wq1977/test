import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import wallet from './lib/wallet';

// @flow
export default class WalletPage extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
                <Text style={styles.welcome}>
                    Wallet page, 你有 {wallet.accounts.length} 个账户
                </Text>
                <Text style={styles.welcome}>
                    第一个账户的地址是: {wallet.accounts.length > 0 && wallet.wallets[0].address}
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
