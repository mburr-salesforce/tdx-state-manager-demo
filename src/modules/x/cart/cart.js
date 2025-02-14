import { LightningElement } from "lwc"

export default class Cart extends LightningElement {
    // temporary hack until fromContext() is available
    shopState = window.shopState

    get itemsInCart() {
        const itemCount = this.shopState.value.cart.items.length
        return `${itemCount} item${itemCount !== 1 ? 's' : ''}`
    }

    get cartTotal() {
        return `$${this.shopState.value.cartTotal.toFixed(2)}`
    }
}
