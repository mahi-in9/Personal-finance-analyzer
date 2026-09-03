import Balance from "../components/Balance";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";

function Dashboard() {

    return (
        <div className="dashboard">

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
