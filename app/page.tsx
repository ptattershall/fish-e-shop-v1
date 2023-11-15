import { products } from '../utils/products'
import Container from './components/Container'
import HomeBanner from './components/HomeBanner'
import ProductCard from './components/products/ProductCard'

export default function Home() {

  return (
    <div>
      <Container>
        <div className='p-8'>
          <HomeBanner />
        </div>
        <div className='grid grid-cols-2 md:gris-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gris-cols-6 gap-8'>
          {products.map((products: any) => {
            return <ProductCard data={products}/>;
          })}
        </div>
      </Container>
    </div>
  )
}
