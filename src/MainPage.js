import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TabBarIOS,
} from 'react-native';
import PropTypes from 'prop-types';
import WalletPage from './WalletPage';
import SessionPage from './SessionPage';
import NewWalletPage from './NewWalletPage';
import wallet from './lib/wallet';

// @flow
export default class MainPage extends React.Component {
    static propTypes = {
        selected: PropTypes.string,
        navigator: PropTypes.object // pass the navigator instance
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: props.selected || '会话',
            notifCount: 0,
            presses: 0,
        };
    }

    _renderContent(color: string, pageText: string, num?: number) {
        return (
            <ScrollView contentContainerStyle={[styles.tabContent, { backgroundColor: color }]}>
                <Text style={styles.tabText}>{pageText}</Text>
                <Text style={styles.tabText}>第 {num} 次重复渲染{pageText}</Text>
            </ScrollView>
        );
    }

    onPress0() {
        this.setState({
            selectedTab: '会话',
        });
    }

    onPress1() {
        this.setState({
            selectedTab: '通讯录',
            notifCount: this.state.notifCount + 1,
        });
    }

    onPress2() {
        this.setState({
            selectedTab: 'Tokens',
            presses: this.state.presses + 1
        });
    }

    onPress3() {
        this.setState({
            selectedTab: '我',
            presses: this.state.presses + 1
        });
    }

    checkWallet() {
        if (wallet.accounts.length == 0) {
            this.props.navigator && this.props.navigator.push({
                title: 'new',
                component: NewWalletPage,
                navigationBarHidden: true
            });
        }
    }

    componentDidMount() {
        setTimeout(this.checkWallet.bind(this), 1000);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }} >
                <TabBarIOS
                    style={{ flex: 1, backgroundColor: 'blue', alignItems: 'flex-end' }}
                    tintColor="white"
                    barTintColor="darkslateblue">
                    <TabBarIOS.Item
                        systemIcon="recents"
                        selected={this.state.selectedTab === '会话'}
                        onPress={this.onPress0.bind(this)}
                    >
                        <SessionPage navigator={this.props.navigator} />
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        systemIcon="contacts"
                        selected={this.state.selectedTab === '通讯录'}
                        badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                        onPress={this.onPress1.bind(this)}
                    >
                        {this._renderContent('#783E33', '历史记录', this.state.notifCount)}
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        icon={require('../assets/images/tokens.png')}
                        title="钱包"
                        selected={this.state.selectedTab === 'Tokens'}
                        onPress={this.onPress2.bind(this)}>
                        <WalletPage />
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        systemIcon="favorites"
                        selected={this.state.selectedTab === '我'}
                        onPress={this.onPress3.bind(this)}>
                        {this._renderContent('#21551C', '下载页面', this.state.presses)}
                    </TabBarIOS.Item>
                </TabBarIOS>
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
