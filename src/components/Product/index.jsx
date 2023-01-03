import './style.css'
import {useEffect, useState} from "react";

export const Product = (props) => {
console.log(props)
    const chosenItemClass = props.chosen ? 'chosenBackground' : ''
    // const closeDescription = props.chosen ? 'chosenDescription' : 'notChosenDescription'

    const deleteProduct = () => {
        const conf = window.confirm(`Are you sure?`)
        if (conf === true) {
            props.onDelete()
            props.onCloseCard()
        }
    }

    const editProduct = () => {
        props.close()
        props.onFillFields()
        props.onChangingStyle()
        props.onCloseCard()
        props.onResetDelAndAdd()
    }

    const changeChosenItem = () => {
        props.onToggle()
        props.onGettingCard()
        props.close()
    }

    return (
        <tr>
            <td className={chosenItemClass + ' name'} style = {{pointerEvents: props.ban}} onClick={changeChosenItem}>{props.name}</td>
            <td className={chosenItemClass} style = {{pointerEvents: props.ban}} onClick={changeChosenItem}><img src={props.image} alt={props.name}/></td>
            <td className={chosenItemClass} style = {{pointerEvents: props.ban}} onClick={changeChosenItem}>{props.price}</td>
            <td className={chosenItemClass} style = {{pointerEvents: props.ban}} onClick={changeChosenItem}>{props.balance}</td>
            <td className={'withoutCell'}>
                <div>
                    <button className={'button_style'} id={props.id} onClick={editProduct}
                            disabled={props.active}>Edit</button>
                    <button className={'button_style'} onClick={deleteProduct} disabled={props.delAndAdd}>Delete</button>
                </div>
                {/*<div className={closeDescription}>{props.description}</div>*/}
            </td>
        </tr>
    )
}