import { FaLock, FaExclamationCircle, FaStickyNote } from "react-icons/fa";
export default function NoteList({ notes, secretUnlocked }) {
  const getImportanceIcon = (importance) => {
    switch(importance) {
      case 'secret':
        return <FaLock className="text-danger me-2" />;
      case 'important':
        return <FaExclamationCircle className="text-warning me-2" />;
      default:
        return <FaStickyNote className="text-primary me-2" />;
    }
  }

  return (
    <div className="row mt-4">
      {notes.map(note => (
        <div className="col-md-4 mb-4" key={note._id}>
          <div className="card h-100">
            <div className="card-header d-flex align-items-center">
              {getImportanceIcon(note.importance)}
              <h5 className="card-title mb-0">{note.subject}</h5>
            </div>
            <div className="card-body">
              <p
                className={`card-text ${
                  note.importance === 'secret' && !secretUnlocked ? 'blur-content' : ''
                }`}
              >
                {note.content}
              </p>
            </div>
            <div className="card-footer text-muted">
              <small>
                {new Date(note.createdAt).toLocaleDateString()}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}