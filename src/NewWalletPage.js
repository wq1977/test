import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

import PropTypes from 'prop-types';

import wallet from './lib/wallet';

// @flow
export default class NewWalletPage extends React.Component {
    static propTypes = {
        navigator: PropTypes.object,
    }

    onPressNewWallet() {
        wallet.newAccount();
        wallet.saveAccounts().then(()=>{
            this.props.navigator.pop();
        });
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.welcome}>
                    创建一个新钱包
                </Text>
                <Text>
                    点击下面的按钮，我们会给你创建一个新钱包。
                </Text>
                <Text style={{ color: 'red' }}>
                    非常重要，你应该备份你的钱包。
                </Text>
                <Button
                    style={{marginTop: 20}}
                    onPress={this.onPressNewWallet.bind(this)}
                    title="创建一个新钱包"
                    color="#841584"
                />

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
