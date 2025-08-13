import { Layout } from "../components/Layout";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/UserContext";
import { SearchBar } from "../components/SearchBar";

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
      <p>This is the Home</p>

      {/* NOTA: barra de busqueda controlada */}
      <div className="container mb-3">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* NOTA: EditProductComponent */}
      {user && showPopUp && (
        <section className="container mb-4">
          <form onSubmit={handleUpdate}>
            <div>
              <label>Title</label>
              <input
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              />
            </div>
            <div>
              {/* TODO: incorporar select */}
              <label>Category</label>
              <input
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
            </div>
            <div>
              <label>image</label>
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
            </div>
            <button>Update</button>
          </form>
          <button onClick={() => setShowPopUp(null)}>Cancelar</button>
        </section>
      )}

      {/* NOTAL ProductsListComponent */}
      {/* NOTA: grid de Bootstrap con cards para mostrar productos */}
      <div className="container py-4">
        <div className="row g-3">
          {filteredProducts.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <div className="card h-100 shadow-sm">
                {/* NOTA: imagen con object-fit para mantener proporcion */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top p-3"
                  style={{ height: "220px", objectFit: "contain" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title text-truncate"
                    title={product.title}
                  >
                    {product.title}
                  </h5>

                  <p className="h5 text-primary mb-2">
                    ${Number(product.price).toFixed(2)}
                  </p>

                  <p className="card-text text-muted line-clamp-3 mb-3">
                    {product.description}
                  </p>

                  <div
                    className="fw-semibold text-uppercase mb-3"
                    style={{ color: "#0b84b8ff" }}
                  >
                    {product.category}
                  </div>

                  {/* NOTA: acciones alineadas abajo de la card */}
                  {user && (
                    <div className="mt-auto d-flex gap-2">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleOpenEdit(product)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
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
