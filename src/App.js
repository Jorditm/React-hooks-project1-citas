import React, { useState, useEffect } from "react";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";

function App() {
  //citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //Array de citas
  const [citas, setCitas] = useState(citasIniciales);

  //Funcion que tome las citas actuales y agregue las nuevas
  const crearCita = (cita) => {
    setCitas([...citas, cita]);
  };

  //useEffect para realizar ciertas operaciones cuando el state cambia
  //para que se ejecute solo una vez hay que pasarle una array vacia []
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  //Funcion que elimina cita por ID
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    setCitas(nuevasCitas);
  };

  //Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Adminsitra tus citas";
  return (
    <div>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            {/* los props crearCita es el formulario para crearcitas qeu va al componente Formulario */}
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              // los props de cita son para pasar una cita individual al componente cita y ahi darle forma
              // los props de eliminarCita es para pasar la lógica de la funcion de borrar la cita hecha más arriba al componente Cita
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
