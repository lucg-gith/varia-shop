import { Layout } from "../components/Layout";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/UserContext";
import { SearchBar } from "../components/SearchBar";

import "../styles/pages/home.css";

const Home = () => {
  const { user } = useAuth();
  //#region
  // NOTA: fetch herramienta nativa para hacer peticiones a la api - por defecto usa GET
  // siempre que hay una funcion asincrona hay un await
  // decirle a react que muestre el return y despues cargue los productos - con effecto secundario - useEffect
  //#endregion
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [showPopUp, setShowPopUp] = useState(null);
  const [titleEdit, setTitleEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // NOTA: syntaxis useEffect(() => { aca va lo que se carga de forma secundaria}, [cuantas veces se ejecucuta, si esta vacio se ejecuta una sola vez])
  useEffect(() => {
    fetchingProducts();
  }, []);

  useEffect(() => {
    // NOTA: Actualizamos el valor de filteredProducts
    const prossecingSearch = search.trim().toLowerCase();
    if (!prossecingSearch) {
      setFilteredProducts(products);
      return;
    }

    // [a,v,c,d] -> filterd by v ->  [v]
    const updatedFilteredProducts = products.filter((product) => {
      return String(product.title || "")
        .toLowerCase()
        .includes(prossecingSearch);
    });

    setFilteredProducts(updatedFilteredProducts);
  }, [products, search]);

  // NOTA: Response es una respuesta tecnica de parte del la API, en forma de objeto.

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
    });

    const data = await response.json();
    setProducts(data);
    setFilteredProducts(data);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });

    // NOTA: tenemos a disposicion el estado del producto, no se borra de la base de datos - simulacion de borrado en API - estamos usando API placeholder.
    if (response.ok) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleOpenEdit = (product) => {
    setShowPopUp(true);
    setProductToEdit(product);
    setTitleEdit(product.title);
    setPriceEdit(product.price);
    setDescriptionEdit(product.description);
    setCategoryEdit(product.category);
    setImageEdit(product.image);
  };
  const updatedProduct = {
    title: titleEdit,
    price: Number(priceEdit),
    description: descriptionEdit,
    category: categoryEdit,
    image: imageEdit,
  };

  // NOTA: vamos a hacer una peticion mediante el fetch para modificar los datos del producto -> metodo PATCH(actualizacion parcial) o PUT(si queremos actualizar y no existe lo crea)
  // la documentacion pide PUT

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productToEdit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      // NOTA: version previa del producto
      if (response.ok) {
        const data = await response.json();

        setProducts((prevProduct) =>
          prevProduct.map((product) =>
            product.id === productToEdit.id ? data : product
          )
        );
      }
      // NOTA: cerramos el popup cuando se termina todo el prooceso
      setShowPopUp(null);

      //  if (response.ok) {
      //    const data = await response.json();
      //    // NOTA: find index es un bucle entonces hay que iterarlo
      //    const Index = products.findIndex((product) => product.id === data.id);
      //    setProducts((prevProduct) => prevProduct.splice(Index, data));
      //  } seria para borrar -----------por el splice

      console.log("Producto actualizado:", updatedProduct);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <h1 className="text-center display-6 fw-semibold mb-4 theme-wine">
        Bienvenido a VariaShop
      </h1>

      <section
        className="theme-wine container text-center mb-5
       why-us bg-body border border-2 rounded-4 shadow-sm p-4"
      >
        <h2 className="h5 mb-3 text-center ">Por qué elegirnos</h2>
        <div className="row g-3">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="feature-card border border-2 rounded p-3 h-100 bg-body">
              <div className="fw-semibold mb-1 card-title">Envío rápido</div>
              <p className="small text-muted mb-0 card-description">
                Procesamos pedidos en 24hs
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="feature-card border  border-2 rounded p-3 h-100 bg-body">
              <div className="fw-semibold mb-1 card-title">Pagos seguros</div>
              <p className="small text-muted mb-0 card-description">
                Tus datos siempre protegidos
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="feature-card border  border-2 rounded p-3 h-100 bg-body">
              <div className="fw-semibold mb-1 card-title">
                Calidad garantizada
              </div>
              <p className="small text-muted mb-0 card-description">
                Marcas seleccionadas.
              </p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="feature-card border  border-2 rounded p-3 h-100 bg-body">
              <div className="fw-semibold mb-1 card-title">Soporte 24/7</div>
              <p className="small text-muted mb-0 card-description">
                Siempre disponibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOTA: EditProductComponent */}
      {user && showPopUp && (
        <section className="container mb-4" style={{ padding: "20px 0 5px 0" }}>
          <div
            className="card shadow-sm border-success rounded-4 p-4 bg-body"
            style={{ maxWidth: "500px", margin: "auto" }}
          >
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="fs-5 lh-lg form-label ">Title</label>
                <input
                  type="text"
                  placeholder="Ingrese el titulo"
                  value={titleEdit}
                  onChange={(e) => setTitleEdit(e.target.value)}
                  className="form-control form-control-lg"
                />
              </div>

              <div className="mb-3">
                <label className=" fs-5 lh-lg form-label ">Price</label>
                <input
                  type="number"
                  placeholder="Ingrese el precio"
                  value={priceEdit}
                  onChange={(e) => setPriceEdit(e.target.value)}
                  className="form-control form-control-lg"
                />
              </div>

              <div className="mb-3">
                <label className="fs-5 lh-lg form-label ">Description</label>
                <textarea
                  value={descriptionEdit}
                  onChange={(e) => setDescriptionEdit(e.target.value)}
                  className="form-control"
                  rows="4"
                />
              </div>

              <div className="mb-3 bg-body">
                {/* TODO: incorporar select */}
                <label className="fs-5 lh-lg form-label ">Category</label>
                <input
                  type="text"
                  placeholder="Ingrese la categoria"
                  value={categoryEdit}
                  onChange={(e) => setCategoryEdit(e.target.value)}
                  className="form-control form-control-m"
                />
              </div>

              <div className="mb-3">
                <label className="fs-5 lh-lg form-label ">Image</label>
                <input
                  type="text"
                  placeholder="Ingrese la URL de la imagen"
                  value={imageEdit}
                  onChange={(e) => setImageEdit(e.target.value)}
                  className="form-control form-control-lg"
                />
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-success btn-lg w-100">Update</button>
                <button
                  type="button"
                  onClick={() => setShowPopUp(null)}
                  className="btn btn-outline-secondary btn-lg w-100"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
      {/* NOTA: barra de busqueda controlada */}
      <div className="text-center">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* NOTAL ProductsListComponent */}
      {/* NOTA: grid de Bootstrap con cards para mostrar productos */}
      <div
        className="container py-3 text-start .theme-wine {
  color: #7b1733;
}"
      >
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card h-100 bg-white shadow-sm border border-primary border-opacity-25 rounded-4 card-hover"
            >
              {/* NOTA: imagen con object-fit para mantener proporcion */}
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top p-3 bg-white"
                style={{ height: "150px", objectFit: "contain" }}
              />

              <div className="product-title card-body d-flex flex-column">
                <h6
                  className="card-title text-truncate fw-semibold"
                  title={product.title}
                >
                  {product.title}
                </h6>

                <p
                  className="product-price h6 mb-1 text-primary"
                  style={{ color: "#095373ff" }}
                >
                  ${Number(product.price).toFixed(2)}
                </p>

                <p
                  className="card-text text-muted clamp clamp-5 text-start"
                  style={{
                    color: "#4A4A4A",
                  }}
                >
                  {product.description}
                </p>

                <div
                  className="product-category fw-semibold text-uppercase mb-3 text-primary"
                  style={{ color: "#095373ff" }}
                >
                  {product.category}
                </div>

                {/* NOTA: acciones alineadas abajo de la card */}
                {user && (
                  <div className="mt-auto d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm rounded-pill"
                      onClick={() => handleOpenEdit(product)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm rounded-pill"
                      onClick={() => handleDelete(product.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {!filteredProducts.length && (
          <div className="text-center py-5 text-muted">No hay productos</div>
        )}
      </div>
    </Layout>
  );
};

export { Home };
