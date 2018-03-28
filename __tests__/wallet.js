
import wallet from '../src/lib/wallet';

/* global it, expect */
it('wallet default with no accounts', (done) => {
    expect(wallet.accounts.length).toBe(0);
    wallet.newAccount();
    wallet.walletFromPrivateKey({privateKey: '0x0123456789012345678901234567890123456789012345678901234567890123'});
    wallet.saveAccounts()
        .then(() => {
            wallet.loadAccounts()
                .then(() => {
                    done();
                });
        });
});
