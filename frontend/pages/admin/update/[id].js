import ProductForm from 'entities/Product/ui/ProductForm';

const { BACKEND_URL } = process.env;

export const getServerSideProps = async ({ params: { id } }) => {
  try {
    const response = await fetch(`${BACKEND_URL}/products/${id}`);
    if (!response.ok) return { notFound: true };

    const product = await response.json();
    return { props: { product } };
  } catch (err) {
    return { notFound: true };
  }
};

export default function UpdateProduct({ product }) {
  return <ProductForm isUpdate initialProductState={product} />;
}
