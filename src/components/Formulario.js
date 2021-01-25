import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  //Crear state de citas
  //State con los keys que queremos y values vacios
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, setError] = useState(false);

  //funcion que se ejecuta cada vez que el usuario escribe en un input
  const handleChange = (event) => {
    const { value, name } = event.target;
    actualizarCita({ ...cita, [name]: value });
  };

  //extraer los valores
  //declaramos con destructuring para solo nombrar el nombre del valor y no "cita."
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //Cuando el usuario presiona el button
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // 1 - Validar
    // .trim() se encarga de eliminar espacios en blanco al principio y al final del input
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      setError(true);
      return;
    }

    //Eliminar el mensaje de error
    setError(false);

    // 2 - Asignar ID
    cita.id = uuid();

    // 3 - Crear la cita
    //recibimos estos props porque los datos de la cita los tenemos en el componente App, una vez hecha la lógica lo traemos para que onSubmit envie los datos del formulario como cita nueva
    crearCita(cita);

    // 4 - Reinicar el form
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <div>
      <h2>Crear cita</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={handleFormSubmit}>
        <label>Nombre de la mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="nombre de la mascota"
          onChange={handleChange}
          value={mascota}
        />
        <label>Nombre del dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="nombre del dueño de la mascota"
          onChange={handleChange}
          value={propietario}
        />
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={handleChange}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={handleChange}
          value={hora}
        />

        <label>Sintomas</label>

        <textarea
          name="sintomas"
          className="u-full-width"
          onChange={handleChange}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </div>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Formulario;
