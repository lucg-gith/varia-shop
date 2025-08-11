import { Layout } from "../components/Layout";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/UserContext";

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

      {/* EditProductComponent */}
      {user && showPopUp && (
        <section>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Title</label>
              <input
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              ></textarea>
            </div>
            <div>
              {/* TODO: incorporar select */}
              <label>Category</label>
              <input
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              ></input>
            </div>
            <div>
              <label>image</label>
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              ></input>
            </div>
            <button>Update</button>
          </form>

          <button
            onClick={() => {
              setShowPopUp(null);
            }}
          >
            Cancelar
          </button>
        </section>
      )}

      {/* NOTA: map me devuelve una array - mapear: a cada producto le genero un <div/>.  */}
      {/* NOTA: hay que crear un switch para que aparezca o no el "editando prodcuto" */}

      {/* ProductsListComponent */}
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <img
            style={{ height: "20px", width: "20px" }}
            src={product.image}
            alt="product image"
          />
          <p>${product.price}</p>
          <p>{product.description}</p>
          <p>{product.category}</p>

          {user && (
            <div>
              <button
                onClick={() => {
                  handleOpenEdit(product);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(product.id);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </Layout>
  );
};

export { Home };
