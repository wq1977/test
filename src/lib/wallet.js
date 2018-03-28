
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

    walletFromPrivateKey(account) {
        return new ethWallet(account.privateKey);
    }
    
    async loadAccounts() {
        try {
            this.accounts = JSON.parse(await AsyncStorage.getItem('@wallets:keys')) || [];
            this.wallets = this.accounts.map(this.walletFromPrivateKey);
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
