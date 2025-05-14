import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const NoteForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    importance: 'normal'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      subject: '',
      content: '',
      importance: 'normal'
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded">
      <Form.Group className="mb-3">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter subject"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Importance</Form.Label>
        <Form.Select
          value={formData.importance}
          onChange={(e) => setFormData({...formData, importance: e.target.value})}
        >
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="secret">Secret</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Save Note
      </Button>
    </Form>
  );
};

export default NoteForm;