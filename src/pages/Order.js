import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Order() {
  const [showCompoffLeave, setShowCompoffLeave] = useState(false);

  const handleCompoffClose = () => setShowCompoffLeave(false);
  const handleCompoffShow = () => setShowCompoffLeave(true);

  return (
    <>
      <Button variant="primary" onClick={handleCompoffShow}>
        Launch demo modal
      </Button>

      <Modal show={showCompoffLeave} onHide={handleCompoffClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCompoffClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCompoffClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

