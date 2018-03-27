
import { AsyncStorage } from 'react-native';

const ethers = require('ethers');
const ethWallet = ethers.Wallet;

// @flow
class Wallet {
    accounts = []
    wallets = []
    constructor(){
        this.loadAccounts();
    }

    async loadAccounts() {
        try {
            this.accounts = JSON.parse(await AsyncStorage.getItem('@wallets:keys')) || [];
            this.wallets = this.accounts.map((item) => {
                return new ethWallet(item.privateKey);
            });
        } catch (error) {
            // Error, what to do?
        }
    }
    async saveAccounts() {
        try {
            await AsyncStorage.setItem('@wallets:keys', JSON.stringify(this.accounts));
        } catch (error) {
            // Error, what to do?
        }
    }
    newAccount() {
        const wallet = ethWallet.createRandom();
        this.accounts.push({
            privateKey: wallet.privateKey,
            saved: false,
            exported: false
        });
        this.wallets.push(wallet);
    }
}

const wallet = new Wallet();
export default wallet;
