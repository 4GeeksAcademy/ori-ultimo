import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [data, setData] = useState({
		name: "",
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData(prevData => ({ ...prevData, [name]: value }));
	};

	const handleClick = async (e) => {
		e.preventDefault();
		await actions.postSingUp(data.name, data.email, data.password);
		setData({
			name: "",
			email: "",
			password: ""
		});
	};

	return (
		<div className="text-center mt-5">

			<div className="container p-3 border border-black rounded-3 ">
				<h1>Create User</h1>
				<form className="row g-3" onSubmit={handleClick}>
					<div className="col-6">
						<label htmlFor="inputAddress" className="form-label">Name</label>
						<input type="text" className="form-control" id="inputAddress" name="name" value={data.name} onChange={handleChange} />
					</div>
					<div className="col-md-6">
						<label htmlFor="inputEmail4" className="form-label">Email</label>
						<input type="email" className="form-control" id="inputEmail4" name="email" value={data.email} onChange={handleChange} />
					</div>
					<div className="col-md-12">
						<label htmlFor="inputPassword4" className="form-label">Password</label>
						<input type="password" className="form-control" id="inputPassword4" name="password" value={data.password} onChange={handleChange} />
					</div>
					<div className="col-12">
						<button type="submit" className="btn btn-primary w-100 my-5">Sign in</button>
					</div>
				</form>
			</div>
		</div>
	);
};
