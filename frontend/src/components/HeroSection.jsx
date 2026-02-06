function HeroSection() {
  return (
    <div className="container-fluid p-0">
      <div
        className="d-flex align-items-center"
        style={{
          height: "80vh",
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.45),
              rgba(0,0,0,0.45)
            ),
            url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Left Content */}
        <div className="container text-white">
          <h1 className="fw-bold display-5 mb-3">
            Discover Your Style
          </h1>

          <p className="fs-5 mb-4" style={{ maxWidth: "420px" }}>
            Explore the latest trends in fashion for men, women, and kids —
            curated just for you.
          </p>

          <button
            className="btn fw-bold px-5 py-3"
            style={{
              backgroundColor: "#fff",
              color: "#111",
              borderRadius: "30px",
              letterSpacing: "1px",
            }}
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
