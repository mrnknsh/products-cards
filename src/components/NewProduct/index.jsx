import {useEffect, useState} from "react";

export const NewProduct = (props) =>{

    const [addForm, setAddForm] = useState(false)
    const [newName, setNewName] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newBalance, setNewBalance] = useState('')
    const [correctValue, setCorrectValue] = useState('')
    const [newPriceErr, setNewPriceErr] = useState('')
    const [newBalanceErr, setNewBalanceErr] = useState('')

    const addFormStyle = addForm ? 'open' : '';

    const getAddForm = (e) => {
        e.preventDefault()
        setAddForm(true)
        props.openAdd()
        props.onResetActive()
        props.onResetDelAndAdd()
        props.onCloseCard()
    }

    const closeAddForm = (e) => {
        e.preventDefault()
        setAddForm(false)
        props.onDoActive()
        props.onResetBan()
        props.onDoDelAndAdd()
    }

    const enteringName = (e) =>{
        setNewName(e.target.value)
    }
    const enteringImage = (e) =>{
        setNewImage(e.target.value)
    }
    const enteringDescription = (e) =>{
        setNewDescription(e.target.value)
    }
    const enteringPrice = (e) =>{
        setNewPrice(e.target.value)
        if(e.target.value <=0){
            setNewPriceErr('!')
        }
        else (setNewPriceErr(''))
    }
    const enteringBalance = (e) =>{
        setNewBalance(e.target.value)
        if(e.target.value <=0){
            setNewBalanceErr('!')
        }
        else (setNewBalanceErr(''))
    }

    useEffect(()=>{
        if(newName !== '' && newImage !== '' && newDescription !== '' &&  newPrice >0 && newBalance >0){
            setCorrectValue('')
        }
    }, [newName, newImage, newDescription, newPrice, newBalance])

    const addNewProduct = (e) =>{
        e.preventDefault()
        if(newName === '' || newImage === '' || newDescription === '' ||  newPrice <=0 || newBalance <=0){
            setCorrectValue('All fields must be filled correctly')
        }
        else {
            props.onAdd(newName, newImage, newDescription, newPrice, newBalance)
            setAddForm(prev => !prev)
            setNewName('')
            setNewImage('')
            setNewDescription('')
            setNewPrice('')
            setNewBalance('')
            setCorrectValue('')
            props.onDoActive()
            props.onResetBan()
            props.onDoDelAndAdd()
        }
    }

    return(
        <>
            <div className={'containerForBtnAdd'}>
                <button className={'button_style' + ' ' + 'addMore_button_style'} onClick={getAddForm} disabled={props.delAndAdd}>Add new product
                </button>
            </div>
            <form className={addFormStyle}>
                {correctValue && <div style={{color: 'red'}}>{correctValue}</div>}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id={'name'} className={'focus'} value = {newName} onChange={enteringName}/>
                </div>
                <div>
                    <label htmlFor="photo">Photo:</label>
                    <input type="text" id={'photo'} className={'focus'} value = {newImage} onChange={enteringImage}/>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id={'price'} className={'focus'} value = {newPrice} onChange={enteringPrice}/>
                    {newPriceErr && <span style={{color: 'red', margin: '8px', fontSize: '20px'}}>{newPriceErr}</span>}
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id={'quantity'} className={'focus'} value = {newBalance} onChange={enteringBalance}/>
                    {newBalanceErr && <span style={{color: 'red', margin: '8px', fontSize: '20px'}}>{newBalanceErr}</span>}
                </div>
                <div>
                    <label htmlFor="description" style={{verticalAlign: 'top'}}>Description:</label>
                    <textarea id="description" rows="5" value = {newDescription} onChange={enteringDescription}/>
                </div>
                <div className={'OkCancelBtn'}>
                    <button className={'button_style'} onClick={addNewProduct}>Add</button>
                    <button className={'button_style'} onClick={closeAddForm}>Cancel</button>
                </div>
            </form>
        </>
        )
}