import { apiUrl } from "../api/ApiRestUrl.js";
import { useEffect, useState } from "react";

const useFetchBooks = () => {
  const [dataBooks, setDataBooks] = useState([]);

  // Obtener todos los libros
  const getBooks = async () => {
    try {
      const response = await fetch(apiUrl, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      setDataBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Obtener libro por ID
  const getBookById = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch book");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching book:", error);
      return null;
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return {
    dataBooks,
    setDataBooks,
    getBooks,
    getBookById,
  };
};

export default useFetchBooks;