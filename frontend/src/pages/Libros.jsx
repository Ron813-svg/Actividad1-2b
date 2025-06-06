import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFetchBooks from "../hooks/useFetchBooks";
import useFetch from "../hooks/useFetch";
import { toast } from "react-hot-toast";
import LibroInput from "../components/LibroInput";
import LibroFormButtons from "../components/LibroFormButtons";

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
      toast.success("Libro agregado correctamente");
      reset();
      await getBooks();
    } else {
      toast.error("Error al agregar el libro");
    }
  };

  // Actualizar libro
  const onUpdate = async (data) => {
    if (!idLibros) {
      toast.error("Selecciona un libro para actualizar");
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
      toast.success("Libro actualizado correctamente");
      setIdLibros("");
      reset({
        autor: "",
        libro: "",
        estado: "",
        genero: "",
      });
      await getBooks();
    } else {
      toast.error("Error al actualizar el libro");
    }
  };

  // Eliminar libro
  const handleDeleteBook = async (id) => {
    const success = await handleDelete(id);
    if (success) {
      toast.success("Libro eliminado correctamente");
      await getBooks();
    } else {
      toast.error("Error al eliminar el libro");
    }
  };

  // Mensaje de error al cargar libros
  useEffect(() => {
    if (!Array.isArray(dataBooks)) {
      toast.error("Error al cargar los libros");
    }
  }, [dataBooks]);

  return (
    <div className="container mt-5">
      <h1>Gestión de Libros</h1>
      <form>
        <LibroInput label="Autor" name="autor" register={register} />
        <LibroInput label="Libro" name="libro" register={register} />
        <LibroInput label="Estado" name="estado" register={register} />
        <LibroInput label="Género" name="genero" register={register} />
        <LibroFormButtons
          onAdd={onAdd}
          onUpdate={onUpdate}
          onCancel={() => {
            reset();
            setIdLibros("");
          }}
          isEditing={idLibros !== ""}
          handleSubmit={handleSubmit}
        />
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
          {Array.isArray(dataBooks) &&
            dataBooks.map((libro, idx) => (
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
