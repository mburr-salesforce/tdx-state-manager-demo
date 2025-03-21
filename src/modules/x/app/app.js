import { LightningElement } from 'lwc';
import createShopStateManager from 'x/shopState';

export default class App extends LightningElement {
    shopState = createShopStateManager()

    constructor() {
        super()
        // Using the window to share the state manager is a temporary hack. Child
        // components will eventually be able to retrieve it from their context.
        window.shopState = this.shopState

        // change what's on sale every 10s
        setInterval(() => { window.shopState.value.changeSale() }, 10000)
    }

    putCurrentItemOnSale() {
        const { item, color } = this.shopState.value.currentItem
        this.shopState.value.changeSale(item, color)
    }

    selectGreenBoots() {
        this.shopState.value.selectItem('boots', 'green')
    }
}
