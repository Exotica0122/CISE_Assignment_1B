import React, {useState} from 'react';


function TestLogin(){
    const adminUser = {
        email: "admin@test.com",
        password: "admin"
    }
    const [user, SetUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);

        if(details.email === adminUser.email && details.password === adminUser.password){
            console.log("Logged in");
            SetUser({
                name: details.name,
                email: details.email
            });
        }else{
            console.log("Details do not match")
            setError("Details do not match");
        }
    }
    const Logout = () =>{
        SetUser({name: "", email: ""});
    }
    return(
        <div className='App'>
            {(user.email !== "") ? (
                <div className="Welcome">
                    <h2>Welcome, <span>{user.name}</span></h2>
                    <button onClick={Logout}>Logout</button>
                </div>
            ): (
                <testLoginForm Login={Login} error={error}/>
            )}
        </div>
    )
}

export default TestLogin;