import { LightningElement } from 'lwc';
import createShopStateManager from 'x/shopState';

export default class App extends LightningElement {
    shopState = createShopStateManager()

    constructor() {
        super()
        // Using the window to share the state manager is a temporary hack. Child
        // components will eventually be able to retrieve it from their context
        // or receive it as a property value.
        window.shopState = this.shopState

        // change what's on sale every 10s
        setInterval(() => { window.shopState.value.changeSale() }, 10000)
    }

    selectGreenBoots() {
        this.shopState.value.selectItem('boots', 'green')
    }
}
