import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
export const Private = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getUser();
    }, []);
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(store.people.user.user) && store.people.user.user.length > 0 ? (
                        store.people.user.user.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};