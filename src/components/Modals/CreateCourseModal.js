import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { API_URL } from "../../api";

function CreateCourseModal({ show, handleClose, fetchCourses }) {
  const [form, setForm] = useState({
    name: "", code: "", professor: "", major: "",
    credits: "", place: "", time: "", grade: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        fetchCourses();
        handleClose();
        setForm({ name: "", code: "", professor: "", major: "", credits: "", place: "", time: "", grade: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton><Modal.Title>강의 추가</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form>
          {Object.keys(form).map(key => (
            <Form.Group key={key} className="mb-2">
              <Form.Label>{key}</Form.Label>
              <Form.Control
                type="text"
                name={key}
                value={form[key]}
                onChange={handleChange}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>취소</Button>
        <Button variant="primary" onClick={handleSubmit}>추가</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCourseModal;
