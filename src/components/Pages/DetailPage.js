import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../api";

function DetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (res.ok) setCourse(await res.json());
      } catch (err) { console.error(err); }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{course.name} 상세 정보</h1>
      <ul>
        {Object.entries(course).map(([key, value]) => <li key={key}>{key}: {value}</li>)}
      </ul>
    </div>
  );
}

export default DetailPage;
