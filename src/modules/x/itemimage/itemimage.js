import { api, LightningElement } from "lwc"

export default class ItemImage extends LightningElement {
    item

    styleFor(i) {
        return `fill: ${this.item.color}; stroke: ${this.item.color}; display: ${this.item.item === i ? 'inline' : 'none'};`
    }

    get iconStyles() {
        return {
            hat: this.styleFor('hat'),
            shirt: this.styleFor('shirt'),
            boots: this.styleFor('boots'),
        }
    }
}