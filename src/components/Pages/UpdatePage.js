import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../api";
import { Button, Form } from "react-bootstrap";

function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", code: "", professor: "", major: "",
    credits: "", place: "", time: "", grade: ""
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (res.ok) setForm(await res.json());
      } catch (err) { console.error(err); }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) navigate("/");
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container">
      <h1>강의 수정</h1>
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
        <Button variant="primary" onClick={handleSubmit}>저장</Button>
      </Form>
    </div>
  );
}

export default UpdatePage;
