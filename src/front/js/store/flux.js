const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			postSingUp: async (name, email, password) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/singup", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({
							name: name,
							email: email,
							password: password,
						})
					})
					const data = await resp.json()
					setStore({ msg: data.msg })
					console.log(data)

					return data;
				}catch(error){
					console.log("Error create user", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
