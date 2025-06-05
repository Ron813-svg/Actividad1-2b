import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../hooks/useFetch";

const Libros = () => {
  const { fetchData, handlePost, handlePut, handleDelete } = useFetch(); // Importa las funciones desde useFetch.js
  const { register, handleSubmit, reset } = useForm(); // react-hook-form para manejar el formulario
  const [libros, setLibros] = useState([]); // Estado para almacenar los libros
  const [idLibros, setIdLibros] = useState(""); // Estado para manejar el ID del libro seleccionado

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchData();
      setLibros(data || []);
    };
    loadBooks();
  }, [fetchData]);

  // Manejar el envío del formulario para agregar un libro
  const onAdd = async (data) => {
    const success = await handlePost(
      null,
      data.autor,
      data.libro,
      data.estado,
      data.genero
    );
    if (success) {
      alert("Libro agregado correctamente");
      reset();
      const updatedBooks = await fetchData();
      setLibros(updatedBooks || []);
    }
  };

  // Manejar el envío del formulario para actualizar un libro
  const onUpdate = async (data) => {
    if (!idLibros) {
      alert("Selecciona un libro para actualizar");
      return;
    }
    const success = await handlePut(
      idLibros,
      data.autor,
      data.libro,
      data.estado,
      data.genero
    );
    if (success) {
      alert("Libro actualizado correctamente");
      reset();
      setIdLibros("");
      reset({               // Limpia los campos del formulario
        autor: "",
        libro: "",
        estado: "",
        genero: "",
      });
      const updatedBooks = await fetchData();
      setLibros(updatedBooks || []);
    }
  };

  // Manejar eliminación de un libro
  const handleDeleteBook = async (id) => {
    const success = await handleDelete(id);
    if (success) {
      alert("Libro eliminado correctamente");
      const updatedBooks = await fetchData();
      setLibros(updatedBooks || []);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Gestión de Libros</h1>

      {/* Formulario para agregar o actualizar libros */}
      <form>
        <div className="mb-3">
          <label className="form-label">Autor</label>
          <input
            type="text"
            className="form-control"
            {...register("autor", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Libro</label>
          <input
            type="text"
            className="form-control"
            {...register("libro", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <input
            type="text"
            className="form-control"
            {...register("estado", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Género</label>
          <input
            type="text"
            className="form-control"
            {...register("genero", { required: true })}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={handleSubmit(onAdd)}
          disabled={idLibros !== ""}
        >
          Agregar Libro
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit(onUpdate)}
          disabled={idLibros === ""}
        >
          Actualizar Libro
        </button>
        {idLibros && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              reset();
              setIdLibros("");
            }}
          >
            Cancelar edición
          </button>
        )}
      </form>

      {/* Tabla para mostrar los libros */}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Autor</th>
            <th>Libro</th>
            <th>Estado</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro, idx) => (
            <tr key={libro.id ?? idx}>
              <td>{libro.id}</td>
              <td>{libro.autor}</td>
              <td>{libro.libro}</td>
              <td>{libro.estado}</td>
              <td>{libro.genero}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => {
                    setIdLibros(libro.id); // Usa siempre libro.id
                    reset({
                      autor: libro.autor,
                      libro: libro.libro,
                      estado: libro.estado,
                      genero: libro.genero,
                    });
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteBook(libro.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Libros;
