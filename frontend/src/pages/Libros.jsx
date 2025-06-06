import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFetchBooks from "../hooks/useFetchBooks";
import useFetch from "../hooks/useFetch";

const Libros = () => {
  const { register, handleSubmit, reset } = useForm();
  const { dataBooks, setDataBooks, getBooks } = useFetchBooks();
  const { handlePost, handlePut, handleDelete } = useFetch();
  const [idLibros, setIdLibros] = useState("");

  // Sincroniza los libros locales con los del hook
  useEffect(() => {
    setDataBooks(dataBooks || []);
  }, [dataBooks, setDataBooks]);

  // Agregar libro
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
      await getBooks();
    }
  };

  // Actualizar libro
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
      setIdLibros("");
      reset({
        autor: "",
        libro: "",
        estado: "",
        genero: "",
      });
      await getBooks();
    }
  };

  // Eliminar libro
  const handleDeleteBook = async (id) => {
    const success = await handleDelete(id);
    if (success) {
      alert("Libro eliminado correctamente");
      await getBooks();
    }
  };

  return (
    <div className="container mt-5">
      <h1>Gestión de Libros</h1>
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
          {dataBooks.map((libro, idx) => (
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
                    setIdLibros(libro.id);
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
