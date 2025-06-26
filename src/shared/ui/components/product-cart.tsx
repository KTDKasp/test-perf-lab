import { useState } from "react"
import { ShoppingCart, X } from "lucide-react"

import { Button } from "@/shared/ui/kit/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/kit/drawer"
import { Separator } from "@/shared/ui/kit/separator"
// import { CartItem } from "./cart-item"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: string
}

export default function ProductCart() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
	const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="p-8">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart ({totalItems})
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="fixed inset-y-0 right-0 left-auto mt-0 w-[400px] h-full rounded-none">
          <div className="flex flex-col h-full">
            <DrawerHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <DrawerTitle>Корзина</DrawerTitle>
                  <DrawerDescription>
                    Ваши товары в корзине
                  </DrawerDescription>
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ваша корзина пустая</h3>
                  <p className="text-muted-foreground">Добавьте хотя бы один товар, чтобы оформить заказ.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* {cartItems.map((item) => (
                    <CartItem key={item.id} />
                  ))} */}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <DrawerFooter className="border-t">
                <div className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline" className="w-full">
                      Продолжить покупки
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
