'use strict';
const {products, categories} = window.STORE_CATALOG;
const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let saved = [];
try { const value = JSON.parse(localStorage.getItem('aros-bag') || '[]'); if (Array.isArray(value)) saved = [...new Set(value)].filter(id => products.some(p => p.id === id)); } catch {}
let active = '';
function persist() { try { localStorage.setItem('aros-bag', JSON.stringify(saved)); } catch {} renderBag(); }
function renderBag() {
  $('#bag-count').textContent = saved.length;
  $('#bag-items').innerHTML = saved.length ? saved.map(id => {
    const p = products.find(product => product.id === id);
    return `<div class="bag-row"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}"><div><strong>${escapeHTML(p.name)}</strong><p>Price awaiting confirmation</p><button class="text-link" data-remove="${id}">Remove</button></div></div>`;
  }).join('') : '<p>Your bag is empty. Explore the collection to save a favourite.</p>';
}
function renderProducts() {
  let list = products.filter(p => (!active || p.slug === active) && p.name.toLowerCase().includes($('#product-search').value.trim().toLowerCase()));
  const sort = $('#sort').value;
  if (sort !== 'default') list.sort((a,b) => sort === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  $('#result-count').textContent = `${list.length} finds${active ? ' · ' + categories.find(c => c.slug === active).name : ' · All collections'}`;
  $('#products').innerHTML = list.length ? list.map(p => `<article class="product-card"><button class="product-image" data-product="${p.id}" aria-label="View ${escapeHTML(p.name)}"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy"></button><small>${escapeHTML(p.category)}</small><h3><button class="product-name" data-product="${p.id}">${escapeHTML(p.name)}</button></h3><p class="price-note">Price awaiting confirmation</p><button class="save-button" data-save="${p.id}">${saved.includes(p.id) ? 'Saved to bag' : 'Save to bag'} <span>↗</span></button></article>`).join('') : '<div class="empty"><h3>No finds here yet.</h3><p>Try another category or search term.</p></div>';
  document.querySelectorAll('.tab').forEach(tab => { const selected = tab.hash === (active ? '#category='+active : '#shop'); tab.classList.toggle('active', selected); if(selected) tab.setAttribute('aria-current','true'); else tab.removeAttribute('aria-current'); });
}
function route() {
  const category = location.hash.startsWith('#category=') ? location.hash.slice(10) : '';
  active = categories.some(c => c.slug === category) ? category : '';
  if (category || location.hash === '#shop') { $('#product-search').value = ''; renderProducts(); $('#shop').scrollIntoView(); }
}
const all = document.createElement('a'); all.className='tab'; all.href='#shop'; all.textContent='All finds'; $('.tabs').prepend(all);
window.addEventListener('hashchange', route);
$('#product-search').addEventListener('input', renderProducts);
$('#sort').addEventListener('change', renderProducts);
$('#bag-button').addEventListener('click', () => $('#bag').showModal());
document.querySelectorAll('dialog .close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) dialog.close(); } }));
let toastTimer;
document.addEventListener('click', event => {
  const action = event.target.closest('[data-product],[data-save],[data-remove]'); if (!action) return;
  if (action.dataset.product) {
    const p = products.find(product => product.id === Number(action.dataset.product));
    $('#detail-body').innerHTML = `<div class="detail-layout"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}"><div><span class="eyebrow">${escapeHTML(p.category)}</span><h2 id="detail-title">${escapeHTML(p.name)}</h2><p>SKU: ${escapeHTML(p.sku)}</p><p>Product details, pricing and availability awaiting review.</p><p>${escapeHTML(p.description)}</p><button class="btn" data-save="${p.id}">${saved.includes(p.id) ? 'Saved to bag' : 'Save to bag'}</button><p><a class="text-link" href="${escapeHTML(p.source)}" target="_blank" rel="noopener">View source collection ↗</a></p></div></div>`;
    $('#detail').showModal();
  } else if (action.dataset.save) {
    const id = Number(action.dataset.save); if (!saved.includes(id)) saved.push(id);
    persist(); renderProducts(); action.textContent = 'Saved to bag';
    $('#toast').textContent = 'Saved to your bag'; $('#toast').hidden = false; clearTimeout(toastTimer); toastTimer=setTimeout(() => { $('#toast').hidden = true; },2200);
  } else { saved = saved.filter(id => id !== Number(action.dataset.remove)); persist(); renderProducts(); }
});
renderBag(); renderProducts(); route();
