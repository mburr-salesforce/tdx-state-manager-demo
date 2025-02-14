import { LightningElement } from "lwc"

export default class Cart extends LightningElement {
    stateManager = window.stateManager

    get itemsInCart() {
        const items = this.stateManager.value.cart.items.length
        return `${items} item${items !== 1 ? 's' : ''}`
    }

    get cartTotal() {
        return `$${this.stateManager.value.cartTotal.toFixed(2)}`
    }
}
