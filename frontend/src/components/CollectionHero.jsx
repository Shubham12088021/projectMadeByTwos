import "./CollectionHero.css";

function CollectionHero({ title, description, image, overlay = 0.5 }) {
  return (
    <div
      className="collection-hero"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,${overlay}),
            rgba(0,0,0,${overlay})
          ),
          url(${image})
        `,
      }}
    >
      <div className="collection-hero-content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default CollectionHero;
