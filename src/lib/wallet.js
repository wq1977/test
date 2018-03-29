
import { AsyncStorage } from 'react-native';

const ethers = require('ethers');
const ethWallet = ethers.Wallet;

// @flow
class Wallet {
    accounts = []
    wallets = []
    constructor() {
        this.loadAccounts();
    }

    walletFromAccount(account) {
        const wallet = new ethWallet(account.privateKey);
        wallet.provider = new ethers.providers.EtherscanProvider('ropsten', '6P42IJS6BDP2J9MPT43WP5DTSH39ANVQ6I');
        return wallet;
    }

    async loadAccounts() {
        try {
            this.accounts = JSON.parse(await AsyncStorage.getItem('@wallets:keys')) || [];
            this.wallets = this.accounts.map(this.walletFromAccount);
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

    async refreshAllBalance(){
        const promises = this.wallets.map((item, idx) => {
            return {idx, promise: item.getBalance()};
        });
        for (let {idx, promise} of promises) {
            this.accounts[idx].balance = await promise;
        }
    }

    async refreshBalance(idx: number) {
        if (idx >= this.accounts.length) return;
        const balance = await this.wallets[idx].getBalance();
        this.accounts[idx].balance = balance;
        return this.accounts[idx].balance;
    }

    newAccount() {
        const wallet = ethWallet.createRandom();
        const account = {
            privateKey: wallet.privateKey,
            saved: false,
            exported: false
        };
        this.accounts.push(account);
        this.wallets.push(this.walletFromAccount(account));
    }
}

const wallet = new Wallet();
export default wallet;
