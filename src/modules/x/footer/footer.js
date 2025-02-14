import { LightningElement } from "lwc"

const capitalize = s => s[0].toLocaleUpperCase() + s.substring(1)

const pluralize = s => s.endsWith('s') ? s : `${s}s`

export default class Footer extends LightningElement {
    // temporary hack until fromContext() is available
    shopState = window.shopState

    // returns a message about what's currently on sale
    get saleMessage() {
        const { currentSale } = this.shopState.value

        if (! currentSale.item || ! currentSale.color) {
            return 'Nothing on sale now'
        }

        return `${currentSale.color === '*' ? 'All ' : capitalize(currentSale.color)} ` +
               `${currentSale.item === '*' ? 'items' : pluralize(currentSale.item)}` +
               ` ${currentSale.discount * 100}% off!`
    }
}
