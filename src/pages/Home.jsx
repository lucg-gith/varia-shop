import { Layout } from "../components/Layout";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
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

    console.log(product);
  };
  return (
    <Layout>
      <p>This is the Home</p>

      {showPopUp && (
        <section>
          <form>
            <div>
              <label>Title</label>
              <input
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
              ></input>
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
              ></input>
            </div>
            <div>
              <label>Description</label>
              <textarea value={descriptionEdit}></textarea>
            </div>
            <div>
              {/* TODO: incorporar select */}
              <label>Category</label>
              <input
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
              ></input>
            </div>
            <div>
              <label>image</label>
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
              ></input>
            </div>
            <button onClick={console.log("Update")}>Update</button>
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

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <img src={product.image} alt="product image" />
          <p>${product.price}</p>

          <p>{product.description}</p>

          <p>{product.category}</p>
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
        </div>
      ))}
    </Layout>
  );
};

export { Home };
