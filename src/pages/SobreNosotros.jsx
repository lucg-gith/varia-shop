import { Layout } from "../components/Layout";

const SobreNosotros = () => {
  return (
    <Layout>
      <div className="container py-4 theme-wine">
        <h1 className="display-6 fw-semibold text-center  mb-4">
          Sobre Nosotros
        </h1>

        <section className="mb-4 p-4 rounded-4 bg-body shadow-sm border border-success">
          <h2 className="h5 px-3 py-1  mb-3">El proyecto</h2>
          <p className="mb-0 text-muted">
            Varia Shop es una tienda online de prueba que ofrece un catálogo
            interactivo. El objetivo es demostrar una experiencia de usuario
            fluida y responsive, aplicando gestión de estado, hooks, routing
            público y privado, contexto y validación de formularios en React.
          </p>
        </section>

        <section className="mb-4 p-4 rounded-4 bg-body shadow-sm border border-success">
          <h2 className="h5 px-3 py-1  mb-3">A quién está dirigido</h2>
          <p className="mb-0 text-muted">
            Este proyecto forma parte del Trabajo Final del curso Programador
            Web Inicial de la UTN 2025. Está pensado para la evaluación del
            docente, como referencia para otros estudiantes y como pieza de
            portafolio para potenciales clientes.
          </p>
        </section>

        <section className="mb-4 p-4 rounded-4 bg-body shadow-sm border border-success">
          <h2 className="h5 px-3 py-1 mb-3">
            Qué tecnologías o enfoques se usaron
          </h2>

          <ul>
            <li>
              <strong>Entorno de desarrollo:</strong> Visual Studio Code
            </li>
            <li>
              <strong>Framework:</strong> React
            </li>
            <li>
              <strong>Enrutamiento:</strong> React Router DOM (rutas públicas y
              privadas)
            </li>
            <li>
              <strong>Compilación y empaquetado:</strong> Vite
            </li>
            <li>
              <strong>Estilos:</strong> Bootstrap, CSS con media queries para
              diseño responsive
            </li>
            <li>
              <strong>APIs:</strong> FakeStore API para productos y
              autenticación
            </li>
            <li>
              <strong>Enfoques:</strong> Gestión de estado, hooks, Context API,
              validación de formularios en tiempo real
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export { SobreNosotros };
