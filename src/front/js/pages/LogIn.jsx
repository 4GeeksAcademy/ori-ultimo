import React, { useContext, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";


// export const LogIn = () => {
//     const { actions } = useContext(Context);
//     const navigate = useNavigate()

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await actions.postLogin(email, password);
//             navigate("/Private")

//             if (response.success) {
             
//                 console.log("Login successful");

//             } else {
//                 setError("Invalid credentials. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error logging in:", error);
//             setError("Error loging in. Please try again later.");
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="container mt-5 d-flex justify-content-center align-items-center vh-100">
//                 <div className="col-md-6">
//                     <div className="card">
//                         <div className="card-header">
//                             <h4 className="card-title text-center">Log In</h4>
//                         </div>
//                         <div className="card-body">
//                             <form onSubmit={handleLogin}>
//                                 <div className="mb-3">
//                                     <label htmlFor="email" className="form-label">Email</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         id="email"
//                                         name="email"
//                                         required
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         placeholder="Enter your email"
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="password" className="form-label">Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         id="password"
//                                         name="password"
//                                         required
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         placeholder="Enter your password"
//                                     />
//                                 </div>
//                                 {error && <div className="alert alert-danger">{error}</div>}
//                                 <button type="submit" onClick={handleLogin} className="btn btn-primary w-100">Log In</button>
//                             </form>
//                         </div>
//                         <div className="card-footer text-center">
//                             <p className="mb-0">Don't have an account? <a href="/">Sign up here</a></p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

export const LogIn = () => {
    const { store, actions } = useContext(Context)
    const [active, setActive] = useState(false)
    const [formLoginIn, setFormLoginIn] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()
    function handlerChangeLoginIn(eve) {
        const { name, value } = eve.target;
        setFormLoginIn(prev => ({
            ...prev,
            [name]: value
        }));
    }
    async function handlerLoginIn(e) {
        e.preventDefault();
        if (formLoginIn.email !== '' && formLoginIn.password !== '') {
            await actions.postLogin(formLoginIn);
            navigate("/Private")
        }
    }
    function handlerHome() {
        navigate('/')
    }
    function handlerGoToRegister() {
        navigate('/')
    }
   
  
    return (
        <div className='position-relative'>
           
            <div className='row d-flex flex-row'>
                <div className='d-flex justify-content-center align-items-start'>
                    <div className='border border-black rounded-3 mx-auto my-5 p-3 w-75'>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className='d-flex justify-content-center align-items-center mx-2 fs-4' onClick={handlerHome} style={{ cursor: "pointer" }}>
                              
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <h1>Log In</h1>
                            </div>
                        </div>
                        <form onSubmit={handlerLoginIn}>
                            <div className='col-md my-3'>
                                <label className='my-2'>Email</label>
                                <input
                                    name='email'
                                    value={formLoginIn.email}
                                    onChange={handlerChangeLoginIn}
                                    type="text"
                                    placeholder='Ingrese email'
                                    className="form-control"
                                />
                            </div>
                            <div className='col-md my-3'>
                                <label className='my-2'>Password</label>
                                <input
                                    name='password'
                                    value={formLoginIn.password}
                                    onChange={handlerChangeLoginIn}
                                    type='password'
                                    placeholder='Ingrese password'
                                    className="form-control"
                                />
                            </div>
                            <div className='col-md' style={{ marginTop: '80px' }}>
                                <button className='btn btn-primary w-100' onClick={handlerLoginIn}>Login In</button>
                            </div>
                            <div className='col-md my-3 text-center'>
                                <a onClick={handlerGoToRegister}>Don't have an account yet? click here to register.</a>
                            </div>
                        </form>
                    </div>
                </div>
            
            </div>
        </div>
    );
}