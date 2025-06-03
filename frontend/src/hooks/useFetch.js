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

  const handlePut = async (idLibros, autor, libro, estado, genero) => {
    try {
      const response = await fetch(`${apiUrl}/${idLibros}`, {
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

  const handlePost = async (idLibros, autor, libro, estado, genero) => {
    try {
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idLibros,
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

  const handleDelete = async (idLibros) => {
    try {
      const response = await fetch(`${apiUrl}/${idLibros}`, {
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