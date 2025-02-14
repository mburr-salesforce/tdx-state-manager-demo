import { LightningElement } from "lwc"
import { colors, items } from '../../../state.ts';

export default class Details extends LightningElement {
    stateManager = window.stateManager

    changeItem(event) {
        this.stateManager.value.selectItem(event.target.value, this.stateManager.value.currentItem.color)
    }

    changeColor(event) {
      this.stateManager.value.selectItem(this.stateManager.value.currentItem.item, event.target.value)
    }

    get colorOptions() {
        return colors.map(c => ({
            name: c,
            selected: c === this.stateManager.value.currentItem.color,
        }))
    }

    get itemOptions() {
        return items.map(i => ({
            name: i,
            selected: i === this.stateManager.value.currentItem.item,
        }))
    }

    get strikethroughPrice() {
        const regularPrice = this.stateManager.value.currentItem.price
        const currentPrice = this.stateManager.value.currentItemPrice
  
        if (regularPrice === currentPrice) {
            return ''
        }
        else {
            return `$${regularPrice.toFixed(2)} `
        }
  
    }
  
    get price() {
        return `$${this.stateManager.value.currentItemPrice.toFixed(2)}`
    }

    styleFor(item) {
        const ci = this.stateManager.value.currentItem
        return `fill: ${ci.color}; stroke: ${ci.color}; display: ${ci.item === item ? 'inline' : 'none'};`
    }

    get iconStyles() {
        return {
            hat: this.styleFor('hat'),
            shirt: this.styleFor('shirt'),
            boots: this.styleFor('boots'),
        }
    }
}