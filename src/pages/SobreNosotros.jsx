import { Layout } from "../components/Layout";

const SobreNosotros = () => {
  return (
    <Layout>
      <div className="container py-4">
        <h1 className="display-6 fw-semibold text-center text-primary mb-4">
          Sobre Nosotros
        </h1>

        <section className="mb-4 p-4 rounded-4 bg-body shadow-sm border border-success">
          <h2 className="h5 px-3 py-1 text-primary mb-3">El proyecto</h2>
          <p className="mb-0 text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi et
            dolores sit exercitationem minus fugit, ipsam facilis quasi repellat
            error, beatae asperiores. Expedita quod mollitia voluptatum libero
            voluptate. Delectus, dolorem.
          </p>
        </section>

        <section className="mb-4 p-4 rounded-4 bg-body shadow-sm border border-success">
          <h2 className="h5 px-3 py-1 text-primary mb-3">
            A quién está dirigido
          </h2>
          <p className="mb-0 text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi et
            dolores sit exercitationem minus fugit, ipsam facilis quasi repellat
            error, beatae asperiores. Expedita quod mollitia voluptatum libero
            voluptate. Delectus, dolorem.
          </p>
        </section>

        <section className="mb-4 p-4 rounded-4 bg-body shadow-sm border border-success">
          <h2 className="h5 px-3 py-1 text-primary mb-3">
            Qué tecnologías o enfoques se usaron
          </h2>
          <p className="mb-0 text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi et
            dolores sit exercitationem minus fugit, ipsam facilis quasi repellat
            error, beatae asperiores. Expedita quod mollitia voluptatum libero
            voluptate. Delectus, dolorem.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export { SobreNosotros };
