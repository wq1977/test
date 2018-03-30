import { store, saga } from './models';
import { takeEvery, select } from 'redux-saga/effects';
const utils = require('ethers').utils;

let shh;

String.prototype.hash = function () {
    const md5 = require('md5');
    return `0x${md5(this).substr(0, 8)}`;
};

function* subscribe(action) {
    for (let room of action.payload) {
        shh.addSymKey(room.key, (err, keyid) => {
            store.dispatch({
                type: 'room keyid',
                payload: {
                    room,
                    keyid
                }
            });
            shh.subscribe('messages', {
                symKeyID: keyid,
                topics: [room.title.hash()],
            }, (err, msg) => {
                store.dispatch({
                    type: 'new message',
                    payload: {
                        msg,
                    }
                });
            });
        });
    }
    yield 0;
}

function* post(action) {
    const whisper = yield select((state)=>state.whisper);
    shh.post({
        symKeyID: action.payload.room.item.keyid, // encrypts using the sym key ID
        ttl: 10,
        sig: whisper.id,
        topic: action.payload.room.item.title.hash(),
        payload: utils.hexlify(utils.toUtf8Bytes(action.payload.cnt)),
        powTime: 3,
        powTarget: 0.5
    });
    yield 0;
}

function* whisperSaga() {

    const Shh = require('web3-shh');
    shh = new Shh('ws://52.221.202.146:8546');

    yield takeEvery('chatrooms', subscribe);
    yield takeEvery('whisper', post);

    //dispatch after side effects registed
    store.dispatch({
        type: 'chatrooms', payload: [
            { key: '0x4584c683952ebd019cb339875cb3e68102e3b490d1704b1a251ea50fc7cb9395', title: '乌镇灌水区' },
            { key: '0x22f1f82850b6cea23ce113bad91de9cab44af25ab82e6079b96a8af03894da48', title: '场外交易区' },
            { key: '0xe45921c7a920f4a907db67e5352107edeea39f3d769f6fa34e850798088c15cc', title: '跳蚤市场区' },
        ],
    });

    shh.newKeyPair().then((id) => {
        shh.getPublicKey(id, (err, pubkey)=>{
            store.dispatch({
                type: 'save', payload: {
                    whisper: {id, pubkey},
                },
            });    
        });
    });
}

saga.run(whisperSaga);

