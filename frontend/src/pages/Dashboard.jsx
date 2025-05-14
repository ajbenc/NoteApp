import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getNotes, createNote, getSecretNotes } from "../services/api";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'; 
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import SecurityModal from "../components/SecurityModal";

export default function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [filter, setFilter] = useState("all");
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  

  //Modified useeffect logic to use and fetch the data from mongo
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();
        // Remove .data if using response interceptor
        if (Array.isArray(response)) {
          setNotes(response);
        } else {
          setError("Invalid notes format received");
          setNotes([]);
        }
      } catch (err) {
        setError(err.message || "Failed to load notes");
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleCreateNote = async (noteData) => {
    try {
      const response = await createNote(noteData);
      if (response.data && response.data._id) {
        setNotes(prevNotes => [...prevNotes, response.data]);
      }
    } catch (err) {
      alert("Failed to create note");
      console.log(err);
      
    }
  };

 const handleViewSecretNotes = async (answer) => {
    try {
      const response = await getSecretNotes(answer);
      if (Array.isArray(response)) {
        // response is the notes array
        setNotes(response);
        setShowSecretModal(false);
        setSecretUnlocked(true); // <-- Unlock secret notes!
      }
    } catch (err) {
      alert(err.response?.data?.error || "Invalid security answer");
    }
  };

  const filteredNotes = notes.filter((note) => {
    if (filter === "all") return true;
    return note.importance === filter;
  });

  return (
    <Container className="my-4">
      <Row className="mb-4 align-items-center">
        <Col md={3}>
          <Form.Select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Notes</option>
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="secret">Secret</option>
          </Form.Select>
        </Col>
        
        {filter === "secret" && (
          <Col md={3}>
            <Button 
              variant="warning" 
              onClick={() => setShowSecretModal(true)}
            >
              Unlock Secret Notes
            </Button>
          </Col>
        )}
      </Row>

      
      <NoteForm onSubmit={handleCreateNote} />

      {loading ? (
        <Alert variant="info">Loading notes...</Alert>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : filteredNotes.length === 0 ? (
        <Alert variant="secondary">No notes found</Alert>
      ) : (
        <NoteList notes={filteredNotes} secretUnlocked={secretUnlocked} />
      )}

      <SecurityModal
        show={showSecretModal}
        onHide={() => setShowSecretModal(false)}
        onConfirm={handleViewSecretNotes}
      />
    </Container>
  );
}