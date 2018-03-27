import React from 'react';

import MainPage from './src/MainPage';
import { Asset } from 'expo';

function cacheImages(images) {
    return images.map(image => {
        return Asset.fromModule(image).downloadAsync();
        /* if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }*/
    });
}

let AppLoading;
export default class App extends React.Component {
    dummyConsole(){}

    constructor(props) {
        super(props);
        this.state = { isReady: false };

        /** Jest will gives a really long error message from this AppLoading require */
        const _err = console.err // eslint-disable-line
        console.error = this.dummyConsole; // eslint-disable-line
        AppLoading = require('expo').AppLoading;
        console.err = _err; // eslint-disable-line
    }

    async _loadAssetsAsync() {
        const imageAssets = cacheImages([
            require('./assets/images/tokens.png'),
        ]);
    
        await Promise.all([...imageAssets]);
    }
    
    render() {
        if ((!this.state.isReady)) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() =>{
                        this.setState({ isReady: true } );
                    }}
                />
            );
        }
        return (
            <MainPage />
        );
    }
}

