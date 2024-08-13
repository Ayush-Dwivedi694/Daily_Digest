import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl, date, author }) => {
  const defaultImage = "/default.jpg";

  return (
    <div className="container-sm my-3 mx-3">
      <div className="card text-bg-Light mb-3 shadow-lg p-3 mb-5 bg-body-dark rounded" style={{ height: "450px", display: "flex", flexDirection: "column" }}>
        <img
          src={imageUrl || defaultImage}
          className="card-img-top"
          alt="..."
          style={{
            height: "150px",
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />
        <div className="card-body" style={{ backgroundColor: "GhostWhite" }}>
          <h5 className="card-title">{title}</h5>
          <span className="badge rounded-pill text-bg-success">
            By: {author}
          </span>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              Published at: {new Date(date).toUTCString()}
            </small>
          </p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary "
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
