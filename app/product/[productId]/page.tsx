import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRatings from "./ListRatings";
import { products } from "@/utils/products";

interface IParams {
    productId?: string;
}



const ProductPage = ({ params }: {params: IParams}) => {
    console.log('params', params);

    const product = products.find((item) => item.id === params.productId)
    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>
                <div className="flex flex-col my-20 gap-4">
                    Add Rating
                </div>
                <div>
                    <ListRatings product={product}/>
                </div>
            </Container> 
        </div>
        
    );
}
export default ProductPage;