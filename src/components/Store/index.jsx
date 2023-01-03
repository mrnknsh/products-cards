import './style.css'
import {TableHeader} from "../TableHeader";
import {Product} from "../Product/index";
import {useEffect, useState} from "react";

export const Store = (props) => {
    const [gettingId, setGettingId] = useState(null)
    const [gettingForm, setGettingForm] = useState(false)
    const [changingName, setChangingName] = useState('')
    const [changingImage, setChangingImage] = useState('')
    const [changingPrice, setChangingPrice] = useState('')
    const [changingBalance, setChangingBalance] = useState('')
    const [changingDescription, setChangingDescription] = useState('')
    const [newCorrectValue, setNewCorrectValue] = useState('')
    const [priceError, setPriceError] = useState('')
    const [balanceError, setBalanceError] = useState('')
    const [test, setTest] = useState(false)

    const editFormStyle = gettingForm ? 'open' : ''
    const getDescription = props.openingCard ? 'open' : ''


    const onChangingStyle = () => {
        setGettingForm(prev => !prev)
    }

    const editingName = (e) => {
        setChangingName(e.target.value)
    }

    const editingImage = (e) => {
        setChangingImage(e.target.value)
    }

    const editingPrice = (e) => {
        setChangingPrice(e.target.value)
        if (e.target.value <= 0) {
            setPriceError('!')
        } else {
            setPriceError('')
        }
    }

    const editingBalance = (e) => {
        setChangingBalance(e.target.value)
        if (e.target.value <= 0) {
            setBalanceError('!')
        } else {
            setBalanceError('')
        }
    }

    const editingDescription = (e) => {
        setChangingDescription(e.target.value)
    }

    const cancelSelectedItem = () => {
        props.productItems.map(item => {
            if (item.id === gettingId) {
                item.chosen = false
            }
            return item
        })
        props.onDoActive()
    }

    const onFillFields = (id) => {
        const data = props.productItems.find(item => item.id === id)
        setChangingName(data.name)
        setChangingImage(data.image)
        setChangingPrice(data.price)
        setChangingBalance(data.balance)
        setChangingDescription(data.description)
        setGettingId(data.id)

        props.productItems.map(item => {
            item.chosen = item.id === id;
            return item
        })
    }

    const closeDescriptionCard = (e) => {
        e.preventDefault()
        props.cancelAll()
    }

    const closeEditingForm = (e) => {
        e.preventDefault()
        setGettingForm(prev => !prev)
        cancelSelectedItem()
        setTest(false)
        props.onResetBan()
        props.onDoDelAndAdd()
    }

    const close = () => {
        setGettingForm(false)
        setTest(false)
        props.onResetBan()
    }

    const changeProduct = (e) => {
        e.preventDefault()
        if (changingName === '' || changingImage === '' || changingDescription === '' || changingPrice <= 0 || changingBalance <= 0) {
            setNewCorrectValue('All fields must be filled correctly')
        } else {
            props.onEdit(+gettingId, changingName, changingImage, changingDescription, changingPrice, changingBalance)
            setGettingForm(prev => !prev)
            setChangingName('')
            setChangingImage('')
            setChangingPrice('')
            setChangingBalance('')
            setChangingDescription('')
            cancelSelectedItem()
            props.onResetBan()
            setTest(false)
            props.onDoDelAndAdd()
        }
    }

    useEffect(() => {
        if (changingName !== '' && changingImage !== '' && changingDescription !== '' && changingPrice > 0 && changingBalance > 0) {
            setNewCorrectValue('')
        }
    }, [changingName, changingImage, changingDescription, changingPrice, changingBalance])

    const click = (e) =>{
        if(e.target){
            setTest(true)
        }
    }

    useEffect(()=>{
        if(test === true){
            props.onResetActive()
            props.onDoBan()
        }
    }, [test])



    const productElements = props.productItems.map(item => {
        return (
            <Product onChangingStyle={onChangingStyle}
                     {...item}
                     key={item.id}
                     onDelete={() => props.onDelete(item.id)}
                     onToggle={() => props.onToggle(item.id)}
                     onFillFields={() => onFillFields(item.id)}
                     onGettingCard={() => props.onGettingCard(item.id)}
                     onCloseCard={() => props.onCloseCard()}
                     active={props.active}
                     ban={props.ban}
                     onResetDelAndAdd={() => props.onResetDelAndAdd()}
                     delAndAdd={props.delAndAdd}
                     close={() => close()}
            />
        )
    })

    return (
        <>
            <table>
                <thead>
                <TableHeader/>
                </thead>
                <tbody>
                {productElements}
                </tbody>
            </table>
            <div className={getDescription + ' card'}>
                <div className={'cardField'}>
                    <span className={'cardFieldName'}>Name:</span><span
                    className={'cardMeaning'}>{props.descriptionProduct.name}</span>
                </div>
                <div className={'cardField'}>
                    <span className={'cardFieldName'}>Description:</span><span
                    className={'cardMeaning'}>{props.descriptionProduct.description}</span>
                </div>
                <div className={'cardField'}>
                    <span className={'cardFieldName'}>Price:</span><span
                    className={'cardMeaning'}>{props.descriptionProduct.price} byn</span>
                </div>
                <div>
                    <button className={'button_style'} onClick={closeDescriptionCard}>Cancel</button>
                </div>
            </div>
            <form className={editFormStyle}>
                {newCorrectValue && <div style={{color: 'red'}}>{newCorrectValue}</div>}
                <div onClick={click}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id={'name'} className={'focus'} value={changingName} onChange={editingName}/>
                    </div>
                    <div>
                        <label htmlFor="photo">Photo:</label>
                        <input type="text" id={'photo'} className={'focus'} value={changingImage} onChange={editingImage}/>
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input type="number" id={'price'} className={'focus'} value={changingPrice}
                               onChange={editingPrice}/>
                        {priceError && <span style={{color: 'red', margin: '8px', fontSize: '20px'}}>{priceError}</span>}
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="number" id={'quantity'} className={'focus'} value={changingBalance}
                               onChange={editingBalance}/>
                        {balanceError &&
                        <span style={{color: 'red', margin: '8px', fontSize: '20px'}}>{balanceError}</span>}
                    </div>
                    <div>
                        <label htmlFor="description" style={{verticalAlign: 'top'}}>Description:</label>
                        <textarea id="description" rows="5" value={changingDescription} onChange={editingDescription}/>
                    </div>
                </div>
                <div className={'OkCancelBtn'}>
                    <button className={'button_style'} onClick={changeProduct}>Save</button>
                    <button className={'button_style'} onClick={closeEditingForm}>Cancel</button>
                </div>
            </form>
        </>
    )
}