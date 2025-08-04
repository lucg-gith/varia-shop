import { Layout } from "../components/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div>
        <label>Nombre del producto:</label>
        <input type="text" name="nombre" />
      </div>

      <div>
        <label>Precio:</label>
        <input type="number" name="precio" />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea name="descripcion" rows="4" />
      </div>
      <button>Guardar producto</button>
    </Layout>
  );
};

export { Dashboard };
