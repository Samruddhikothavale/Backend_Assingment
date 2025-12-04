import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/tasks";

const Dashboard = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({ title: "", description: "" });
    const [editingId, setEditingId] = useState(null);

    const authHeader = () => {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_BASE, {
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
            });
            if (!res.ok) throw new Error(`Failed to load tasks (${res.status})`);
            const data = await res.json();
            
            setTasks(data.tasks || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        fetchTasks();
    }, [navigate]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(API_BASE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || `Create failed (${res.status})`);
            }
            setForm({ title: "", description: "" });
            await fetchTasks();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this task?")) return;
        try {
            const res = await fetch(`${API_BASE}/${id}`, {
                method: "DELETE",
                headers: authHeader(),
            });
            if (!res.ok) throw new Error(`Delete failed (${res.status})`);
            await fetchTasks();
        } catch (err) {
            alert(err.message);
        }
    };

    const startEdit = (task) => {
        setEditingId(task._id);
        setForm({ title: task.title || "", description: task.description || "" });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setForm({ title: "", description: "" });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE}/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...authHeader(),
                },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error(`Update failed (${res.status})`);
            setEditingId(null);
            setForm({ title: "", description: "" });
            await fetchTasks();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="dashboard">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                    <h1 style={{ margin: 0 }}>Dashboard</h1>
                    <p style={{ margin: 0 }}>Welcome to your task management dashboard!</p>
                </div>
                <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
            </div>

            <section className="task-form">
                <h2>{editingId ? "Edit Task" : "Create Task"}</h2>
                <form onSubmit={editingId ? handleUpdate : handleCreate}>
                    <div>
                        <label>Title</label>
                        <input name="title"  value={form.title} onChange={handleInput} required />
                    </div>
                    <div>
                        <label>Description</label>
                        <input name="description" value={form.description} onChange={handleInput} />
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <button type="submit">{editingId ? "Update" : "Create"}</button>
                        {editingId && (
                            <button type="button" onClick={cancelEdit} style={{ marginLeft: 8 }}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="task-list" style={{ marginTop: 20 }}>
                <h2>Your Tasks</h2>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && !error && tasks.length === 0 && <p>No tasks found.</p>}
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id} style={{ marginBottom: 12 }}>
                            <strong>{task.title} </strong>
                            <span className="color-orange"> - {task.status} </span>
                            <div>{task.description}</div>
                            <div style={{ marginTop: 6 }}>
                                <button onClick={() => startEdit(task)}>Edit</button>
                                <button onClick={() => handleDelete(task._id)} style={{ marginLeft: 8 }}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;