import { LightningElement } from 'lwc';
import myShopStateManager from '../../../state.ts';

export default class App extends LightningElement {
    stateManager = myShopStateManager()

    constructor() {
        super()
        window.stateManager = this.stateManager
        setInterval(() => { window.stateManager.value.changeSale() }, 5000)
    }

    selectGreenBoots() {
        this.stateManager.value.selectItem('boots', 'green')
    }
}