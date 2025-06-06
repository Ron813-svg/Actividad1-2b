import React from "react";

const LibroInput = ({ label, name, register, required = true }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input
      type="text"
      className="form-control"
      {...register(name, { required })}
    />
  </div>
);

export default LibroInput;