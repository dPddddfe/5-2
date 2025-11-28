// src/components/Pages/UpdatePage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../api";

function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    name: "",
    code: "",
    professor: "",
    major: "",
    credits: "",
    place: "",
    time: "",
    grade: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCourse(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      if (res.ok) navigate("/showlist");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>강의 수정</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={course.name}
          onChange={handleChange}
          placeholder="과목명"
        />
        {/* 나머지 입력 필드도 동일 */}
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default UpdatePage;
