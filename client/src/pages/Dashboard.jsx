import Balance from "../components/Balance";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";

function Dashboard() {

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>

            <div className="dashboard-content">
                <div className="dashboard-left">
                    <Balance />
                    <AddTransaction />
                </div>
                <div className="dashboard-right">
                    <TransactionList />
                </div>
            </div>
        </div>
    );

}

export default Dashboard;
