import Header from "./components/Header.jsx";
import Guitar from "./components/Guitar.jsx";
import { db } from "./data/db.js";
import { useEffect, useState } from "react";

function App() {
  //crear persistencia en el carrito ([]) y setear si hay datos en localStorage
  const initialCartState = () => {
    //busca si hay algo en localStorage para guardarlo
    const localStorageCart = localStorage.getItem("cart");
    //si tiene algo tomará el string del storage lo parseará a json y si es null mostrará el cart vacio
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  //state de db
  //variable, funcion = estado inicial
  const [data] = useState(db);
  //state de carrito
  //variable, funcion = estado inicial
  //ahora el valor inicial del state va a ser la fx que busca primero si hay o no elementos en el localStorage si no, inicia con el carrito vacio
  const [cart, setCart] = useState(initialCartState);

  function addToCart(item) {
    const itemsExist = cart.findIndex((guitar) => guitar.id === item.id);
    console.log(itemsExist);
    if (itemsExist >= 0) {
      if (cart[itemsExist].quantity >= MAX_ITEMS) return;
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
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  //use effect, cada vez que cambia el state, se ejecutará el setItem
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //remover de carrito
  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  //funcion para incrmenetar item en carrito +1
  function increaseQuantity(id) {
    //creamos copia del arreglo con map, filtramos por item
    const updatedCart = cart.map((item) => {
      //si el id de las guitarras iteradas por map es igual al id clickeado en el carrito y limita la cantidad a 5
      if (item.id === id && item.quantity < MAX_ITEMS) {
        //retorno una copia del item, pero obtengo su quantity y la incremento
        return { ...item, quantity: item.quantity + 1 };
      }
      //devolvemos el item modificado o no
      return item;
    });
    //seteamos las modificaciones que se hicieron
    setCart(updatedCart);
  }

  //funcion para decrementar item -1
  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
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
