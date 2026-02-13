import CollectionHero from "./CollectionHero";
import BrandStory from "./BrandStory";
import ProductLayout from "./ProductLayout";
import MovingStrip from "./MovingStrip";

function Mens() {
  return (
    <>
      {/* HERO */}
      <CollectionHero
        overlay={0.55}
        slides={[
          {
            image: "https://tse4.mm.bing.net/th/id/OIP.hw3RcyX4kR_nGn0ejkBwSgHaEK",
            title: "Urban Essentials",
            description: "Minimal, sharp and designed for everyday confidence."
          },
          {
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
            title: "Street Ready",
            description: "Modern fits inspired by street culture and comfort."
          },
          {
            image: "https://tse1.mm.bing.net/th/id/OIP.pFz7OqYIutL-GYODfw8ZrwHaEJ",
            title: "Premium Classics",
            description: "Timeless fashion crafted with premium fabrics."
          }
        ]}
      />

       <MovingStrip />
      

      {/* PRODUCTS SECTION */}
      <ProductLayout category="men" />

      {/* BRAND STORY */}
      <BrandStory />
    </>
  );
}

export default Mens;
