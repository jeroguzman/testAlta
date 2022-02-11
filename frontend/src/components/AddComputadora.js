import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import API from "./API";
import API2 from "./API2";

const AddComputadora = () => {

  const [status, setStatus] = useState("create");

  const [modelo, setModelo] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [marca, setMarca] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [computadoraId, setComputadoraId] = useState(null);
  const [computadoras, setComputadoras] = useState([]);

  useEffect(() => {
    refreshComputadoras();
    refreshMarcas();
  }, []);

  const refreshComputadoras = () => {
    API.get("/")
      .then((res) => {
        setComputadoras(res.data);
      })
      .catch(console.error);
  };

  const refreshMarcas = () => {
    API2.get("/")
      .then((res) => {
        setMarcas(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { modelo, marca, descripcion };
    API.post("/", item).then(() => refreshComputadoras());
  };

  const onUpdate = (id) => {
    let item = { modelo, marca, descripcion };
    API.patch(`/${id}/`, item).then((res) => refreshComputadoras());
    setStatus("create");
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshComputadoras());
  };

  function selectComputadora(id) {
    let item = computadoras.filter((computadoras) => computadoras.id === id)[0];
    setModelo(item.modelo);
    setMarca(item.marca);
    setDescripcion(item.descripcion);
    setComputadoraId(item.id);
    setStatus("update");
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          {status === "create" ? (
          <h3 className="float-left">Agregar Nueva Computadora</h3>
          ) : (
            <h3 className="float-left">Editar Computadora</h3>
          )}
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{computadoraId}Modelo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar Nombre"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Marca</Form.Label>
              <Form.Select 
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              >
                <option>Selecciona Marca</option>
                {marcas && marcas.map((marca) => (
                <option value={marca.id}>{marca.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGenre">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                type="text"
                placeholder="Ingrese Descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>

          {status === "create" ? (
            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Guardar
              </Button>
              <Button
                variant="primary"
                type="button"
                disabled
                className="mx-2"
              >
                Editar
              </Button>
            </div>
          ) : (
            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                className="mx-2"
                disabled
              >
                Guardar
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(computadoraId)}
                className="mx-2"
              >
                Editar
              </Button>
            </div>
          )}
          </Form>
        </div>
        <div className="col-md-8 m">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Modelo</th>
                <th scope="col">Marca</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Editar/Borrar</th>
              </tr>
            </thead>
            <tbody>
              {computadoras.map((comp, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{comp.id}</th>
                    <td> {comp.modelo}</td>
                    <td>{comp.marca}</td>
                    <td>{comp.descripcion}</td>
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectComputadora(comp.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(comp.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddComputadora;