import React, { useEffect, useState } from "react";
import { Await } from "react-router-dom";
import CalendarList from "../components/Calendars/CalendarList";
import PageHeading from "../components/Layouts/PageHeading";
import "../assets/root.css";
import "./CalendarPage.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Breadcrumb from "../components/Layouts/Breadcrumb";

const CalendarsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCalendars, setFilteredCalendars] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCalendarsByCategory();
  }, [selectedCategory, currentPage]);

  const fetchCalendarsByCategory = async () => {
    try {
      let url = `http://localhost:8080/api/calendars/?pageNo=${currentPage}`;
      if (selectedCategory !== null) {
        url = `http://localhost:8080/api/calendars/category?categoryId=${selectedCategory}&pageNo=${currentPage}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch calendars by category");
      }
      const data = await response.json();
      setFilteredCalendars(data.data.content);
    } catch (error) {
      console.error("Error fetching calendars by category:", error.message);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0);
  };

  return (
    <React.Fragment>
      <PageHeading />
      <div className="products">
        <div className="custom-container">
          <div className="row">
            <div className="col-md-12">
              <Breadcrumb />
            </div>
            <div className="col-md-12">
              <div className="filters">
                <ul>
                  <li
                    className={selectedCategory === null ? "active" : ""}
                    onClick={() => handleCategoryClick(null)}
                  >
                    All Products
                  </li>
                  {categories.map((category) => (
                    <li
                      key={category.categoryId}
                      className={
                        selectedCategory === category.categoryId ? "active" : ""
                      }
                      onClick={() => handleCategoryClick(category.categoryId)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Await
              resolve={filteredCalendars}
              fallback={<p style={{ textAlign: "center" }}>Loading...</p>}
            >
              {(loadedCalendars) => (
                <>
                  <CalendarList calendars={loadedCalendars} />
                  {loadedCalendars.length === 0 && (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                      No more calendars available.
                    </p>
                  )}
                </>
              )}
            </Await>
            <div className="col-md-12">
              <ul className="pages">
                <li>
                  {currentPage > 0 && (
                    <button
                      onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    >
                      Previous
                    </button>
                  )}
                </li>
                {filteredCalendars.length > 0 && (
                  <li>
                    <button
                      onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarsPage;
