import React, { useContext } from "react";
import classes from "./Counter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import CardContext from "../../../store/cart-context";

/**
 * 引入FontAwesome
 *      - 安装依赖
 *          npm i --save @fortawesome/fontawesome-svg-core
 *          npm i --save @fortawesome/free-solid-svg-icons
 *          npm i --save @fortawesome/free-regular-svg-icons
 *          npm i --save @fortawesome/react-fontawesome@latest
 *
 *          yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/react-fontawesome@latest
 *
 *      - 引入组件
 *          import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 *
 *      - 引入图标
 *          import { faPlus } from "@fortawesome/free-solid-svg-icons";
 *
 *      - 使用组件
 */

// 计算器的组件
const Counter = (props) => {
  // 获取CardContext
  const ctx = useContext(CardContext);
  // 添加购物车的函数
  const addButtonHandler = () => {
    ctx.addItem(props.meal);
  };
  // 减少购物车的函数
  const subButtonHandler = () => {
    ctx.removeItem(props.meal);
  };
  return (
    <div className={classes.Counter}>
      {props.meal.amount && props.meal.amount !== 0 ? (
        <>
          <button onClick={subButtonHandler} className={classes.Sub}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className={classes.count}>{props.meal.amount}</span>
        </>
      ) : null}
      <button onClick={addButtonHandler} className={classes.Add}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default Counter;
