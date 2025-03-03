import React, { useEffect, useState, useMemo } from "react";
import "../NewsBlock/NewsBlock.css";
import trash from "../../assets/images/trash.svg";
import NewsItem from "../NewsItem/NewsItem";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../../store/slices/favoritesSlice";
import NewsHead from "../NewsHead/NewsHead";

const FavoritesNews = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.favorites);

  const [searchValue, setSearchValue] = useState("");
  const [maxNewsOnPage, setMaxNewsOnPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * maxNewsOnPage;
  const endIndex = startIndex + maxNewsOnPage;

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchValue, maxNewsOnPage]);

  const filteredNews = useMemo(() => {
    if (status === "succeeded") {
      return items.filter(
        (el) =>
          el.text.toLowerCase().includes(searchValue.toLowerCase()) ||
          el.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return [];
  }, [items, searchValue, status]);

  const pages = useMemo(
    () => Math.ceil(filteredNews.length / maxNewsOnPage),
    [filteredNews, maxNewsOnPage]
  );

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  if (status === "loading") {
    return <div className="news__loading">Loading favorites...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="newsPage">
      <div className="news">
        <NewsHead
          setMaxNewsOnPage={setMaxNewsOnPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="news__block">
          {filteredNews.slice(startIndex, endIndex).map((el) => (
            <NewsItem key={el.id} el={el} />
          ))}
        </div>
      </div>

      <ReactPaginate
        pageCount={pages} // Общее количество страниц
        pageRangeDisplayed={4} // Количество отображаемых страниц внутри пагинации
        marginPagesDisplayed={1} // Количество отображаемых страниц на краях пагинации
        previousLabel={null}
        nextLabel={null}
        breakLabel={"..."}
        onPageChange={handlePageChange}
        containerClassName={"news__paginate"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default FavoritesNews;
