import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TabBarIOS,
} from 'react-native';
import PropTypes from 'prop-types';

// @flow
export default class MainPage extends React.Component {
    static propTypes = {
        selected: PropTypes.string
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
            <View style={[styles.tabContent, { backgroundColor: color }]}>
                <Text style={styles.tabText}>{pageText}</Text>
                <Text style={styles.tabText}>第 {num} 次重复渲染{pageText}</Text>
            </View>
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
            selectedTab: '发现',
            presses: this.state.presses + 1
        });
    }

    onPress3() {
        this.setState({
            selectedTab: '我',
            presses: this.state.presses + 1
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.welcome}>
                    TabBarIOS使用实例
                </Text>
                <TabBarIOS
                    style={{ flex: 1, alignItems: 'flex-end' }}
                    tintColor="white"
                    barTintColor="darkslateblue">
                    <TabBarIOS.Item
                        systemIcon="recents"
                        selected={this.state.selectedTab === '会话'}
                        onPress={this.onPress0.bind(this)}
                    >
                        {this._renderContent('#414A8C', '自定义界面')}
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
                        systemIcon="bookmarks"
                        selected={this.state.selectedTab === '发现'}
                        onPress={this.onPress2.bind(this)}>
                        {this._renderContent('#21551C', '下载页面', this.state.presses)}
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
