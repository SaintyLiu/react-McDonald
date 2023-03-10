import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classes from "./FilterMeals.module.css";

const FilterMeals = (props) => {
  const [keyword, setKeyword] = useState("");

  // 通过useEffect来改造练习
  useEffect(() => {
    // 降低数据过滤的次数，提高用户体验
    // 用户输入完了你再过滤，用户输入的过程中，不要过滤
    // 当用户停止输入一秒后，我们才做查询
    // 开启一个定时器的同时，应该关掉上一个
    const timer = setTimeout(() => {
      props.onFilter(keyword);
    }, 1000);

    // 在Effect的回调函数中，可以指定一个函数作为返回值
    // 这个函数称其为清理函数，它会在下次Effect执行前调用
    // 可以在这个函数中，做一些工作来清除上次Effect执行所带来的影响
    return () => {
      clearTimeout(timer);
    };
  }, [keyword, props]);

  const inputChangeHandler = (e) => {
    setKeyword(e.target.value.trim());
  };

  return (
    <div className={classes.FilterMeals}>
      <div className={classes.InputOuter}>
        <input
          value={keyword}
          onChange={inputChangeHandler}
          className={classes.SearchInput}
          type="text"
          placeholder="请输入关键字"
        />
        <FontAwesomeIcon className={classes.SearchIcon} icon={faSearch} />
      </div>
    </div>
  );
};

export default FilterMeals;
