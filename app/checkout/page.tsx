
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutClient from "./checkoutClient";

const CheckoutPage = () => {
    return (
        <div className="p-8">
            <Container>
                <FormWrap>
                    <CheckoutClient/>
                </FormWrap>
            </Container>
        </div>
    )
    }

export default CheckoutPage;