import React, { useState } from "react";
import FilterMeals from "./components/FilterMeals/FilterMeals";
import Meals from "./components/Meals/Meals";
import CardContext from "./store/cart-context";
import Cart from "./components/Cart/Cart";

// 模拟一组食物数据
const MEALS_DATA = [
  {
    id: "1",
    title: "汉堡包",
    desc: "百分百纯牛肉配搭爽脆酸瓜洋葱粒与美味番茄酱经典滋味让你无法抵挡！",
    price: 12,
    img: "/img/meals/1.png",
  },
  {
    id: "2",
    title: "双层吉士汉堡",
    desc: "百分百纯牛肉与双层香软芝，加上松软面包及美味酱料，诱惑无人能挡！",
    price: 20,
    img: "/img/meals/2.png",
  },
  {
    id: "3",
    title: "巨无霸",
    desc: "两块百分百纯牛肉，搭配生菜、洋葱等新鲜食材，口感丰富，极致美味！",
    price: 24,
    img: "/img/meals/3.png",
  },
  {
    id: "4",
    title: "麦辣鸡腿汉堡",
    desc: "金黄脆辣的外皮，鲜嫩幼滑的鸡腿肉，多重滋味，一次打动您挑剔的味蕾！",
    price: 21,
    img: "/img/meals/4.png",
  },
  {
    id: "5",
    title: "板烧鸡腿堡",
    desc: "原块去骨鸡排嫩滑多汁，与翠绿新鲜的生菜和香浓烧鸡酱搭配，口感丰富！",
    price: 22,
    img: "/img/meals/5.png",
  },
  {
    id: "6",
    title: "麦香鸡",
    desc: "清脆爽口的生菜，金黄酥脆的鸡肉。营养配搭，好滋味的健康选择！",
    price: 14,
    img: "/img/meals/6.png",
  },
  {
    id: "7",
    title: "吉士汉堡包",
    desc: "百分百纯牛肉与香软芝士融为一体配合美味番茄醬丰富口感一咬即刻涌现！",
    price: 12,
    img: "/img/meals/7.png",
  },
];

const App = () => {
  // 创建一个state用来存储食物列表
  const [mealsData, setMealsData] = useState(MEALS_DATA);

  // 创建一个state，用来存储购物车数据
  /**
   *  1.商品
   *  2.商品总数(totalAmount)
   *  3.商品总价(totalPrice)
   *
   */

  const [cartData, setCardData] = useState({
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  });

  // 创建一个过滤meals的函数
  const filterHandler = (keyword) => {
    const newMealsData = MEALS_DATA.filter(
      (item) => item.title.indexOf(keyword) !== -1
    );
    setMealsData(newMealsData);
  };

  // 向购物车中添加商品
  const addItem = (meal) => {
    // 要添加进购物车的商品
    // 对购物车进行一个复制
    const newCard = { ...cartData };

    // 判断购物车中是否存在该商品
    if (newCard.items.indexOf(meal) === -1) {
      // 将meal添加到购物车中
      newCard.items.push(meal);
      // 修改商品的数量
      meal.amount = 1;
    } else {
      // 增加商品的数量
      meal.amount += 1;
    }

    // 增加总数
    newCard.totalAmount += 1;
    // 增加总金额
    newCard.totalPrice += meal.price;
    // 重新设置购物车
    setCardData(newCard);
  };

  // 减少商品数量
  const removeItem = (meal) => {
    // 复制购物车
    const newCard = { ...cartData };

    // 判断商品减少的数量
    meal.amount -= 1;

    // 检查商品数量是否归零
    if (meal.amount === 0) {
      // 从购物车中移除商品
      newCard.items.splice(newCard.items.indexOf(meal), 1);
    }

    // 修改商品的总数
    newCard.totalAmount -= 1;

    // 修改商品的总金额
    newCard.totalPrice -= meal.price;
    setCardData(newCard);
  };

  const clearCart = () => {
    const newCart = { ...cartData };
    // 购物车中商品数量清零
    newCart.items.forEach((item) => delete item.amount);
    newCart.items = [];
    newCart.totalAmount = 0;
    newCart.totalPrice = 0;

    setCardData(newCart);
  };

  return (
    <CardContext.Provider
      value={{ ...cartData, addItem, removeItem, clearCart }}
    >
      <div>
        <FilterMeals onFilter={filterHandler} />
        <Meals mealsData={mealsData} />
        <Cart />
      </div>
    </CardContext.Provider>
  );
};

export default App;
