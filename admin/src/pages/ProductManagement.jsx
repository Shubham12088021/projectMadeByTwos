import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./src/config";
import { useNavigate } from "react-router-dom";

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem("adminToken");
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(
                `${BASE_URL}/api/products?page=${page}&limit=8`
            );

            setProducts(data.products);
            setTotalPages(data.totalPages);

            // If page becomes empty after delete
            if (data.products.length === 0 && page > 1) {
                setPage(page - 1);
            }

        } catch (error) {
            console.error("Failed to fetch products");
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?"))
            return;

        try {
            await axios.delete(
                `${BASE_URL}/api/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchProducts();
        } catch (error) {
            alert("Delete failed");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    return (
        <div style={containerStyle}>
            {/* Header */}
            <div style={headerStyle}>
                <div>
                    <h2 style={{ margin: 0 }}>Product Management</h2>
                    <p style={subTitleStyle}>
                        Manage your store products efficiently
                    </p>
                </div>

                <button
                    onClick={() => navigate("/create-product")}
                    style={addButtonStyle}
                >
                    + Add Product
                </button>
            </div>

            {/* Table */}
            <div style={tableContainerStyle}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={theadRow}>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Price</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product._id}
                                style={rowStyle}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background = "#f9fafb")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.background = "white")
                                }
                            >
                                <td style={tdStyle}>{product.name}</td>
                                <td style={tdStyle}>₹{product.price}</td>
                                <td style={tdStyle}>{product.category}</td>
                                <td style={tdStyle}>
                                    <div style={actionWrapper}>
                                        <button
                                            onClick={() =>
                                                navigate(`/edit-product/${product._id}`)
                                            }
                                            style={editButtonStyle}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteProduct(product._id)}
                                            style={deleteButtonStyle}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={paginationStyle}>
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    style={{
                        ...pageBtn,
                        opacity: page === 1 ? 0.5 : 1,
                        cursor: page === 1 ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                        if (page !== 1) {
                            e.target.style.background = "#3b82f6";
                            e.target.style.color = "#fff";
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 6px 15px rgba(59,130,246,0.4)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "#ffffff";
                        e.target.style.color = "#000";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                    }}
                >
                    ← Prev
                </button>


                <div style={pageIndicator}>
                    Page {page} of {totalPages}
                </div>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    style={{
                        ...pageBtn,
                        opacity: page === totalPages ? 0.5 : 1,
                        cursor: page === totalPages ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                        if (page !== totalPages) {
                            e.target.style.background = "#3b82f6";
                            e.target.style.color = "#fff";
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow = "0 6px 15px rgba(59,130,246,0.4)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "#ffffff";
                        e.target.style.color = "#000";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                    }}
                >
                    Next →
                </button>

            </div>
        </div>
    );
}

/* ---------------- STYLES ---------------- */

const containerStyle = {
    padding: "30px",
};

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
};

const subTitleStyle = {
    color: "#6b7280",
    fontSize: "14px",
    marginTop: "4px",
};

const addButtonStyle = {
    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 6px 15px rgba(59,130,246,0.3)",
};

const tableContainerStyle = {
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    overflowX: "auto",
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
};

const theadRow = {
    background: "#f3f4f6",
    textAlign: "left",
};

const thStyle = {
    padding: "16px",
    fontWeight: "600",
    fontSize: "14px",
};

const tdStyle = {
    padding: "16px",
    borderTop: "1px solid #f1f1f1",
};

const rowStyle = {
    transition: "0.2s ease",
};

const actionWrapper = {
    display: "flex",
    gap: "12px",
};

const editButtonStyle = {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
};

const deleteButtonStyle = {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
};

const paginationStyle = {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
};

const pageBtn = {
    padding: "8px 18px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    fontWeight: "600",
    transition: "all 0.25s ease",
};


const pageIndicator = {
    padding: "6px 16px",
    background: "#e5e7eb",
    borderRadius: "20px",
    fontWeight: "600",
};

export default ProductManagement;
