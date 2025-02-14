import { defineState } from '@lwc/state'

export const colors = [
    'aqua', 'blue', 'chartreuse', 'coral', 'gold',
    'green', 'lavender', 'magenta', 'orange', 'plum',
    'red', 'salmon', 'teal', 'yellow'
]
export const items = ['shirt', 'hat', 'boots']

type ItemColor = {
    item: string,
    color: string,
}

type Item = ItemColor & {
    price: number,
}

type Sale = ItemColor & {
    discount: number,
}

type Cart = {
    items: Item[]
}

const randomInt = max => Math.floor(Math.random() * max)

const price = ({ item, color }) =>
    (items.indexOf(item) + 1) * 20 + (colors.indexOf(color) + 1) * 2

const sale = (item_?: string, color_?: string, discount_?: number) => {
  const item = item_ || randomInt(4) < 1 ? '*' : items[randomInt(items.length)]
  const color = color_ || randomInt(4) < 1 ? '*' : colors[randomInt(colors.length)]
  const discount = discount_ || (randomInt(4) + 1) / 10

  return {
      item,
      color,
      discount
  } as Sale
}

export const myShopStateManager = defineState((atom, computed, update, _fromContext) => () => {
    // item currently selected
    const currentItem = atom({
        item: items[0],
        color: colors[0],
        price: price({ item: items[0], color: colors[0] }),
    } as Item)

    // what's currently on sale
    const currentSale = atom(sale())

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
        ({ currentSale: _ }, item?: string, color?: string, discount?: number) => ({
            currentSale: sale(item, color, discount)
        })
    )

    // change the currently selected item
    const selectItem = update(
        { currentItem },
        ({ currentItem: _ }, item: string, color: string) => ({
            currentItem: {
                item,
                color,
                price: price({ item, color })
            }
        })
    )

    // current cart
    const cart = atom({
        items: []
    } as Cart)

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

export default myShopStateManager
