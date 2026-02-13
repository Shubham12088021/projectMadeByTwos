import { useEffect, useState } from "react";
import { BsGrid, BsGrid3X3Gap, BsGrid1X2 } from "react-icons/bs";
import ProductCard from "./ProductCard";
import "./ProductLayout.css";
import TrustSection from "./TrustSection";


const ProductLayout = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [columns, setColumns] = useState(4);
    const [sortOption, setSortOption] = useState("featured");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 16; // 🔥 changed to 16

    useEffect(() => {
        fetch(`http://localhost:5000/api/products?category=${category}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setCurrentPage(1);
            })
            .catch((err) => console.error(err));
    }, [category]);

    /* SORTING */
    const sortedProducts = [...products].sort((a, b) => {
        switch (sortOption) {
            case "az":
                return a.name.localeCompare(b.name);
            case "za":
                return b.name.localeCompare(a.name);
            case "low":
                return a.price - b.price;
            case "high":
                return b.price - a.price;
            default:
                return 0;
        }
    });

    /* PAGINATION */
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentProducts = sortedProducts.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /* GRID */
    const getColClass = () => {
        switch (columns) {
            case 2:
                return "col-md-6";
            case 3:
                return "col-md-4";
            default:
                return "col-md-3";
        }
    };

    return (
        <>
            <div className="layout-wrapper">

                {/* TOP BAR */}
                <div className="top-bar">

                    <select
                        className="sort-dropdown"
                        value={sortOption}
                        onChange={(e) => {
                            setSortOption(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="featured">Featured</option>
                        <option value="az">Alphabetically, A–Z</option>
                        <option value="za">Alphabetically, Z–A</option>
                        <option value="low">Price, Low → High</option>
                        <option value="high">Price, High → Low</option>
                    </select>

                    <div className="grid-toggle-wrapper">
                        <div
                            className={`grid-icon ${columns === 2 ? "active" : ""}`}
                            onClick={() => setColumns(2)}
                        >
                            <BsGrid1X2 />
                        </div>

                        <div
                            className={`grid-icon ${columns === 3 ? "active" : ""}`}
                            onClick={() => setColumns(3)}
                        >
                            <BsGrid3X3Gap />
                        </div>

                        <div
                            className={`grid-icon ${columns === 4 ? "active" : ""}`}
                            onClick={() => setColumns(4)}
                        >
                            <BsGrid />
                        </div>
                    </div>
                </div>

                {/* PRODUCTS */}
                <div className="row g-4">
                    {currentProducts.map((product) => (
                        <div className={getColClass()} key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="pagination-wrapper">

                        <button
                            className="pagination-btn"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            ←
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`pagination-btn ${currentPage === index + 1 ? "active-page" : ""
                                    }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="pagination-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            →
                        </button>

                    </div>
                )}



            </div>
            <TrustSection />
        </>
    );
};

export default ProductLayout;
