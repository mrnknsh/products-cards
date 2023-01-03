import {Store} from "./components/Store";
import arr from './arr.json'
import './App.css';
import {useState} from "react";
import {Header} from "./components/Header";
import {NewProduct} from "./components/NewProduct";

function App() {
    const [products, setProducts] = useState(arr)
    const [descriptionProduct, setDescriptionProduct] = useState([])
    const [count, setCount] = useState(20)
    const [openingCard, setOpeningCard] = useState(false)
    const [active, setActive] = useState(false)
    const [ban, setBan] = useState('')
    const [delAndAdd, setDelAndAdd] = useState(false)


    const onToggle = (id) => {
        const changeChosenState = products.map(item => {
            item.chosen = false
            if (item.id === id) {
                item.chosen = !item.chosen
            }
            return item
        })
        setProducts(changeChosenState)
    }

    const onGettingCard = (id) => {
        const itemForDescription = products.find(item => item.id === id)
        setDescriptionProduct(itemForDescription)
        setOpeningCard(true)
    }

    const cancelAll = () =>{
        const falseChosen = products.map(item => {
                if (item.chosen === true) {
                    item.chosen = !item.chosen
                }
                return item
        })
        setProducts(falseChosen)
        onCloseCard()
    }

    const onCloseCard = () =>{
        setOpeningCard(false)
    }

    const onDelete = (id) => {
        const deletingElem = products.filter(item => item.id !== id)
        const delElNoChosen = deletingElem.map(item =>{
            if (item.chosen === true){
                item.chosen = false
            }
            return item
        })
        setProducts(delElNoChosen)
    }

    const onEdit = (id, name, image, description, price, balance) => {
        const editingElement = products.map(item => {
            if (item.id === id) {
                item.name = name;
                item.image = image;
                item.description = description;
                item.price = price;
                item.balance = balance;
                item.chosen = true
            }
            return item
        })
        setProducts(editingElement)
    }

    const openAdd = () => {
        const allChosenIsFalse = products.map(item => {
            if (item.chosen === true) {
                item.chosen = !item.chosen
            }
            return item
        })
        setProducts(allChosenIsFalse)
        onDoBan()
    }

    const onAdd = (name, image, description, price, balance) => {
        setCount(prev => ++prev)
        const addingElement = [...products,
            {
                "id": count,
                "name": name,
                "image": image,
                "description": description,
                "price": price,
                "balance": balance,
                "chosen": false
            }
        ]
        setProducts(addingElement)
    }

    const onResetActive = () =>{
        setActive(true)
    }

    const onResetDelAndAdd = () =>{
        setDelAndAdd(true)
    }

    const onResetBan = () =>{
        setBan('auto')
    }

    const onDoBan = () =>{
        setBan('none')
    }

    const onDoActive = () =>{
        setActive(false)
    }

    const onDoDelAndAdd = () =>{
        setDelAndAdd(false)
    }


    return (
        <div className="App">
            <Header shopName={'Za Vecher'}/>
            <Store productItems={products} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit}
                   onResetActive = {onResetActive} onDoActive = {onDoActive} onDoBan={onDoBan} onResetBan ={onResetBan}
                   active = {active} ban={ban} onGettingCard= {onGettingCard} descriptionProduct={descriptionProduct}
                   cancelAll={cancelAll} openingCard={openingCard} onCloseCard = {onCloseCard} delAndAdd ={delAndAdd}
                   onResetDelAndAdd={onResetDelAndAdd} onDoDelAndAdd={onDoDelAndAdd}/>
            <NewProduct openAdd={openAdd} onAdd={onAdd} onResetActive = {onResetActive} onDoActive = {onDoActive}
                        onResetBan ={onResetBan} active = {active} ban={ban} onCloseCard = {onCloseCard}
                        delAndAdd ={delAndAdd} onResetDelAndAdd={onResetDelAndAdd} onDoDelAndAdd={onDoDelAndAdd}/>
        </div>

    );
}

export default App;
