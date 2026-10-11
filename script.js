/*
  BE HOC VUI - WEBSITE HOC LIEU CHO BE
  1) Sua ZALO_URL thanh link Zalo cua shop, vi du https://zalo.me/09xxxxxxxx
  2) Sua danh sach PRODUCTS ben duoi: ten, mo ta, gia, nhom, mau va icon.
  3) Gia chi la gia mau; kiem tra lai truoc khi cong khai.
*/
const ZALO_URL = "https://zalo.me/"; // TODO: thay bang link Zalo cua shop

const PRODUCTS = [
  {id:"dem-1-10", name:"Tập đếm 1–10", description:"Làm quen số đếm qua hình ảnh đáng yêu.", category:"dem", icon:"🔢", color:"#dff3ff", pages:20, age:"3–5 tuổi", prices:{print:15000,pdf:10000}},
  {id:"to-mau-dong-vat", name:"Tô màu động vật", description:"Những người bạn động vật chờ bé tô màu.", category:"to-mau", icon:"🦊", color:"#ffe5ee", pages:24, age:"2–6 tuổi", prices:{print:19000,pdf:12000}},
  {id:"tap-viet-net-co-ban", name:"Tập viết nét cơ bản", description:"Luyện các nét trước khi làm quen chữ.", category:"tap-viet", icon:"✏️", color:"#fff0d8", pages:18, age:"4–6 tuổi", prices:{print:22000,pdf:15000}},
  {id:"tu-duy-hinh-khoi", name:"Tư duy hình khối", description:"Nhận biết hình dạng, màu sắc và quy luật.", category:"tu-duy", icon:"🧩", color:"#e5f7e9", pages:22, age:"3–6 tuổi", prices:{print:25000,pdf:17000}},
  {id:"the-hoc-chu-so", name:"Thẻ học chữ và số", description:"Thẻ học nhỏ gọn để chơi cùng người lớn.", category:"dem", icon:"🔠", color:"#eee8ff", pages:30, age:"3–6 tuổi", prices:{print:29000,pdf:18000}},
  {id:"be-kham-pha-mau-sac", name:"Bé khám phá màu sắc", description:"Ghép màu và gọi tên đồ vật quen thuộc.", category:"to-mau", icon:"🎨", color:"#e1f6f6", pages:16, age:"2–4 tuổi", prices:{print:18000,pdf:12000}},
  {id:"be-lam-quen-chu-cai", name:"Bé làm quen chữ cái", description:"Nhận diện chữ qua hoạt động đơn giản.", category:"tap-viet", icon:"📚", color:"#ffebd9", pages:26, age:"4–6 tuổi", prices:{print:25000,pdf:16000}},
  {id:"tim-cap-doi", name:"Tìm cặp đôi", description:"Luyện quan sát, so sánh và tập trung.", category:"tu-duy", icon:"🐰", color:"#f7e8f5", pages:20, age:"3–5 tuổi", prices:{print:20000,pdf:13000}}
];
const FORMAT_LABELS = {print:"Bản in", pdf:"File PDF"};
const money = n => new Intl.NumberFormat("vi-VN").format(n) + "₫";
let cart = [];
let currentFilter = "all";
const $ = id => document.getElementById(id);

function productPrice(product, format){ return product.prices[format]; }
function renderProducts(){
  const shown = PRODUCTS.filter(p => currentFilter === "all" || p.category === currentFilter);
  $("product-grid").innerHTML = shown.map(p => `
    <article class="product-card">
      <div class="product-art" style="background:${p.color}">
        <span class="product-tag">${p.pages} trang · ${p.age}</span>
        <span class="emoji" aria-hidden="true">${p.icon}</span>
        <span class="mini-sheet one">A B C<br>1 2 3</span><span class="mini-sheet two">✿ ★ ●</span>
      </div>
      <h3>${escapeHTML(p.name)}</h3>
      <p class="product-description">${escapeHTML(p.description)}</p>
      <div class="product-price">${money(p.prices.print)} <small>/ bản in</small></div>
      <label class="format-label" for="format-${p.id}">Chọn định dạng</label>
      <select class="format-select" id="format-${p.id}" aria-label="Định dạng ${escapeHTML(p.name)}">
        <option value="print">Bản in — ${money(p.prices.print)}</option>
        <option value="pdf">File PDF — ${money(p.prices.pdf)}</option>
      </select>
      <button class="add-button" data-add="${p.id}">＋ Thêm vào giỏ</button>
    </article>`).join("");
  document.querySelectorAll("[data-add]").forEach(btn => btn.addEventListener("click", () => {
    const id = btn.dataset.add, format = $("format-"+id).value;
    addToCart(id, format);
  }));
}
function escapeHTML(value){
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function addToCart(id, format){
  const product = PRODUCTS.find(p => p.id === id);
  if(!product) return;
  const item = cart.find(i => i.id === id && i.format === format);
  if(item) item.qty += 1; else cart.push({id,format,qty:1});
  renderCart(); showToast("Đã thêm “"+product.name+"” vào giỏ 💗");
}
function cartSubtotal(){ return cart.reduce((sum,i) => {const p=PRODUCTS.find(p=>p.id===i.id); return sum + (p ? productPrice(p,i.format)*i.qty : 0);},0); }
function renderCart(){
  $("cart-count").textContent = cart.reduce((sum,i)=>sum+i.qty,0);
  $("cart-empty").hidden = cart.length > 0;
  $("cart-summary").hidden = cart.length === 0;
  $("cart-items").innerHTML = cart.map(i => {
    const p=PRODUCTS.find(p=>p.id===i.id); if(!p) return "";
    return `<div class="cart-row">
      <div class="cart-thumb" style="background:${p.color}">${p.icon}</div>
      <div><h3>${escapeHTML(p.name)}</h3><div class="cart-meta">${FORMAT_LABELS[i.format]} · ${money(productPrice(p,i.format))}/sp</div>
      <div class="quantity-controls"><button data-qty="${i.id}|${i.format}|-1" aria-label="Giảm số lượng">−</button><span>${i.qty}</span><button data-qty="${i.id}|${i.format}|1" aria-label="Tăng số lượng">＋</button><button class="remove" data-remove="${i.id}|${i.format}">Xóa</button></div></div>
      <div class="cart-row-price">${money(productPrice(p,i.format)*i.qty)}</div>
    </div>`;
  }).join("");
  $("subtotal").textContent=money(cartSubtotal()); $("grand-total").textContent=money(cartSubtotal());
  document.querySelectorAll("[data-qty]").forEach(btn=>btn.addEventListener("click",()=>{
    const [id,format,delta]=btn.dataset.qty.split("|"); const item=cart.find(i=>i.id===id&&i.format===format);
    if(item){item.qty+=Number(delta);if(item.qty<1)cart=cart.filter(i=>i!==item);renderCart();}
  }));
  document.querySelectorAll("[data-remove]").forEach(btn=>btn.addEventListener("click",()=>{
    const [id,format]=btn.dataset.remove;cart=cart.filter(i=>!(i.id===id&&i.format===format));renderCart();
  }));
  renderCheckoutPreview();
}
function renderCheckoutPreview(){
  $("checkout-order-lines").innerHTML = cart.map(i=>{
    const p=PRODUCTS.find(p=>p.id===i.id); if(!p)return "";
    return `<div class="order-line"><span>${escapeHTML(p.name)} × ${i.qty}<br><small>${FORMAT_LABELS[i.format]}</small></span><strong>${money(productPrice(p,i.format)*i.qty)}</strong></div>`;
  }).join("");
  $("checkout-total").textContent=money(cartSubtotal());
}
function openModal(id){$(id).hidden=false;document.body.style.overflow="hidden";}
function closeModal(id){$(id).hidden=true;document.body.style.overflow="";}
function showToast(message){
  const toast=$("toast");toast.textContent=message;toast.classList.add("show");
  clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2600);
}
function buildOrderMessage(data){
  const lines=cart.map(i=>{const p=PRODUCTS.find(p=>p.id===i.id);return p?`- ${p.name} | ${FORMAT_LABELS[i.format]} | SL: ${i.qty} | ${money(productPrice(p,i.format)*i.qty)}`:"";}).filter(Boolean);
  const needsPrint=cart.some(i=>i.format==="print");
  return `ĐẶT HÀNG HỌC LIỆU BÉ HỌC VUI\n\n${lines.join("\n")}\n\nTổng tiền sản phẩm: ${money(cartSubtotal())}\nPhí giao bản in: shop xác nhận\n\nTHÔNG TIN KHÁCH HÀNG\nHọ tên: ${data.name}\nĐiện thoại: ${data.phone}\n${needsPrint?"Địa chỉ nhận bản in: "+(data.address||"(chưa nhập)")+"\n":""}Ghi chú: ${data.note||"Không có"}\n\nNhờ shop xác nhận đơn và hướng dẫn thanh toán.`;
}
function isValidZaloURL(url){try{const u=new URL(url);return u.protocol==="https:"&&u.hostname==="zalo.me"&&u.pathname.length>1;}catch(e){return false;}}
document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{
  currentFilter=btn.dataset.filter;document.querySelectorAll(".category").forEach(b=>b.classList.toggle("active",b===btn));renderProducts();
}));
$("open-cart").addEventListener("click",()=>{renderCart();openModal("cart-modal");});
$("close-cart").addEventListener("click",()=>closeModal("cart-modal"));
$("browse-products").addEventListener("click",()=>closeModal("cart-modal"));
$("go-checkout").addEventListener("click",()=>{
  if(!cart.length)return;renderCheckoutPreview();closeModal("cart-modal");openModal("checkout-modal");$("send-fallback").hidden=true;
});
$("close-checkout").addEventListener("click",()=>closeModal("checkout-modal"));
$("checkout-form").addEventListener("submit",async event=>{
  event.preventDefault();
  if(!cart.length){showToast("Giỏ hàng đang trống.");return;}
  const form=new FormData(event.currentTarget);
  const data={name:String(form.get("name")||"").trim(),phone:String(form.get("phone")||"").trim(),address:String(form.get("address")||"").trim(),note:String(form.get("note")||"").trim()};
  if(!data.name||!data.phone){showToast("Vui lòng nhập họ tên và số điện thoại.");return;}
  if(cart.some(i=>i.format==="print")&&!data.address){showToast("Vui lòng nhập địa chỉ nhận bản in.");return;}
  const message=buildOrderMessage(data);
  $("order-message").value=message;
  $("send-fallback").hidden=false;
  let copied=false;
  try{await navigator.clipboard.writeText(message);copied=true;}catch(e){copied=false;}
  const zaloURL=isValidZaloURL(ZALO_URL)?ZALO_URL:"https://zalo.me/";
  $("open-zalo-final").href=zaloURL;
  showToast(copied?"Đã sao chép nội dung đơn. Hãy dán vào Zalo.":"Đơn đã tạo. Sao chép nội dung rồi dán vào Zalo.");
  window.open(zaloURL,"_blank","noopener");
});
$("copy-message").addEventListener("click",async()=>{
  const text=$("order-message").value;
  try{await navigator.clipboard.writeText(text);showToast("Đã sao chép nội dung đơn hàng.");}
  catch(e){$("order-message").focus();$("order-message").select();showToast("Hãy nhấn Ctrl+C (hoặc Sao chép trên điện thoại).");}
});
$("contact-zalo").href=isValidZaloURL(ZALO_URL)?ZALO_URL:"https://zalo.me/";
$("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
