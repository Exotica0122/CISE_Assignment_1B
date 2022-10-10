import React, {useState} from 'react';

function App(){
    const adminUser = {
        email: "admin@test.com",
        password: "admin"
    }
    const [user, SetUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");

    const Logout = () =>{
        console.log("Logout");
    }
    return(
        <div className='App'>
            {(user.email != "") ? (
                <div className="Welcome">
                    <h2>Welcome, <span>{user.name}</span></h2>
                    <button>Logout</button>
                </div>
            ): (
                <testLoginForm />
            )}
        </div>
    )
}

export default testLogin;