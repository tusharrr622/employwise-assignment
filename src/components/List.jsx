import React, { useEffect, useState } from "react";
import axios from "axios";
import '../stylesheet/List.css'

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
            setUsers(response.data.data);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error("Error fetching users:", error);
            setMessage("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (!selectedUser) return;
        try {
            await axios.put(`https://reqres.in/api/users/${selectedUser.id}`, formData);
            setUsers(users.map(user => user.id === selectedUser.id ? { ...user, ...formData } : user));
            setMessage("User updated successfully!");
            setSelectedUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
            setMessage("Failed to update user");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://reqres.in/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
            setMessage("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            setMessage("Failed to delete user");
        }
    };

    return (
        <div>
            <h2 className="list-heading">User List</h2>
            {message && <p>{message}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th className="avatar">Avatar</th>
                            <th className="first-name">First Name</th>
                            <th className="last-name">Last Name</th>
                            <th className="email-head">Email</th>
                            <th className="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <img src={user.avatar} alt={user.first_name} />
                                </td>
                                <td className="first-name">{user.first_name}</td>
                                <td className="last-name">{user.last_name}</td>
                                <td className="email-row">{user.email}</td>
                                <td>
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="edit"
                                    >
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="delete"
                                    >
                                        <span>Delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination Controls */}
            <div className="pagination-container">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="previous"
                >
               <span>Previous</span>     
                </button>

                <span className="num" >{page} / {totalPages}</span>

                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="next"
                >
                   <span>Next</span> 
                </button>
            </div>

            {/* Edit User Modal */}
            {selectedUser && (
            
                    <div className="edit-container">
                        <h2 className="list-heading">Edit User</h2>
                        <label className="first">First Name:</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="first-input"
                        />
                        <label className="last">Last Name:</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="second-input"
                        />
                        <label className="email-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="third-input"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleUpdate}
                                className="save"
                            >
                             <span>Save</span>  
                              
                            </button>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="cancel"
                            >
                            <span>Cancel</span>    
                            </button>
                        </div>
                    </div>
                
            )}
        </div>
    );
};

export default UsersList;
