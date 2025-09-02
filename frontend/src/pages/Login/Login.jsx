import { useData } from "../../context/DataContext";
import "./Login.css";

const Login = () => {
  const { backendUrl } = useData();

  const handleLogin = () => {
    window.location.href = `${backendUrl}/auth/github`;
  };

  return (
     <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to DevTrail</h1>
        <p className="login-subtitle">Log your growth, wins & roadblocks</p>

        <button className="github-btn" onClick={handleLogin}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub logo"
          />
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};
export default Login;


















// Delete -> delete is used for deleting a paticular record
//syntax -delete from tableName  where <filterCondition>; if we not pass condition then entire table will be deleted
//e.g. = delete table from emp where ename = "king"

//ddl are auto commit
//dml are not auto commit
//using delete we can get back records but using truncate we can't get back records

//tcl - transaction control language -> to control operation done by ddl

//types -. 1)commit 2)rollback 3)savepoint
//commit - it is used to save the transaction in db
//syntax - commit;
//rollback - remove the transaction,upto latest commit or upto a savepoint
//syntax = rollback or rollback<t [to savepoint];
//savepoint is used to mark a point between transactions
//syntax - savepoint savepointName;
