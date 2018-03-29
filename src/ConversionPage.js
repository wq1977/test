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

// @flow
class ConversionPage extends React.Component {
    static propTypes = {
        navigator: PropTypes.object,
        dispatch: PropTypes.func,
        session: PropTypes.object,
    }
    state = {
        conversion: [{ key: 'a' }, { key: 'b' }],
        disableScroll: false
    }

    renderRow(item) {
        return (<TouchableOpacity>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, color: 'black' }}>
                    {item.item.key}
                </Text>
            </View>
        </TouchableOpacity>);
    }

    say(){
        this.props.dispatch({
            type: 'whisper',
            payload: {
                cnt: this.state.inputCnt,
                room: this.props.session,
            }
        });
        this.setState({inputCnt: ''});
    }

    onInputTextChange(text){
        this.setState({inputCnt: text});
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <FlatList
                    style={{ backgroundColor: 'grey', flex: 1 }}
                    data={this.state.conversion}
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

export default connect()(ConversionPage);