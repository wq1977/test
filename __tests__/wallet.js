
import wallet from '../src/lib/wallet';

/* global it, expect */
it('wallet default with no accounts', (done) => {
    expect(wallet.accounts.length).toBe(0);
    wallet.newAccount();
    wallet.saveAccounts()
        .then(() => {
            wallet.loadAccounts()
                .then(() => {
                    done();
                });
        });
});
