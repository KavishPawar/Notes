import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [notes, setNotes] = useState([]);
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);

  function fetchData() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchData();
      });
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:3000/api/notes/${id}`).then(() => {
      fetchData();
    });
  }

  function handleEdit(note) {
    console.log(note._id);
    axios
      .patch(`http://localhost:3000/api/notes/${note._id}`, {
        description: description,
      })
      .then(() => {
        fetchData();
      });
  }

  function handleShow(id) {
    edit ? setEdit(false): setEdit(true);
  }

  return (
    <>
      <form className="notes-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="title" required />
        <input
          name="description"
          type="text"
          placeholder="description"
          required
        />
        <button className="btn">Create</button>
      </form>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                className="btn delete"
                onClick={() => {
                  handleDelete(note._id);
                }}
              >
                Delete
              </button>
              <button
                className="btn update"
                onClick={() => {
                  handleShow(note._id);
                }}
              >
                Edit
              </button>
              {edit && (
                <div className="edit">
                  <input
                    type="text"
                    className="mod-description"
                    placeholder="Modify-Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value); 
                    }}
                  />
                  <button
                    className="btn save"
                    onClick={() => {
                      description ? handleEdit(note) : null;
                      setEdit(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
