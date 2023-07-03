import React, { useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import ProductItem from "../ProductItem/ProductItem";
import './ProductList.css';

//* массив продуктов:
const products = [
   {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
   {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
   {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые'},
   {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая'},
   {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые'},
   {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая'},
   {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые'},
   {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая'},
]

//* Функция дя подсчета общей стоимости:
//* редьюс аккмулирует на каждой итерации какой-то результат - кладывает
//* получаем общую стоимоть
const getTotalPrice = (items = []) => {
   return items.reduce((acc, item) => {
       return acc += item.price
   }, 0)
}

const ProductList = () => {
   const[addedItems, setAddedItems] = useState([]); // состояние, в которое сохраняем добавленные продукты - корзина - массив с объектами
//* с помощью useTelegram хука получаем наш объект = tg
   const {tg} = useTelegram();   
//* Функция добавления товара или даления из корзины:
//* в ProductItem мы этот продукт наверх рокидываем(в функции колбэк)
// const onAddHandler = () => {
//    onAdd(product)
// }
//* а здесь его принимаем:
const onAdd = (product) => {
   //* находим по id товар в корзине
    const alreadyAdded = addedItems.find(item => item.id === product.id)
    let newItems = [];
//* если он уже сть, то мы его оттуда удаляем!!!
//* else - если его там нет, то в конец этой корзины товар добавем(развернув при этом все, что там уже были!!)
    if(alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }
//* изменяем состояние на тот массив, который в результате получился!!    
    setAddedItems(newItems);

//* теперь надо показать главную кнопку - то мы здесь делаем:
//* провряем - если корзина пуста, то мы эту кнопку скрываем
//* то есть, если все товар из козины удалили - кнопку н поазываем 
//* в обратном случае мы кнопку показываем!
//* если в орзине есть хоть что-то, то показываем!!
   if(newItems.length === 0) {
      tg.MainButton.hide();
   } else {
      tg.MainButton.show();
//* на кнопку добавляем общую стоимость товаров, на которую мы накликали
      tg.MainButton.setParams({
         text: `Купить ${getTotalPrice(newItems)}`
      })
   }

   }

   return (
      <div className={'list'}>
          {products.map(item => (
            <ProductItem
               product={item}
               onAdd={onAdd}
               className={'item'}
            />
          )) }
      </div>
   )
}

export default ProductList;