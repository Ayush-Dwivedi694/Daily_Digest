import React, { useState, useEffect, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = useCallback(async () => {
    setLoading(true);
    setTimeout(async () => {
      const Url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=903f3f45deaa4bd2aa9ca0b7ff7c247e&page=${page}&pageSize=${props.pageSize}`;

      let data = await fetch(Url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    }, 2000);
  }, [page, props.category, props.country, props.pageSize]);

  useEffect(() => {
    document.body.style.backgroundColor = "#F4F6F6";
    updateNews();
  }, [updateNews]);

  const handleNextClick = async () => {
    if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
      setPage(page + 1);
    }
  };

  const handlePrevClick = async () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container my-3">
      <h1
        className="text-center"
        style={{ margin: "20px", color: "Black", fontFamily: "Times New Roman" }}
      >
        <strong>Daily Digest: Top Headlines</strong>
      </h1>

      {loading && <Spinner />}
      
      <div className="row my-3">
        {!loading &&
          articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  date={element.publishedAt}
                  author={element.author}
                />
              </div>
            );
          })}

        {!loading && (
          <>
            <div className="container">
              <div className="d-flex justify-content-between my-4">
                <button
                  disabled={page <= 1}
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePrevClick}
                >
                  &larr; Previous
                </button>
                <button
                  disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNextClick}
                >
                  Next &rarr;
                </button>
              </div>
            </div>

            {/* Footer Section */}
            <footer
              className="text-center mt-4"
              style={{
                padding: "10px",
                backgroundColor: "#f1f1f1",
                borderTop: "1px solid #ccc",
                fontFamily: "Arial",
                fontSize: "14px",
              }}
            >
              <p>&copy; 2024 Daily Digest | All Rights Reserved</p>
              <p>Powered by News API</p>
              <p>Developed By: Ayush Dwivedi</p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
