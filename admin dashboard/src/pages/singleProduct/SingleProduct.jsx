import { Link } from "react-router-dom";
import "./singleProduct.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@mui/icons-material";

const SingleProduct = () => {
  return (
    <div className="singleProduct">
      <div className="singleProductTitleContainer">
        <h1>Product</h1>
        <Link to="/newProduct">
          <button className="singleProductCreateButton">Create</button>
        </Link>
      </div>
      <div className="singleProductTop">
        <div className="singleProductTopLeft">
          <Chart data={productData} dataKey="sales" title="Sales Performance" />
        </div>
        <div className="singleProductTopRight">
          <div className="singleProductInfoTop">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
              alt="productImg"
              className="singleProductInfoTopImg"
            />
            <span className="singleProductInfoName">Apple Airpods</span>
          </div>
          <div className="singleProductInfoBottom">
            <div className="singleProductInfoItem">
              <span className="singleProductInfoKey">id:</span>
              <span className="singleProductInfoValue">123</span>
            </div>
            <div className="singleProductInfoItem">
              <span className="singleProductInfoKey">sales:</span>
              <span className="singleProductInfoValue">32</span>
            </div>
            <div className="singleProductInfoItem">
              <span className="singleProductInfoKey">active:</span>
              <span className="singleProductInfoValue">yes</span>
            </div>
            <div className="singleProductInfoItem">
              <span className="singleProductInfoKey">in stock:</span>
              <span className="singleProductInfoValue">no</span>
            </div>
          </div>
        </div>
      </div>
      <div className="singleProductButtom">
        <form className="singleProductButtomForm">
          <div className="singleProductButtomFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder="Apple Airpod" />
            <label>In Stock</label>
            <select name="inStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label>Active</label>
            <select name="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="singleProductButtomFormRight">
            <div className="singleProductButtomFormRightUpload">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                alt="productImage"
                className="singleProductButtomFormRightImage"
              />
              <label for="uploadProductImage">
                <Publish />
              </label>
              <input id="uploadProductImage" type="file" style={{display:"none"}} />
            </div>
            <button className="productUploadButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
