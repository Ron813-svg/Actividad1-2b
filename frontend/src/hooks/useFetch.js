import { apiUrl } from "../api/ApiRestUrl.js";

const useFetch = () => {

  const handlePut = async (id, autor, libro, estado, genero) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Se agrega credentials: "include"
        body: JSON.stringify({
          autor,
          libro,
          estado,
          genero,
        }),
      });
      return response.ok; // Retorna true si la operación fue exitosa
    } catch (error) {
      console.error("Hubo un error: ", error);
      return false;
    }
  };

  const handlePost = async (id, autor, libro, estado, genero) => {
    try {
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Se agrega credentials: "include"
        body: JSON.stringify({
          id,
          autor,
          libro,
          estado,
          genero,
        }),
      });
      return response.ok; // Retorna true si la operación fue exitosa
    } catch (error) {
      console.error("Hubo un error: ", error);
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        credentials: "include", // Se agrega credentials: "include"
      });
      return response.ok; // Retorna true si la operación fue exitosa
    } catch (error) {
      console.error("Hubo un error: ", error);
      return false;
    }
  };

  return {
    handlePost,
    handlePut,
    handleDelete,
  };
};

export default useFetch;