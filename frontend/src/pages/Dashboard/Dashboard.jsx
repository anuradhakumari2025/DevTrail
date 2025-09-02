import { useData } from "../../context/DataContext";
import "./Dashboard.css";

const Dashboard = () => {

  const {user} = useData()
  return (
    <div className="dashboard">
      {/* Main Content */}
      <main className="content">
        <div className="welcome">
          <h2>Welcome back, {user?.name} 👋</h2>
          <p>Here’s what’s happening today</p>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card">
            <h3>Users</h3>
            <p className="number">1,245</p>
            <span className="trend">+20 today</span>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p className="number">$8,340</p>
            <span className="trend">+5% growth</span>
          </div>
          <div className="card">
            <h3>Projects</h3>
            <p className="number">32 Active</p>
            <span className="trend">2 new</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
