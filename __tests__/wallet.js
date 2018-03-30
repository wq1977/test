
import wallet from '../src/lib/wallet';

const dummyGetBalance = new Promise(
    (resolve) => {
        resolve(100);
    }
);

/* global it, expect */
it('wallet default with no accounts', async () => {
    expect(wallet.accounts.length).toBe(0);
    await wallet.refreshBalance(0); // to do 100% coverage
    // this function is in constructor function and really dangrous
    // cause it can be called just inside other async function call and make everything strange
    await wallet.loadAccounts();
    wallet.newAccount();

    wallet.wallets.forEach((item)=>{
        item.getBalance = dummyGetBalance;
    });

    const balance = await wallet.refreshBalance(0);
    expect(balance.toNumber()).toBe(0);
    wallet.walletFromAccount({ privateKey: '0x0123456789012345678901234567890123456789012345678901234567890123' });
    await wallet.saveAccounts();
    await wallet.refreshAllBalance();
}, 10000);
