/* A1 Sweets shared interaction layer. No framework, no dependencies. */
(function () {
  'use strict';

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  function setupNavigation() {
    const toggle = $('.nav-toggle');
    const nav = $('.site-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
      document.body.classList.toggle('nav-open', !open);
    });

    $$('.site-nav a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    });
  }

  function setupYear() {
    $$('#year').forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  function productImage(product) {
    if (product.image) {
      return `<img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">`;
    }
    return `<div class="product-placeholder" aria-hidden="true"><span class="placeholder-brand">A1</span><span class="placeholder-name">${product.name}</span><span class="placeholder-note">Product photo</span></div>`;
  }

  function productCard(product) {
    const price = formatPrice(product.price);
    const unit = product.unit ? `<span class="product-unit">${product.unit}</span>` : '';
    const note = product.note ? `<p>${product.note}</p>` : '';
    return `
      <article class="product-card" data-product="${product.id}">
        <div class="product-media">${productImage(product)}</div>
        <div class="product-info">
          <div class="product-title-row"><h3>${product.name}</h3><span class="product-category-dot" aria-hidden="true"></span></div>
          ${note}
          <div class="product-price-row"><div><strong>${price}</strong>${unit}</div><a class="order-mini" href="${whatsappLink(product)}" target="_blank" rel="noopener">Order</a></div>
        </div>
      </article>`;
  }

  function renderHome() {
    const grid = $('#bestseller-grid');
    if (!grid) return;
    const count = Number(grid.dataset.homeBestsellers || 6);
    const featured = products.filter(p => p.bestseller).slice(0, count);
    grid.innerHTML = featured.map(productCard).join('');
  }

  function categoryTile(category) {
    return `
      <a class="category-card category-${category.id}" href="menu.html?category=${encodeURIComponent(category.id)}">
        <span class="category-icon">${category.icon}</span>
        <span class="category-card-copy"><strong>${category.name}</strong><small>${category.description}</small></span>
        <span class="category-arrow" aria-hidden="true">↗</span>
      </a>`;
  }

  function renderCategories() {
    const grid = $('#category-grid');
    if (!grid) return;
    grid.innerHTML = categories.map(categoryTile).join('');
  }

  function tabTemplate(category, active) {
    return `<button class="category-tab${active ? ' active' : ''}" data-category="${category.id}" role="tab" aria-selected="${active}">${category.name}</button>`;
  }

  function renderMenu() {
    const groups = $('#menu-groups');
    const tabs = $('#category-tabs');
    const search = $('#menu-search');
    const status = $('#menu-status');
    if (!groups || !tabs || !search || !status) return;

    let activeCategory = 'all';
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('category');
    if (requested && categories.some(c => c.id === requested)) activeCategory = requested;

    const tabCategories = [{ id: 'all', name: 'All' }, ...categories];
    tabs.innerHTML = tabCategories.map(c => tabTemplate(c, (c.id === 'all' && activeCategory === 'all') || c.id === activeCategory)).join('');

    function render() {
      const query = search.value.trim().toLowerCase();
      const visible = products.filter(p => {
        const inCategory = activeCategory === 'all' || categories.find(c => c.id === activeCategory)?.name === p.category;
        const text = `${p.name} ${p.category} ${p.note || ''}`.toLowerCase();
        return inCategory && (!query || text.includes(query));
      });

      status.textContent = `${visible.length} item${visible.length === 1 ? '' : 's'} shown`;

      const groups = [];
      const orderedCategories = activeCategory === 'all'
        ? categories
        : categories.filter(c => c.id === activeCategory);

      orderedCategories.forEach(category => {
        const items = visible.filter(p => p.category === category.name);
        if (items.length) {
          groups.push(`<section class="menu-group" id="${category.id}"><div class="menu-group-heading"><div><span class="section-kicker">${category.icon} ${category.name}</span><h2>${category.name}</h2></div><span>${items.length} item${items.length === 1 ? '' : 's'}</span></div><div class="product-grid">${items.map(productCard).join('')}</div></section>`);
        }
      });

      if (!groups.length) {
        groups.push(`<div class="empty-state"><strong>No item found.</strong><span>Try another sweet, category or spelling.</span></div>`);
      }
      groupsElHTML(groups);
    }

    function groupsElHTML(parts) { groups.innerHTML = parts.join(''); }

    tabs.addEventListener('click', event => {
      const button = event.target.closest('.category-tab');
      if (!button) return;
      activeCategory = button.dataset.category;
      $$('.category-tab', tabs).forEach(tab => {
        const isActive = tab === button;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });
      render();
      if (window.innerWidth < 760) groups.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    search.addEventListener('input', render);
    render();
  }

  function setupReveal() {
    const items = $$('.reveal');
    if (!items.length || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach(el => observer.observe(el));
  }

  function setupHeroMotion() {
    const box = $('#sweetBox');
    if (!box || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = null;
    window.addEventListener('pointermove', (event) => {
      if (window.innerWidth < 900) return;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        box.style.transform = `rotateX(${y * -4}deg) rotateY(${x * 6}deg) translate3d(${x * 5}px, ${y * 3}px, 0)`;
      });
    }, { passive: true });
  }

  setupNavigation();
  setupYear();
  renderHome();
  renderCategories();
  renderMenu();
  setupReveal();
  setupHeroMotion();
})();
