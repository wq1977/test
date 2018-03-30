import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import ConversionPage from './ConversionPage';
import Swipeout from 'react-native-swipeout';

// @flow
class SessionPage extends React.Component {
    state = {
        disableScroll: false
    }
    static propTypes = {
        navigator: PropTypes.object,
        chatrooms: PropTypes.array
    }

    jumpToConversion(session) {
        this.props.navigator && this.props.navigator.push({
            title: session.item.title,
            component: ConversionPage,
            passProps: {session},
            navigationBarHidden: false
        });
    }

    renderRow(session) {
        return (
            <Swipeout
                right={[{ text: '删除' }, { text: '删除' }]}
                onOpen={()=>{this.setState({disableScroll: true});}}
                onClose={()=>{this.setState({disableScroll: false});}}
            >
                <TouchableOpacity
                    onPress={this.jumpToConversion.bind(this, session)}
                >
                    <View style={{ padding: 15 }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>
                            {session.item.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        );
    }

    render() {
        return (
            <FlatList
                style={{ backgroundColor: 'white' }}
                data={this.props.chatrooms || []}
                scrollEnabled={!this.state.disableScroll}
                renderItem={this.renderRow.bind(this)}
            />
        );
    }
}

export default connect( (state) => {
    return { chatrooms: state.chatrooms};
})(SessionPage);