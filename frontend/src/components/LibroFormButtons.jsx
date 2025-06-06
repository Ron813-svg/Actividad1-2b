import React from "react";

const LibroFormButtons = ({
  onAdd,
  onUpdate,
  onCancel,
  isEditing,
  handleSubmit,
}) => (
  <div>
    <button
      type="button"
      className="btn btn-primary me-2"
      onClick={handleSubmit(onAdd)}
      disabled={isEditing}
    >
      Agregar Libro
    </button>
    <button
      type="button"
      className="btn btn-success"
      onClick={handleSubmit(onUpdate)}
      disabled={!isEditing}
    >
      Actualizar Libro
    </button>
    {isEditing && (
      <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={onCancel}
      >
        Cancelar edición
      </button>
    )}
  </div>
);

export default LibroFormButtons;