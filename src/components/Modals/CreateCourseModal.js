// src/components/Modals/CreateCourseModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { API_URL } from "../../api";

function CreateCourseModal({ show, handleClose, fetchCourses }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    const newCourse = { name, code };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });
      if (res.ok) {
        fetchCourses();
        handleClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>강의 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>과목명</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>과목 코드</Form.Label>
          <Form.Control
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          추가
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCourseModal;
