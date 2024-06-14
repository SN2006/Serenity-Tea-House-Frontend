import styles from "./ProductImage.module.css"

const ProductImage = (props) => {
    return <div className={styles["img-box"]}>
        <img src={`http://localhost:8080/products/images/${props.id}`}
             alt="Product Image" />
    </div>
}

export default ProductImage;