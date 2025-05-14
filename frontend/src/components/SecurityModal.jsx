import { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap'; // Add missing imports

export default function SecurityModal({ show, onHide, onConfirm }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onConfirm(answer);
      setAnswer("");
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Security Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Enter security answer</Form.Label>
            <Form.Control
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Verify
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}