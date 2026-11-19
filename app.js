const products = [
  {id:1,name:"Aura Wireless Headphones",category:"Technology",price:4999,emoji:"🎧",tag:"UC SELECT"},
  {id:2,name:"Lumen Smart Watch",category:"Technology",price:6999,emoji:"⌚",tag:"NEW ARRIVAL"},
  {id:3,name:"Form Everyday Bottle",category:"Lifestyle",price:899,emoji:"🫙",tag:"DAILY ESSENTIAL"},
  {id:4,name:"Élan Minimal Wallet",category:"Accessories",price:1499,emoji:"👝",tag:"BESTSELLER"},
  {id:5,name:"Nova Portable Speaker",category:"Technology",price:3299,emoji:"🔊",tag:"UC SELECT"},
  {id:6,name:"Sculpt Desk Lamp",category:"Lifestyle",price:2199,emoji:"💡",tag:"DESIGN EDIT"},
  {id:7,name:"Orbit Travel Bag",category:"Accessories",price:2899,emoji:"👜",tag:"TRAVEL EDIT"},
  {id:8,name:"Studio Sunglasses",category:"Accessories",price:1799,emoji:"🕶️",tag:"NEW ARRIVAL"}
];
const services = [
  {icon:"✧",name:"Home & Living",desc:"Explore cleaning, repairs and home improvement services."},
  {icon:"◇",name:"Design & Creative",desc:"Connect with creative talent for your next big idea."},
  {icon:"⌘",name:"Technology Help",desc:"Get support for devices, setup and digital needs."}
];
let cart = [];
let wishlist = [];
let activeCategory = "All";
let query = "";
const $ = s => document.querySelector(s);
const money = n => "₹" + n.toLocaleString("en-IN");
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2100)}
function renderProducts(){
  const shown=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(`${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())));
  $("#productGrid").innerHTML=shown.length?shown.map(p=>`<article class="product-card"><div class="product-art"><span class="product-emoji">${p.emoji}</span><button class="heart ${wishlist.includes(p.id)?"saved":""}" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist">${wishlist.includes(p.id)?"♥":"♡"}</button></div><div class="product-info"><span class="product-category">${p.tag} · ${p.category}</span><h3>${p.name}</h3><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}">ADD TO BAG +</button></div></div></article>`).join(""):`<p class="empty">No matches found. Try another search.</p>`;
  $("#wishCount").textContent=wishlist.length;
}
function renderCart(){
  $("#cartCount").textContent=cart.reduce((n,x)=>n+x.qty,0);
  $("#cartItems").innerHTML=cart.length?cart.map(x=>`<div class="drawer-row"><div><strong>${x.name}</strong><small>${money(x.price)} × ${x.qty}</small></div><div><strong>${money(x.price*x.qty)}</strong><button class="remove-btn" data-remove="${x.id}">Remove</button></div></div>`).join(""):`<p class="empty">Your bag is waiting for something special.</p>`;
  $("#cartTotal").textContent=money(cart.reduce((n,x)=>n+x.price*x.qty,0));
}
function renderWishlist(){
  $("#wishItems").innerHTML=wishlist.length?wishlist.map(id=>{const p=products.find(x=>x.id===id);return `<div class="drawer-row"><div><strong>${p.name}</strong><small>${money(p.price)}</small></div><button class="remove-btn" data-unwish="${id}">Remove</button></div>`}).join(""):`<p class="empty">Your wishlist is empty.</p>`;
}
function openDrawer(which){$("#overlay").classList.remove("hidden");$("#cartDrawer").classList.toggle("hidden",which!=="cart");$("#wishDrawer").classList.toggle("hidden",which!=="wish");}
function closeDrawers(){$("#overlay").classList.add("hidden");$("#cartDrawer").classList.add("hidden");$("#wishDrawer").classList.add("hidden")}
$("#productGrid").addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");const wish=e.target.closest("[data-wish]");
 if(add){const p=products.find(x=>x.id===Number(add.dataset.add));const found=cart.find(x=>x.id===p.id);found?found.qty++:cart.push({...p,qty:1});renderCart();toast("Added to your bag");}
 if(wish){const id=Number(wish.dataset.wish);wishlist.includes(id)?wishlist=wishlist.filter(x=>x!==id):wishlist.push(id);renderProducts();toast(wishlist.includes(id)?"Saved to wishlist":"Removed from wishlist");}
});
$("#cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(b){cart=cart.filter(x=>x.id!==Number(b.dataset.remove));renderCart()}});
$("#wishItems").addEventListener("click",e=>{const b=e.target.closest("[data-unwish]");if(b){wishlist=wishlist.filter(x=>x!==Number(b.dataset.unwish));renderProducts();renderWishlist()}});
$("#productFilters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
$("#cartToggle").addEventListener("click",()=>{renderCart();openDrawer("cart")});
$("#wishlistToggle").addEventListener("click",()=>{renderWishlist();openDrawer("wish")});
$("#overlay").addEventListener("click",closeDrawers);
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",closeDrawers));
$("#searchToggle").addEventListener("click",()=>{$("#searchBar").classList.toggle("hidden");$("#searchInput").focus()});
$("#searchInput").addEventListener("input",e=>{query=e.target.value;renderProducts()});
$("#clearSearch").addEventListener("click",()=>{$("#searchInput").value="";query="";renderProducts()});
$("#checkoutBtn").addEventListener("click",()=>toast("Checkout is a demo feature and is not connected yet."));
$("#serviceGrid").innerHTML=services.map(s=>`<article class="service-card"><span class="service-icon">${s.icon}</span><h3>${s.name}</h3><p>${s.desc}</p><button class="service-action" data-service="${s.name}">EXPLORE SERVICE →</button></article>`).join("");
$("#serviceGrid").addEventListener("click",e=>{const b=e.target.closest("[data-service]");if(b)toast(`${b.dataset.service} booking is coming soon.`)});
$("#menuToggle").addEventListener("click",()=>{document.querySelector(".desktop-nav").style.display=document.querySelector(".desktop-nav").style.display==="flex"?"none":"flex";document.querySelector(".desktop-nav").style.position="absolute";document.querySelector(".desktop-nav").style.top="72px";document.querySelector(".desktop-nav").style.left="0";document.querySelector(".desktop-nav").style.right="0";document.querySelector(".desktop-nav").style.padding="22px";document.querySelector(".desktop-nav").style.background="#11110f";document.querySelector(".desktop-nav").style.flexDirection="column"});
$("#year").textContent=new Date().getFullYear();
renderProducts();renderCart();