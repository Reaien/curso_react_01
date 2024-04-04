import Header from "./components/Header.jsx";
import Guitar from "./components/Guitar.jsx";
import { db } from "./data/db.js";
import { useState } from "react";

function App() {
  //state de db
  //variable, funcion = estado inicial
  const [data, setData] = useState(db);
  //state de carrito
  //variable, funcion = estado inicial
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    const itemsExist = cart.findIndex((guitar) => guitar.id === item.id);
    console.log(itemsExist);
    if (itemsExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemsExist].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      //no existe en el carrito
      //Crear un array nuevo del previo, agregandole el item permite que el [] inicial no cambie, por eso usamos este metodo en vez de un item.push ya que push muta el array original
      setCart([...cart, item]);
    }
  }

  //remover de carrito
  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  return (
    <>
      <Header cart={cart} removeFromCart={removeFromCart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {/*map manda a llamar una vez por cada elemento*/}
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
