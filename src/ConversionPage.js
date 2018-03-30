import React from 'react';
import {
    TouchableOpacity,
    FlatList,
    Text,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

const utils = require('ethers').utils;

// @flow
class ConversionPage extends React.Component {
    static propTypes = {
        navigator: PropTypes.object,
        dispatch: PropTypes.func,
        session: PropTypes.object,
        messages: PropTypes.array,
    }
    state = {
        conversion: [{ key: 'a' }, { key: 'b' }],
        disableScroll: false
    }

    renderRow(item: Object) {
        return (<TouchableOpacity>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, color: 'black' }}>
                    {utils.toUtf8String(item.item.payload)}
                </Text>
            </View>
        </TouchableOpacity>);
    }

    say() {
        this.props.dispatch({
            type: 'whisper',
            payload: {
                cnt: this.state.inputCnt,
                room: this.props.session,
            }
        });
        this.setState({ inputCnt: '' });
    }

    onInputTextChange(text: string) {
        this.setState({ inputCnt: text });
    }

    render() {
        const messages = this.props.messages.map((msg)=>{
            msg.key = msg.hash;
            return msg;
        });
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <FlatList
                    style={{ backgroundColor: 'grey', flex: 1 }}
                    data={messages}
                    scrollEnabled={!this.state.disableScroll}
                    renderItem={this.renderRow.bind(this)}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        value={this.state.inputCnt}
                        onChangeText={this.onInputTextChange.bind(this)}
                        style={{ flex: 1 }} />
                    <Button
                        onPress={this.say.bind(this)}
                        title="Say" />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default connect((state) => {
    return {
        messages: state.messages
    };
})(ConversionPage);