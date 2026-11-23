"use client";

import { useEffect, useMemo, useState } from "react";

const TOOLS = [
  {
    id: 1,
    name: "AI Assistant",
    description: "Your intelligent digital assistant.",
    category: "AI Tools",
    icon: "✦",
    color: "violet",
    options: ["AI Chat", "Ask a Question", "Generate Ideas"],
  },
  {
    id: 2,
    name: "Code Studio",
    description: "A clean workspace for developers.",
    category: "Developer",
    icon: "⌘",
    color: "blue",
    options: ["HTML Editor", "CSS Editor", "JavaScript Editor"],
  },
  {
    id: 3,
    name: "QR Generator",
    description: "Create QR codes from text or links.",
    category: "Utilities",
    icon: "▦",
    color: "green",
    options: ["Text to QR", "URL to QR", "Contact QR"],
  },
  {
    id: 4,
    name: "Image Studio",
    description: "Manage and explore your images.",
    category: "Creative",
    icon: "▧",
    color: "pink",
    options: ["Image Preview", "Image Converter", "Image Tools"],
  },
  {
    id: 5,
    name: "JSON Formatter",
    description: "Format and validate JSON data.",
    category: "Developer",
    icon: "{ }",
    color: "orange",
    options: ["Format JSON", "Minify JSON", "Validate JSON"],
  },
  {
    id: 6,
    name: "Text Tools",
    description: "Simple tools for everyday text.",
    category: "Utilities",
    icon: "T",
    color: "cyan",
    options: ["Word Counter", "Case Converter", "Text Cleaner"],
  },
  {
    id: 7,
    name: "AI Writer",
    description: "Create and improve written content.",
    category: "AI Tools",
    icon: "✎",
    color: "violet",
    options: ["Write Content", "Rewrite Text", "Summarize Text"],
  },
  {
    id: 8,
    name: "Color Studio",
    description: "Explore beautiful color combinations.",
    category: "Creative",
    icon: "◉",
    color: "pink",
    options: ["Color Picker", "Gradient Maker", "Color Palette"],
  },
];

const CATEGORIES = [
  "All Tools",
  "AI Tools",
  "Developer",
  "Creative",
  "Utilities",
];

export default function MiyoraApp() {
  const [activeCategory, setActiveCategory] = useState("All Tools");
  const [search, setSearch] = useState("");
  const [selectedTool, setSelectedTool] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState("MIYORA User");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(
        localStorage.getItem("miyora-favorites") || "[]"
      );
      const savedReviews = JSON.parse(
        localStorage.getItem("miyora-reviews") || "[]"
      );
      const savedComments = JSON.parse(
        localStorage.getItem("miyora-comments") || "[]"
      );

      setFavorites(savedFavorites);
      setReviews(savedReviews);
      setComments(savedComments);

      setUserName(
        localStorage.getItem("miyora-username") || "MIYORA User"
      );
    } catch (error) {
      console.error("MIYORA storage error:", error);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("miyora-favorites", JSON.stringify(favorites));
    localStorage.setItem("miyora-reviews", JSON.stringify(reviews));
    localStorage.setItem("miyora-comments", JSON.stringify(comments));
    localStorage.setItem("miyora-username", userName);
  }, [favorites, reviews, comments, userName, ready]);

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const categoryMatch =
        activeCategory === "All Tools" ||
        tool.category === activeCategory;

      const searchMatch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  function toggleFavorite(id) {
    setFavorites((old) =>
      old.includes(id)
        ? old.filter((item) => item !== id)
        : [...old, id]
    );
  }

  function addReview(event) {
    event.preventDefault();
    if (!reviewText.trim()) return;

    setReviews((old) => [
      {
        id: Date.now(),
        name: userName,
        text: reviewText.trim(),
        rating,
        date: new Date().toLocaleDateString(),
      },
      ...old,
    ]);

    setReviewText("");
    setRating(5);
  }

  function addComment(event) {
    event.preventDefault();
    if (!commentText.trim()) return;

    setComments((old) => [
      {
        id: Date.now(),
        name: userName,
        text: commentText.trim(),
        date: new Date().toLocaleDateString(),
      },
      ...old,
    ]);

    setCommentText("");
  }

  function selectOption(option) {
    setSelectedTool(null);
    alert(
      `${option}\n\nThis tool option is ready for its individual feature integration.`
    );
  }

  return (
    <main className="miyora-app">
      {mobileMenu && (
        <div
          className="mi-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside className={`mi-sidebar ${mobileMenu ? "mi-sidebar-open" : ""}`}>
        <div className="mi-brand">
          <div className="mi-logo">M</div>
          <div>
            <strong>MIYORA</strong>
            <span>DIGITAL WORKSPACE</span>
          </div>
          <button
            className="mi-close"
            onClick={() => setMobileMenu(false)}
          >
            ×
          </button>
        </div>

        <div className="mi-label">WORKSPACE</div>

        <nav className="mi-nav">
          {CATEGORIES.map((category, index) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "mi-nav-item mi-nav-active"
                  : "mi-nav-item"
              }
              onClick={() => {
                setActiveCategory(category);
                setMobileMenu(false);
                document
                  .getElementById("mi-tools")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>
                {["▦", "✦", "⌘", "◈", "◉"][index]}
              </span>
              {category === "All Tools" ? "Dashboard" : category}
            </button>
          ))}
        </nav>

        <div className="mi-sidebar-bottom">
          <div className="mi-promo">
            <div className="mi-promo-icon">✧</div>
            <strong>Make something great.</strong>
            <p>Your ideas deserve a beautiful digital space.</p>
          </div>

          <div className="mi-profile">
            <div className="mi-avatar">M</div>
            <div className="mi-profile-text">
              <strong>{userName}</strong>
              <span>Personal Workspace</span>
            </div>
            <button
              className="mi-profile-edit"
              title="Change profile name"
              onClick={() => {
                const next = window.prompt("Enter your display name", userName);
                if (next && next.trim()) setUserName(next.trim());
              }}
            >
              •••
            </button>
          </div>
        </div>
      </aside>

      <section className="mi-main">
        <header className="mi-topbar">
          <button
            className="mi-menu-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Open navigation"
          >
            ☰
          </button>

          <div className="mi-breadcrumb">
            Workspace <span>/</span> <strong>Dashboard</strong>
          </div>

          <div className="mi-top-right">
            <span className="mi-online-dot" />
            <span className="mi-online-text">Workspace ready</span>
            <div className="mi-top-avatar">M</div>
          </div>
        </header>

        <div className="mi-content">
          <section className="mi-hero">
            <div className="mi-hero-content">
              <span className="mi-eyebrow">
                <i /> YOUR SPACE. YOUR TOOLS.
              </span>

              <h1>
                Good things
                <br />
                start <em>here.</em>
              </h1>

              <p>
                A calm and powerful space for your ideas,
                creativity and everyday digital work.
              </p>

              <button
                className="mi-explore"
                onClick={() =>
                  document
                    .getElementById("mi-tools")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore tools <span>↗</span>
              </button>
            </div>

            <div className="mi-hero-art" aria-hidden="true">
              <div className="mi-art-glow" />
              <div className="mi-art-orbit mi-orbit-one" />
              <div className="mi-art-orbit mi-orbit-two" />
              <div className="mi-art-core">M</div>
              <div className="mi-art-float mi-float-one">✦</div>
              <div className="mi-art-float mi-float-two">◈</div>
              <div className="mi-art-float mi-float-three">✧</div>
            </div>
          </section>

          <section className="mi-stats">
            <div className="mi-stat">
              <div className="mi-stat-icon blue-bg">▦</div>
              <div>
                <strong>{TOOLS.length.toString().padStart(2, "0")}</strong>
                <span>Available tools</span>
              </div>
            </div>

            <div className="mi-stat">
              <div className="mi-stat-icon pink-bg">♡</div>
              <div>
                <strong>{favorites.length.toString().padStart(2, "0")}</strong>
                <span>Your favorites</span>
              </div>
            </div>

            <div className="mi-stat">
              <div className="mi-stat-icon green-bg">✦</div>
              <div>
                <strong>{CATEGORIES.length - 1}</strong>
                <span>Collections</span>
              </div>
            </div>
          </section>

          <section className="mi-tools-section" id="mi-tools">
            <div className="mi-section-heading">
              <div>
                <span className="mi-section-eyebrow">DISCOVER</span>
                <h2>
                  Your toolbox<span>.</span>
                </h2>
                <p>Everything you need, beautifully organized.</p>
              </div>

              <div className="mi-search">
                <span>⌕</span>
                <input
                  type="search"
                  placeholder="Search tools..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search tools"
                />
              </div>
            </div>

            <div className="mi-filters">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category
                      ? "mi-filter mi-filter-active"
                      : "mi-filter"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mi-tools-grid">
              {filteredTools.map((tool) => (
                <article className="mi-tool-card" key={tool.id}>
                  <div className="mi-tool-top">
                    <div className={`mi-tool-icon ${tool.color}`}>
                      {tool.icon}
                    </div>

                    <button
                      className={
                        favorites.includes(tool.id)
                          ? "mi-fav mi-fav-active"
                          : "mi-fav"
                      }
                      onClick={() => toggleFavorite(tool.id)}
                      aria-label="Toggle favorite"
                    >
                      {favorites.includes(tool.id) ? "♥" : "♡"}
                    </button>
                  </div>

                  <span className="mi-tool-category">
                    {tool.category}
                  </span>

                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>

                  <button
                    className="mi-open-button"
                    onClick={() => setSelectedTool(tool)}
                  >
                    <span>Open</span>
                    <span>↗</span>
                  </button>
                </article>
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="mi-empty">
                <span>⌕</span>
                <h3>No tools found</h3>
                <p>Try another search or category.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All Tools");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>

          <section className="mi-community">
            <div className="mi-community-heading">
              <span className="mi-section-eyebrow">COMMUNITY</span>
              <h2>Share your thoughts<span>.</span></h2>
              <p>Your feedback helps make MIYORA better.</p>
            </div>

            <div className="mi-community-grid">
              <form className="mi-feedback-card" onSubmit={addReview}>
                <h3>Write a review</h3>
                <p>How is your MIYORA experience?</p>

                <div className="mi-rating">
                  {[1, 2, 3, 4, 5].map((number) => (
                    <button
                      key={number}
                      type="button"
                      className={number <= rating ? "star-active" : ""}
                      onClick={() => setRating(number)}
                      aria-label={`${number} stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea
                  value={reviewText}
                  onChange={(event) => setReviewText(event.target.value)}
                  placeholder="Write your review..."
                  rows={3}
                />

                <button className="mi-submit" type="submit">
                  Publish review ↗
                </button>
              </form>

              <form className="mi-feedback-card" onSubmit={addComment}>
                <h3>Leave a comment</h3>
                <p>Tell us what you think.</p>

                <textarea
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  placeholder="Write a comment..."
                  rows={5}
                />

                <button className="mi-submit" type="submit">
                  Post comment ↗
                </button>
              </form>
            </div>

            <div className="mi-posts">
              <div className="mi-post-column">
                <h3>Latest reviews <span>{reviews.length}</span></h3>
                {reviews.length === 0 ? (
                  <p className="mi-no-posts">No reviews yet. Be the first!</p>
                ) : (
                  reviews.map((review) => (
                    <article className="mi-post" key={review.id}>
                      <div className="mi-post-head">
                        <strong>{review.name}</strong>
                        <span>{review.date}</span>
                      </div>
                      <div className="mi-post-stars">
                        {"★".repeat(review.rating)}
                        <span>{"★".repeat(5 - review.rating)}</span>
                      </div>
                      <p>{review.text}</p>
                    </article>
                  ))
                )}
              </div>

              <div className="mi-post-column">
                <h3>Latest comments <span>{comments.length}</span></h3>
                {comments.length === 0 ? (
                  <p className="mi-no-posts">No comments yet. Start a conversation!</p>
                ) : (
                  comments.map((comment) => (
                    <article className="mi-post" key={comment.id}>
                      <div className="mi-post-head">
                        <strong>{comment.name}</strong>
                        <span>{comment.date}</span>
                      </div>
                      <p>{comment.text}</p>
                    </article>
                  ))
                )}
              </div>
            </div>
          </section>

          <footer className="mi-footer">
            <span>© 2026 MIYORA</span>
            <span>Designed for a better digital day <b>✦</b></span>
          </footer>
        </div>
      </section>

      {selectedTool && (
        <div
          className="mi-modal-backdrop"
          onClick={() => setSelectedTool(null)}
        >
          <section
            className="mi-options-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="mi-modal-close"
              onClick={() => setSelectedTool(null)}
              aria-label="Close options"
            >
              ×
            </button>

            <div className={`mi-tool-icon mi-modal-icon ${selectedTool.color}`}>
              {selectedTool.icon}
            </div>

            <span className="mi-section-eyebrow">MIYORA WORKSPACE</span>
            <h2>{selectedTool.name}</h2>
            <p>{selectedTool.description}</p>

            <div className="mi-option-list">
              {selectedTool.options.map((option, index) => (
                <button
                  key={option}
                  className="mi-option-item"
                  onClick={() => selectOption(option)}
                >
                  <span className="mi-option-number">
                    0{index + 1}
                  </span>
                  <strong>{option}</strong>
                  <span className="mi-option-arrow">↗</span>
                </button>
              ))}
            </div>

            <span className="mi-modal-note">
              Choose an option to continue.
            </span>
          </section>
        </div>
      )}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        button, input, textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .miyora-app {
          --mi-bg: #f5f6fa;
          --mi-white: #ffffff;
          --mi-ink: #171923;
          --mi-muted: #858a98;
          --mi-line: #e9eaf0;
          min-height: 100vh;
          display: flex;
          background: var(--mi-bg);
          color: var(--mi-ink);
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .mi-sidebar {
          width: 250px;
          min-width: 250px;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 26px 18px 17px;
          background: #fff;
          border-right: 1px solid var(--mi-line);
          z-index: 20;
        }

        .mi-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0 6px;
          margin-bottom: 52px;
        }

        .mi-logo {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          color: #fff;
          font-size: 23px;
          font-weight: 800;
          background: linear-gradient(145deg, #363c4c, #090a0e);
          box-shadow: 0 6px 16px #10131c24;
        }

        .mi-brand strong {
          display: block;
          font-size: 16px;
          letter-spacing: 2px;
        }

        .mi-brand span {
          display: block;
          margin-top: 4px;
          color: #9a9eaa;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .mi-label {
          padding: 0 10px;
          margin-bottom: 12px;
          color: #a1a5b0;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .mi-nav {
          display: grid;
          gap: 7px;
        }

        .mi-nav-item {
          display: flex;
          align-items: center;
          gap: 13px;
          width: 100%;
          padding: 12px;
          border: 0;
          border-radius: 12px;
          background: transparent;
          color: #747987;
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          transition: .2s;
        }

        .mi-nav-item span {
          width: 20px;
          text-align: center;
          font-size: 18px;
        }

        .mi-nav-item:hover {
          background: #f5f6fa;
          color: #222735;
        }

        .mi-nav-active {
          color: #2869e9;
          background: #edf3ff;
        }

        .mi-sidebar-bottom {
          margin-top: auto;
        }

        .mi-promo {
          padding: 16px;
          margin-bottom: 17px;
          border: 1px solid #e9ecf4;
          border-radius: 16px;
          background: linear-gradient(145deg, #f9faff, #f0f4ff);
        }

        .mi-promo-icon {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          margin-bottom: 12px;
          border-radius: 10px;
          background: #fff;
          color: #3778f3;
        }

        .mi-promo strong {
          font-size: 10px;
        }

        .mi-promo p {
          margin: 7px 0 0;
          color: #9298a7;
          font-size: 9px;
          line-height: 1.6;
        }

        .mi-profile {
          display: flex;
          align-items: center;
          gap: 9px;
          padding-top: 13px;
          border-top: 1px solid var(--mi-line);
        }

        .mi-avatar, .mi-top-avatar {
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #e9efff;
          color: #3674ed;
          font-size: 12px;
          font-weight: 800;
        }

        .mi-profile-text {
          min-width: 0;
          flex: 1;
        }

        .mi-profile-text strong, .mi-profile-text span {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .mi-profile-text strong {
          font-size: 10px;
        }

        .mi-profile-text span {
          margin-top: 4px;
          color: #9b9eaa;
          font-size: 8px;
        }

        .mi-profile-edit {
          border: 0;
          background: transparent;
          color: #9297a4;
        }

        .mi-close, .mi-menu-button {
          display: none;
        }

        .mi-main {
          flex: 1;
          min-width: 0;
        }

        .mi-topbar {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          background: #ffffffdd;
          border-bottom: 1px solid var(--mi-line);
        }

        .mi-breadcrumb {
          color: #999eaa;
          font-size: 10px;
        }

        .mi-breadcrumb span {
          padding: 0 9px;
          color: #c4c7d0;
        }

        .mi-breadcrumb strong {
          color: #303442;
        }

        .mi-top-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mi-online-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #35c98a;
          box-shadow: 0 0 0 4px #35c98a18;
        }

        .mi-online-text {
          margin-right: 8px;
          color: #8b909e;
          font-size: 9px;
        }

        .mi-content {
          width: min(1250px, 100%);
          padding: 34px 40px 20px;
          margin: auto;
        }

        .mi-hero {
          position: relative;
          min-height: 280px;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 37px 45px;
          border-radius: 25px;
          color: #fff;
          background:
            radial-gradient(circle at 78% 42%, #3a5d9a 0, transparent 30%),
            linear-gradient(112deg, #171b27, #202c43 68%, #192237);
          box-shadow: 0 15px 35px #202c431c;
        }

        .mi-hero-content {
          position: relative;
          z-index: 2;
          max-width: 440px;
        }

        .mi-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #a9b7d1;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .mi-eyebrow i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #70a6ff;
          box-shadow: 0 0 12px #70a6ff;
        }

        .mi-hero h1 {
          margin: 17px 0 9px;
          font-size: clamp(36px, 4.2vw, 52px);
          line-height: 1.08;
          letter-spacing: -2.5px;
        }

        .mi-hero h1 em {
          color: #9ab9ff;
          font-style: normal;
        }

        .mi-hero-content p {
          max-width: 340px;
          color: #b1bbce;
          font-size: 10px;
          line-height: 1.8;
        }

        .mi-explore {
          display: inline-flex;
          align-items: center;
          gap: 22px;
          margin-top: 14px;
          padding: 12px 16px;
          border: 0;
          border-radius: 10px;
          background: #fff;
          color: #202638;
          font-size: 10px;
          font-weight: 800;
          transition: .2s;
        }

        .mi-explore:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px #0003;
        }

        .mi-explore span {
          font-size: 15px;
        }

        .mi-hero-art {
          position: absolute;
          top: 0;
          right: 40px;
          width: 330px;
          height: 280px;
          display: grid;
          place-items: center;
        }

        .mi-art-glow {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: #477eea;
          filter: blur(75px);
          opacity: .55;
        }

        .mi-art-orbit {
          position: absolute;
          width: 215px;
          height: 215px;
          border: 1px solid #ffffff25;
          border-radius: 50%;
          transform: rotateX(65deg) rotate(-20deg);
        }

        .mi-orbit-two {
          width: 260px;
          height: 260px;
          transform: rotateX(65deg) rotate(45deg);
          border-color: #90b4ff35;
        }

        .mi-art-core {
          width: 105px;
          height: 105px;
          display: grid;
          place-items: center;
          border: 1px solid #ffffff55;
          border-radius: 32px;
          background: linear-gradient(145deg, #ffffff3a, #ffffff08);
          backdrop-filter: blur(15px);
          box-shadow: 0 20px 60px #0004, inset 0 1px #ffffff66;
          color: #fff;
          font-size: 55px;
          font-weight: 800;
          transform: rotate(-9deg);
        }

        .mi-art-float {
          position: absolute;
          width: 37px;
          height: 37px;
          display: grid;
          place-items: center;
          border: 1px solid #ffffff35;
          border-radius: 13px;
          background: #ffffff18;
          backdrop-filter: blur(8px);
          color: #c3d6ff;
          font-size: 18px;
        }

        .mi-float-one { top: 45px; right: 55px; }
        .mi-float-two { bottom: 53px; right: 60px; }
        .mi-float-three { left: 22px; top: 110px; }

        .mi-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin: 21px 0 40px;
        }

        .mi-stat {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 16px 18px;
          border: 1px solid var(--mi-line);
          border-radius: 16px;
          background: #fff;
        }

        .mi-stat-icon {
          width: 39px;
          height: 39px;
          flex: 0 0 39px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          font-size: 18px;
        }

        .blue-bg { background: #f0f4ff; color: #477df0; }
        .pink-bg { background: #fff0f5; color: #e46c9a; }
        .green-bg { background: #e6f8f0; color: #21a775; }

        .mi-stat strong, .mi-stat span {
          display: block;
        }

        .mi-stat strong {
          font-size: 19px;
          letter-spacing: -.7px;
        }

        .mi-stat div span {
          margin-top: 4px;
          color: #969ba8;
          font-size: 8px;
        }

        .mi-section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
        }

        .mi-section-eyebrow {
          color: #9298a6;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.6px;
        }

        .mi-section-heading h2, .mi-community-heading h2 {
          margin: 8px 0 6px;
          font-size: 27px;
          letter-spacing: -1.2px;
        }

        .mi-section-heading h2 span, .mi-community-heading h2 span {
          color: #4380f6;
        }

        .mi-section-heading p, .mi-community-heading p {
          color: #959aa7;
          font-size: 10px;
        }

        .mi-search {
          width: 230px;
          height: 42px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 12px;
          border: 1px solid var(--mi-line);
          border-radius: 11px;
          background: #fff;
        }

        .mi-search > span {
          color: #858c9c;
          font-size: 22px;
        }

        .mi-search input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #171923;
          font-size: 10px;
        }

        .mi-filters {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 22px 0 16px;
          scrollbar-width: none;
        }

        .mi-filters::-webkit-scrollbar {
          display: none;
        }

        .mi-filter {
          flex: 0 0 auto;
          padding: 9px 14px;
          border: 1px solid #e9eaf0;
          border-radius: 9px;
          background: #fff;
          color: #858b99;
          font-size: 9px;
          font-weight: 700;
          transition: .2s;
        }

        .mi-filter:hover {
          border-color: #a9c4ff;
        }

        .mi-filter-active {
          border-color: #222b3d;
          background: #222b3d;
          color: #fff;
        }

        .mi-tools-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .mi-tool-card {
          min-width: 0;
          min-height: 212px;
          display: flex;
          flex-direction: column;
          padding: 16px;
          border: 1px solid var(--mi-line);
          border-radius: 17px;
          background: #fff;
          transition: transform .22s, box-shadow .22s, border-color .22s;
        }

        .mi-tool-card:hover {
          transform: translateY(-4px);
          border-color: #d6e2fb;
          box-shadow: 0 13px 30px #273c6810;
        }

        .mi-tool-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mi-tool-icon {
          width: 43px;
          height: 43px;
          flex: 0 0 43px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          font-size: 20px;
          font-weight: 700;
        }

        .mi-tool-icon.violet { background: #f1eaff; color: #8759d8; }
        .mi-tool-icon.blue { background: #e9f1ff; color: #3779e9; }
        .mi-tool-icon.green { background: #e6f8f0; color: #21a775; }
        .mi-tool-icon.pink { background: #fff0f5; color: #e46c9a; }
        .mi-tool-icon.orange { background: #fff2e7; color: #e38b3d; }
        .mi-tool-icon.cyan { background: #e8f8fc; color: #2599b7; }

        .mi-fav {
          width: 30px;
          height: 30px;
          border: 1px solid #f0f0f4;
          border-radius: 50%;
          background: #fff;
          color: #a2a6b1;
          font-size: 16px;
          transition: .2s;
        }

        .mi-fav:hover, .mi-fav-active {
          color: #ec6489;
          background: #fff1f5;
          border-color: #ffe0e9;
        }

        .mi-tool-category {
          margin-top: 16px;
          color: #9a9eaa;
          font-size: 8px;
        }

        .mi-tool-card h3 {
          margin: 8px 0 6px;
          color: #272b38;
          font-size: 12px;
          letter-spacing: -.2px;
        }

        .mi-tool-card > p {
          min-height: 29px;
          margin: 0 0 14px;
          color: #989daa;
          font-size: 9px;
          line-height: 1.6;
        }

        .mi-open-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding: 10px 12px;
          border: 1px solid #e9edf5;
          border-radius: 9px;
          background: #f9faff;
          color: #3c65ac;
          font-size: 9px;
          font-weight: 800;
          transition: .2s;
        }

        .mi-open-button:hover {
          border-color: #3478f6;
          background: #3478f6;
          color: #fff;
        }

        .mi-open-button span:last-child {
          font-size: 15px;
        }

        .mi-empty {
          padding: 45px 20px;
          border: 1px dashed #dfe3ec;
          border-radius: 17px;
          background: #fff;
          text-align: center;
        }

        .mi-empty > span {
          color: #7b9fe5;
          font-size: 35px;
        }

        .mi-empty h3 {
          margin: 10px 0 6px;
          font-size: 14px;
        }

        .mi-empty p {
          color: #999eaa;
          font-size: 10px;
        }

        .mi-empty button {
          margin-top: 12px;
          padding: 10px 15px;
          border: 0;
          border-radius: 9px;
          background: #edf3ff;
          color: #3478f6;
          font-size: 10px;
          font-weight: 700;
        }

        .mi-community {
          margin-top: 48px;
        }

        .mi-community-heading {
          margin-bottom: 18px;
        }

        .mi-community-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
        }

        .mi-feedback-card {
          min-width: 0;
          padding: 19px;
          border: 1px solid var(--mi-line);
          border-radius: 17px;
          background: #fff;
        }

        .mi-feedback-card h3 {
          margin: 0 0 6px;
          font-size: 13px;
        }

        .mi-feedback-card > p {
          margin: 0 0 13px;
          color: #989daa;
          font-size: 9px;
        }

        .mi-rating {
          display: flex;
          gap: 5px;
          margin-bottom: 12px;
        }

        .mi-rating button {
          padding: 0;
          border: 0;
          background: transparent;
          color: #d8dbe2;
          font-size: 22px;
        }

        .mi-rating button.star-active {
          color: #f2b84b;
        }

        .mi-feedback-card textarea {
          width: 100%;
          resize: vertical;
          padding: 12px;
          border: 1px solid #e9eaf0;
          border-radius: 10px;
          outline: none;
          color: #242836;
          background: #fafbfe;
          font-size: 10px;
          line-height: 1.6;
        }

        .mi-feedback-card textarea:focus {
          border-color: #8eb2ff;
          background: #fff;
        }

        .mi-submit {
          width: 100%;
          margin-top: 10px;
          padding: 11px;
          border: 0;
          border-radius: 10px;
          background: #202b40;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          transition: .2s;
        }

        .mi-submit:hover {
          background: #3478f6;
        }

        .mi-posts {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
          margin-top: 20px;
        }

        .mi-post-column {
          min-width: 0;
          padding: 17px;
          border: 1px solid var(--mi-line);
          border-radius: 16px;
          background: #fff;
        }

        .mi-post-column > h3 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 0 13px;
          font-size: 12px;
        }

        .mi-post-column > h3 span {
          display: grid;
          place-items: center;
          min-width: 23px;
          height: 23px;
          padding: 0 5px;
          border-radius: 8px;
          background: #edf3ff;
          color: #3478f6;
          font-size: 9px;
        }

        .mi-post {
          padding: 12px 0;
          border-top: 1px solid #f0f1f5;
        }

        .mi-post-head {
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }

        .mi-post-head strong {
          color: #343948;
          font-size: 10px;
        }

        .mi-post-head span {
          color: #a0a5b1;
          font-size: 8px;
        }

        .mi-post > p {
          margin: 8px 0 0;
          color: #737987;
          font-size: 10px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .mi-post-stars {
          margin-top: 7px;
          color: #f2b84b;
          font-size: 11px;
          letter-spacing: 2px;
        }

        .mi-post-stars span {
          color: #e2e4e9;
        }

        .mi-no-posts {
          padding: 14px 0;
          border-top: 1px solid #f0f1f5;
          color: #a0a5b1;
          font-size: 10px;
          line-height: 1.6;
        }

        .mi-footer {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 23px 0 8px;
          margin-top: 34px;
          border-top: 1px solid var(--mi-line);
          color: #a2a6b1;
          font-size: 9px;
        }

        .mi-footer b {
          color: #5487ed;
        }

        .mi-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: grid;
          place-items: center;
          padding: 20px;
          background: #10152280;
          backdrop-filter: blur(9px);
        }

        .mi-options-modal {
          position: relative;
          width: min(420px, 100%);
          padding: 29px;
          border: 1px solid #ffffffaa;
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 25px 80px #0003;
          animation: mi-modal-in .22s ease-out;
        }

        @keyframes mi-modal-in {
          from { opacity: 0; transform: translateY(12px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .mi-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 31px;
          height: 31px;
          border: 0;
          border-radius: 50%;
          background: #f2f3f7;
          color: #777e8d;
          font-size: 20px;
        }

        .mi-modal-icon {
          margin-bottom: 18px;
        }

        .mi-options-modal h2 {
          margin: 9px 0 7px;
          font-size: 23px;
          letter-spacing: -.8px;
        }

        .mi-options-modal > p {
          color: #969ba7;
          font-size: 10px;
          line-height: 1.7;
        }

        .mi-option-list {
          display: grid;
          gap: 9px;
          margin-top: 22px;
        }

        .mi-option-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 14px;
          border: 1px solid #eceef3;
          border-radius: 12px;
          background: #fff;
          text-align: left;
          transition: .2s;
        }

        .mi-option-item:hover {
          border-color: #b9d0ff;
          background: #f7f9ff;
        }

        .mi-option-number {
          color: #a1a6b2;
          font-size: 9px;
        }

        .mi-option-item strong {
          flex: 1;
          color: #343948;
          font-size: 10px;
        }

        .mi-option-arrow {
          color: #5486e7;
          font-size: 16px;
        }

        .mi-modal-note {
          display: block;
          margin-top: 17px;
          color: #a0a4ae;
          text-align: center;
          font-size: 9px;
        }

        .mi-overlay {
          display: none;
        }

        @media (max-width: 1100px) {
          .mi-tools-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .mi-content {
            padding-inline: 26px;
          }

          .mi-topbar {
            padding-inline: 26px;
          }

          .mi-hero-art {
            right: 0;
          }
        }

        @media (max-width: 760px) {
          .mi-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            width: 275px;
            min-width: 275px;
            transform: translateX(-105%);
            transition: transform .25s ease;
            box-shadow: 15px 0 40px #0001;
          }

          .mi-sidebar.mi-sidebar-open {
            transform: translateX(0);
          }

          .mi-overlay {
            position: fixed;
            inset: 0;
            z-index: 19;
            display: block;
            background: #11182766;
            backdrop-filter: blur(3px);
          }

          .mi-close {
            display: block;
            margin-left: auto;
            border: 0;
            background: transparent;
            color: #888;
            font-size: 25px;
          }

          .mi-menu-button {
            display: grid;
            place-items: center;
            width: 35px;
            height: 35px;
            border: 1px solid var(--mi-line);
            border-radius: 10px;
            background: #fff;
            color: #343948;
          }

          .mi-topbar {
            height: 63px;
            padding: 0 15px;
            gap: 10px;
          }

          .mi-breadcrumb {
            flex: 1;
            font-size: 9px;
          }

          .mi-online-text {
            display: none;
          }

          .mi-content {
            padding: 18px 15px;
          }

          .mi-hero {
            min-height: 280px;
            padding: 28px 23px;
            align-items: flex-start;
          }

          .mi-hero h1 {
            font-size: 38px;
          }

          .mi-hero-content p {
            max-width: 235px;
            font-size: 9px;
          }

          .mi-hero-art {
            width: 165px;
            height: 150px;
            right: -25px;
            top: 130px;
            opacity: .65;
          }

          .mi-art-core {
            width: 65px;
            height: 65px;
            border-radius: 20px;
            font-size: 34px;
          }

          .mi-art-orbit {
            width: 130px;
            height: 130px;
          }

          .mi-orbit-two {
            width: 160px;
            height: 160px;
          }

          .mi-float-one { top: 5px; right: 34px; }
          .mi-float-two { bottom: 8px; right: 30px; }
          .mi-float-three { left: 4px; top: 60px; }

          .mi-stats {
            gap: 8px;
            margin: 14px 0 33px;
          }

          .mi-stat {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 11px;
            border-radius: 13px;
          }

          .mi-stat-icon {
            width: 31px;
            height: 31px;
            flex-basis: 31px;
            border-radius: 9px;
            font-size: 15px;
          }

          .mi-stat strong {
            font-size: 15px;
          }

          .mi-stat div span {
            font-size: 7px;
          }

          .mi-section-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .mi-section-heading h2, .mi-community-heading h2 {
            font-size: 24px;
          }

          .mi-search {
            width: 100%;
          }

          .mi-tools-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 9px;
          }

          .mi-tool-card {
            min-height: 205px;
            padding: 12px;
            border-radius: 14px;
          }

          .mi-tool-icon {
            width: 37px;
            height: 37px;
            flex-basis: 37px;
            border-radius: 11px;
          }

          .mi-tool-card h3 {
            font-size: 11px;
          }

          .mi-tool-card > p {
            font-size: 8px;
          }

          .mi-community {
            margin-top: 36px;
          }

          .mi-community-grid, .mi-posts {
            grid-template-columns: 1fr;
          }

          .mi-footer {
            flex-direction: column;
            gap: 8px;
          }
        }

        @media (max-width: 360px) {
          .mi-tools-grid {
            grid-template-columns: 1fr;
          }

          .mi-tool-card {
            min-height: 190px;
          }

          .mi-hero h1 {
            font-size: 33px;
          }
        }
      `}</style>
    </main>
  );
}
