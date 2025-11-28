import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import { API_URL } from "../../api";

function UpdatePage() {
  const { id } = useParams(); // ✅ 컴포넌트 안에서 useParams 호출
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const editCountRef = useRef(0);

  const fetchCourse = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      } else navigate("/list");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!id) return <div><Header /><p>수정할 ID 필요</p></div>;
  if (loading) return <div><Header /><p>로딩 중...</p></div>;

  return (
    <div className="container add-class-page">
      <Header />
      <h2>강의 수정</h2>
      <form>
        {Object.keys(formData).filter(k => k !== "id").map(key => (
          <div key={key}>
            <label>{key}</label>
            <input 
              type={key === "credits" ? "number" : "text"}
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
      </form>
    </div>
  );
}

export default UpdatePage;
