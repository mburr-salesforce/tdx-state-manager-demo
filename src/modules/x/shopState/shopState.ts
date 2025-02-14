import { defineState } from '@lwc/state'

// the shop only sells 3 kinds of things
export const items = ['shirt', 'hat', 'boots']

// but they come in lots of colors
export const colors = [
    'aqua', 'blue', 'chartreuse', 'coral', 'gold',
    'green', 'lavender', 'magenta', 'orange', 'plum',
    'red', 'salmon', 'teal', 'yellow'
]

// base type
type ItemColor = {
    item: string,
    color: string,
}

// an item the store sells
type Item = ItemColor & {
    price: number,
}

// what's on sale right now
type Sale = ItemColor & {
    discount: number,
}

// items in the user's cart
type Cart = {
    items: Item[]
}

const randomInt = max => Math.floor(Math.random() * max)

// regular price for an item in a given color
const price = ({ item, color }) =>
    (items.indexOf(item) + 1) * 20 + (colors.indexOf(color) + 1) * 2

// constructs a Sale, either randomly or from the given arguments
const sale = (item_?: string, color_?: string, discount_?: number): Sale => {
  const item = item_ || randomInt(4) < 1 ? '*' : items[randomInt(items.length)]
  const color = color_ || randomInt(4) < 1 ? '*' : colors[randomInt(colors.length)]
  const discount = discount_ || (randomInt(4) + 1) / 10

  return {
      item,
      color,
      discount
  }
}

// Creator function for the state manager for the shop. Each invocation of this function
// creates a new set of state information.
export const createShopStateManager = defineState((atom, computed, update, _fromContext) => () => {
    // item currently selected
    const currentItem = atom<Item>({
        item: items[0],
        color: colors[0],
        price: price({ item: items[0], color: colors[0] }),
    })

    // what's currently on sale
    const currentSale = atom<Sale>(sale())

    // price of the current item, taking currentSale into account
    const currentItemPrice = computed(
        { currentItem, currentSale },
        ({ currentItem, currentSale }: { currentItem: Item, currentSale: Sale}) =>
            currentItem.price *
            ((currentSale.item === '*' || currentItem.item === currentSale.item) &&
             (currentSale.color === '*' || currentItem.color === currentSale.color)
            ? 1 - currentSale.discount
            : 1))

    // change what's on sale, either randomly or to the specified item(s)
    const changeSale = update(
        { currentSale },
        (_, item?: string, color?: string, discount?: number) => ({
            currentSale: sale(item, color, discount)
        })
    )

    // change the currently selected item
    const selectItem = update(
        { currentItem },
        (_, item: string, color: string) => ({
            currentItem: {
                item,
                color,
                price: price({ item, color })
            }
        })
    )

    // current cart
    const cart = atom<Cart>({
        items: []
    })

    // add current item to cart
    const addToCart = update(
        { currentItem, currentItemPrice, cart },
        ({ currentItem, currentItemPrice, cart }) => ({
            cart: {
                items: [
                    ...cart.items,
                    {
                        ...currentItem,
                        price: currentItemPrice,
                    }
                ],
            }
        })
    )

    // empty cart
    const emptyCart = update({ cart }, _ => ({
        cart: {
            items: []
        }
    }))

    // total cost of items in cart
    const cartTotal = computed({ cart }, ({ cart }: { cart: Cart }) =>
        cart.items.reduce((total, item) => total + item.price, 0))

    return {
        addToCart,
        cart,
        cartTotal,
        changeSale,
        currentItem,
        currentItemPrice,
        currentSale,
        emptyCart,
        selectItem
    }
})

export default createShopStateManager
