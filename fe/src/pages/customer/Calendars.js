import React, { useEffect, useState } from "react";
import { Await } from "react-router-dom";
import CalendarList from "../../components/Calendars/CalendarList";
import PageHeading from "../../components/Layouts/PageHeading";
import "../../assets/root.css";
import "./CalendarPage.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Breadcrumb from "../../components/Layouts/Breadcrumb";
import { fetchCategories } from "../../api/category";
import { fetchCalendarsByCategory } from "../../api/calendar";

const CalendarsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCalendars, setFilteredCalendars] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const calendarsData = await fetchCalendarsByCategory(
          selectedCategory,
          currentPage
        );
        setFilteredCalendars(calendarsData);
      } catch (error) {
        console.error("Error fetching calendars:", error.message);
      }
    };
    fetchCalendars();
  }, [selectedCategory, currentPage]);

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
                    Tất cả
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
                <CalendarList calendars={loadedCalendars} />
              )}
            </Await>
            {/* <div className="col-md-12">
              <ul className="pages">
                <li>
                  {currentPage > 0 && (
                    <button
                      onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    >
                      Tiếp
                    </button>
                  )}
                </li>
                {filteredCalendars.length > 0 && (
                  <li>
                    <button
                      onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    >
                      Sau
                    </button>
                  </li>
                )}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CalendarsPage;
