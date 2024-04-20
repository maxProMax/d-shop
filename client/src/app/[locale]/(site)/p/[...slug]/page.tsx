export default function Product({ params }: { params: { slug: string } }) {
    return <div>Product - {params.slug}</div>;
}
