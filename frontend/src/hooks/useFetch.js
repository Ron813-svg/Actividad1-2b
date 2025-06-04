import { apiUrl } from "../api/ApiRestUrl.js";

const useFetch = () => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}`);
      const data = await response.json();
      return data; // Retorna los datos obtenidos
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
      return null;
    }
  };

  const handlePut = async (id, autor, libro, estado, genero) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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
      });
      return response.ok; // Retorna true si la operación fue exitosa
    } catch (error) {
      console.error("Hubo un error: ", error);
      return false;
    }
  };

  return {
    fetchData,
    handlePost,
    handlePut,
    handleDelete,
  };
};

export default useFetch;