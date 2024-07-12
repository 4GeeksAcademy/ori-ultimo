const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            people: {
                user: []
            }
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            postSingUp: async (name, email, password) => {
                console.log(name, email, password);
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "api/singup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password
                        })
                    });
                    const data = await resp.json();
                    setStore({ msg: data.msg });
                    console.log(data);
                    return data;
                } catch (error) {
                    console.log("Error create user", error);
                }
            },
            postLogin: async (formLoginIn) => {
                try {
                    const requestOptions = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formLoginIn)
                    };
                    const response = await fetch(process.env.BACKEND_URL + "api/login/user", requestOptions);
                    const data = await response.json();
                    if (response.ok) {
                        localStorage.setItem("token", data.access_token);
                        getActions().getUser();
                    } else {
                        console.error("Error logging in:", data.error);
                    }
                    return data;
                } catch (error) {
                    console.error("Network error:", error);
                    throw error;
                }
            },
            getUser: async () => {
                const store = getStore();
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(process.env.BACKEND_URL + "api/private/user", {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json",
                            Authorization: "Bearer " + token
                        }
                    });
                    if (!response.ok) {
                        throw new Error("The request failed");
                    }
                    const dataUser = await response.json();
                    console.log(dataUser);
                    setStore({
                        ...store,
                        people: { user: dataUser }
                    });
                    console.log(store.people);
                } catch (error) {
                    console.log("Error getting data", error);
                    return [];
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            }
        }
    };
};
export default getState;