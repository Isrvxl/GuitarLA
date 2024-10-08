
import { useEffect, useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"
function App() {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item) {
        const itemsExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemsExists >= 0) {
            if (cart[itemsExists].quantify >= 5) return
            const updateCart = [...cart]
            updateCart[itemsExists].quantify++
            setCart(updateCart)
        } else {
            item.quantify = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function decreaseQuantify(id){
        const updateCart = cart.map( item => {
            if(item.id === id && item.quantify > MIN_ITEMS) {
                return {
                    ...item,
                    quantify: item.quantify - 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function increaseQuantify(id){
        const updateCart = cart.map( item => {
            if(item.id === id && item.quantify < MAX_ITEMS) {
                return {
                    ...item,
                    quantify: item.quantify + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function clearCart() {
        setCart([])
    }

    return (
        <> 
        <Header 
            cart={cart}
            removeFromCart={removeFromCart}
            decreaseQuantify={decreaseQuantify}
            increaseQuantify={increaseQuantify}
            clearCart={clearCart}
        />


        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>
            <div className="row mt-5">

            {data.map((guitar) => (
                <Guitar 
                    key={guitar.id}
                    guitar={guitar}
                    addToCart={addToCart}
                />
            ))}

            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>

        </>
    )
}

export default App
