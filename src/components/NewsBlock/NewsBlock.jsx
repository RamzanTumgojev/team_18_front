import React from "react";
import "./NewsBlock.css";
import view from "../../assets/images/view-card.svg";
import sort from "../../assets/images/sort.svg";
import trash from "../../assets/images/trash.svg";
import NewsItem from '../NewsItem/NewsItem'

export default function NewsBlock() {
  return (
    <div className="news">
      <label>
        <input type="search" placeholder="Введите текст для поиска"></input>
      </label>

      <div className="news__block">
        <p>Имя пользователя</p>
        <div className="icon-block">
          <span>
            <img src={view}></img>
          </span>
          <span>
            <img src={trash}></img>
          </span>
          <span>
            <p>6</p>
          </span>
          <span>
            <img src={sort}></img>
          </span>
        </div>
      </div>
      <div>
        <NewsItem />
      </div>
    </div>
  );
}
