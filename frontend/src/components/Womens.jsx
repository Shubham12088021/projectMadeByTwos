import CollectionHero from "./CollectionHero";
import BrandStory from "./BrandStory";
import ProductLayout from "./ProductLayout";
import MovingStrip from "./MovingStrip";

function Womens() {
  return (
    <>
      {/* HERO */}
      <CollectionHero
        overlay={0.45}
        slides={[
          {
            image: "https://tse1.mm.bing.net/th/id/OIP.p2pMi7fQ9Dl7FTKH7u4eegHaE8",
            title: "Elegant Essentials",
            description:
              "Refined styles designed to elevate your everyday elegance."
          },
          {
            image: "https://tse3.mm.bing.net/th/id/OIP.i2MDujBmf1C9WPhkZVFcWgAAAA",
            title: "Modern Grace",
            description:
              "Soft silhouettes and modern cuts made for confident women."
          },
          {
            image: "https://tse4.mm.bing.net/th/id/OIP.BbbPVzNrA5LMj-7tPI14RgHaEK",
            title: "Timeless Trends",
            description:
              "Classic fashion blended with contemporary trends."
          }
        ]}
      />
       <MovingStrip />

      {/* PRODUCTS (Reusable Layout) */}
      <ProductLayout category="women" />

      {/* BRAND STORY */}
      <BrandStory />
    </>
  );
}

export default Womens;
