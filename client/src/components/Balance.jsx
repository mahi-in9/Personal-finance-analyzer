import { useSelector } from 'react-redux';

function Balance() {
    const { transactions } = useSelector((state) => state.transactions);

    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const sign = total < 0 ? '-' : '';

    return (
        <div className="balance card">
            <h2 className="balance-title">Balance</h2>
            <p className="balance-amount">{sign}${Math.abs(total).toFixed(2)}</p>
        </div>
    );
}

export default Balance;
