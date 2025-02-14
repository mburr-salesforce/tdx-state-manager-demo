import { LightningElement } from "lwc"

export default class Cart extends LightningElement {
    stateManager = window.stateManager

    get itemsInCart() {
        return this.stateManager.value.cart.items.length
    }

    get cartTotal() {
        return `$${this.stateManager.value.cartTotal.toFixed(2)}`
    }
}
