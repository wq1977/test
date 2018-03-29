import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Clipboard,
    // LayoutAnimation,
    Button,
} from 'react-native';
import QRCode from 'react-native-qrcode';
// import { BarCodeScanner, Permissions } from 'expo';
import wallet from './lib/wallet';

const utils = require('ethers').utils;

// @flow
export default class WalletPage extends React.Component {
    state = {}

    /*
    async _requestCameraPermission() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    }


    _handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedUrl) {
            LayoutAnimation.spring();
            this.setState({ lastScannedUrl: result.data });
        }
    };*/

    componentDidMount() {
        wallet.refreshAllBalance().then(() => {
            this.forceUpdate();
        });
    }

    copyToClipboard() {
        Clipboard.setString(wallet.wallets.length > 0 ? wallet.wallets[0].address : '');
    }

    sendEth(){

    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Text style={styles.welcome}>
                    Wallet page, 你有 {wallet.accounts.length} 个账户
                </Text>
                <Text style={styles.welcome}>
                    第一个账户的地址是: {wallet.wallets.length > 0 && wallet.wallets[0].address}
                </Text>
                <Text style={styles.welcome}>
                    当前的账户余额：{wallet.accounts.length > 0 && wallet.accounts[0].balance &&
                        utils.formatEther(wallet.accounts[0].balance)}
                </Text>
                <Text style={[styles.welcome, { marginBottom: 20 }]}>
                    可以让你的朋友给你一些以太币。
                </Text>
                <QRCode
                    value={wallet.wallets.length > 0 && `ethereum:${wallet.wallets[0].address}`}
                    size={200}
                    bgColor='purple'
                    fgColor='white' />
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        onPress={this.copyToClipboard.bind(this)}
                        title="复制地址"
                    />
                    <Button
                        onPress={this.sendEth.bind(this)}
                        title="发送以太"
                    />
                </View>
                {/* this.state.lastScannedUrl ?
                    <Text>{this.state.lastScannedUrl}</Text>
                    :
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={{
                            height: 300,
                            width: 300,
                        }}
                    /> */}
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
