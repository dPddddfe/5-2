import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { API_URL } from "../../api";

function CreateCourseModal({ show, handleClose, fetchCourses, editCourse }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    professor: "",
    major: "",
    credits: "",
    place: "",
    time: "",
    grade: ""
  });

  useEffect(() => {
    if (editCourse) {
      setForm({ ...editCourse }); // 수정 시 기존 데이터 채움
    } else {
      setForm({
        name: "",
        code: "",
        professor: "",
        major: "",
        credits: "",
        place: "",
        time: "",
        grade: ""
      });
    }
  }, [editCourse]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const method = editCourse ? "PUT" : "POST";
      const url = editCourse ? `${API_URL}/${editCourse.id}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        fetchCourses();
        handleClose();
      } else {
        alert("오류 발생");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editCourse ? "강의 수정" : "강의 추가"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {["name","code","professor","major","credits","place","time","grade"].map(field => (
            <Form.Group className="mb-2" key={field}>
              <Form.Label>{field === "name" ? "과목명" :
                          field === "code" ? "과목 코드" :
                          field === "professor" ? "담당 교수" :
                          field === "major" ? "개설 학부" :
                          field === "credits" ? "학점" :
                          field === "place" ? "강의 장소" :
                          field === "time" ? "강의 시간" :
                          "성적"}</Form.Label>
              <Form.Control
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
              />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>닫기</Button>
        <Button variant="primary" onClick={handleSubmit}>
          {editCourse ? "수정 완료" : "추가"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateCourseModal;
