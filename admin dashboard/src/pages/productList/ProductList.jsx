import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../dummyData";
import { useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [productsData, setProductssData] = useState(productRows);

  const handleUserDelete = (userId) => {
    setProductssData(productsData.filter((item) => item.id !== userId));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListProductData">
            <img
              src={params.row.Img}
              alt="Product Img"
              className="productListImg"
            />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (paaraamss) => {
        return (
          <>
            <Link to={"/product/" + paaraamss.row.id}>
              <button className="productListButton">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDeleteIcon"
              onClick={() => handleUserDelete(paaraamss.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={productsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default ProductList;
