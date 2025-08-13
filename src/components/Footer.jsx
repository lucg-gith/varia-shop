import "../styles/components/Footer.css";

const Footer = () => {
  return (
    <footer>
      <p style={{ color: "white" }}>
        Proyecto creado por
        {/* TODO STYLE: Add padding to the para  graph */}
        <a
          href="https://www.linkedin.com/in/luciagarre/?originalSubdomain=uk"
          target="_blank"
        >
          Lucia Garre
        </a>
      </p>
      <p className="footer-text">
        Trabajo final del Curso Programador Web Inicial - VariaShop - Front End
        Developer - UTN - 2025
      </p>
    </footer>
  );
};

export { Footer };
