import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const API = "http://localhost:8000/api/task";

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD
  const addTask = async () => {
    if (!title || !description) return;

    await axios.post(API, { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // DELETE
  const deleteTask = async (id) => {
    await axios.delete(`${API}/delete/${id}`);
    fetchTasks();
  };

  // START EDIT
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // SAVE EDIT
  const saveEdit = async (id) => {
    await axios.put(`${API}/update/${id}`, {
      title: editTitle,
      description: editDescription,
    });

    setEditingId(null);
    fetchTasks();
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="heading">Task Manager</h1>

        <div className="form">
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <input
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <button className="primary-btn" onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="list">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              {editingId === task._id ? (
                <>
                  <input
                    className="input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <input
                    className="input"
                    value={editDescription}
                    onChange={(e) =>
                      setEditDescription(e.target.value)
                    }
                  />

                  <div className="actions">
                    <button
                      className="save-btn"
                      onClick={() => saveEdit(task._id)}
                    >
                      Save
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3>{task.title || "Untitled"}</h3>
                    <p>{task.description || "No description"}</p> 
                  </div>

                  <div className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;