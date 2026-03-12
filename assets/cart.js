(function(){
  var KEY='ggdCart';
  var PRODUCT_URLS={
    'GIRLS GONE DIGITAL (ZINE) (Issue 1 Mar 2025)':'product-magazine.html',
    'GIRLS GONE DIGITAL (Issue 1 Mar 2025)':'product-magazine.html',
    'GGD CROP TOP (BLK)':'product-tshirt-blk.html',
    'GGD CROP TOP (WHT)':'product-tshirt-wht.html',
    'GGD SHORT SLEEVE ONESIE (BLK)':'product-onesie-short-blk.html',
    'GGD SHORT SLEEVE ONESIE (WHT)':'product-onesie-short-wht.html',
    'GGD LONG SLEEVE ONESIE (BLK)':'product-onesie-long-blk.html',
    'GGD LONG SLEEVE ONESIE (WHT)':'product-onesie-long-wht.html'
  };
  function getProductUrl(name){return PRODUCT_URLS[name]||'shop.html';}
  function getCart(){return JSON.parse(localStorage.getItem(KEY)||'[]');}
  function render(){
    var c=getCart();
    var n=c.reduce(function(s,i){return s+(i.qty||1);},0);
    var el=document.getElementById('cartCount');
    if(el)el.textContent=n;
    var pop=document.getElementById('cartPopover');
    if(!pop)return;
    var list=pop.querySelector('.cart-popover__list');
    var empty=pop.querySelector('.cart-popover__empty');
    if(c.length===0){
      list.style.display='none';
      empty.style.display='block';
    }else{
      empty.style.display='none';
      list.style.display='block';
      list.innerHTML=c.map(function(i,idx){
        var q=i.qty||1;
        var p=parseFloat(i.price)||0;
        var displayName=i.name+(i.size?' - '+i.size:'');
        var url=getProductUrl(i.name);
        var nameHtml=url?'<a href="'+url+'" class="cart-popover__name-link">'+displayName+'</a>':'<span class="cart-popover__name">'+displayName+'</span>';
        return '<div class="cart-popover__row" data-idx="'+idx+'">'+nameHtml+'<span class="cart-popover__qty">×'+q+'</span><span class="cart-popover__price">$'+(p*q).toFixed(2)+'</span><button type="button" class="cart-popover__remove" aria-label="Remove">×</button></div>';
      }).join('');
      list.querySelectorAll('.cart-popover__remove').forEach(function(btn){
        btn.addEventListener('click',function(){
          var idx=parseInt(this.closest('.cart-popover__row').dataset.idx,10);
          var cart=getCart();
          cart.splice(idx,1);
          localStorage.setItem(KEY,JSON.stringify(cart));
          render();
        });
      });
      var total=c.reduce(function(s,i){return s+(parseFloat(i.price)||0)*(i.qty||1);},0);
      var totEl=pop.querySelector('.cart-popover__total');
      if(totEl)totEl.textContent='Total: $'+total.toFixed(2);
    }
  }
  function toggle(){
    var pop=document.getElementById('cartPopover');
    if(!pop)return;
    pop.classList.toggle('is-open');
  }
  function close(){var p=document.getElementById('cartPopover');var b=document.getElementById('cartBackdrop');if(p)p.classList.remove('is-open');if(b)b.classList.remove('is-open');}
  var style=document.createElement('style');
  style.textContent='#cartCount{display:inline-flex;align-items:center;justify-content:center;min-width:1.6em;height:1.6em;padding:0 0.45em;background:#000;color:#fff;font-weight:700;border-radius:50%;font-size:11px;margin-left:0.4rem;}.cart-popover{position:fixed;top:calc(var(--ice-header-h,28px) + 4px);right:1.5rem;width:min(320px,calc(100vw - 2rem));background:#fff;border:1px solid rgba(0,0,0,0.1);box-shadow:0 8px 24px rgba(0,0,0,0.12);z-index:200;padding:1rem;display:none;font-size:11px;}.cart-popover.is-open{display:block;}.cart-popover__title{font-weight:600;letter-spacing:0.05em;margin-bottom:0.75rem;}.cart-popover__list{margin-bottom:0.75rem;}.cart-popover__row{display:flex;justify-content:space-between;align-items:center;padding:0.35rem 0;border-bottom:1px solid rgba(0,0,0,0.06);}.cart-popover__row:last-child{border-bottom:none;}.cart-popover__name,.cart-popover__name-link{flex:1;}.cart-popover__name-link{color:inherit;text-decoration:none;}.cart-popover__name-link:hover{opacity:0.6;}.cart-popover__qty{color:#666;margin:0 0.5rem;}.cart-popover__price{}.cart-popover__remove{background:none;border:none;cursor:pointer;font-size:14px;line-height:1;color:#999;padding:0 0 0 0.5rem;}.cart-popover__remove:hover{color:#111;}.cart-popover__total{font-weight:600;padding-top:0.5rem;border-top:1px solid rgba(0,0,0,0.1);}.cart-popover__empty{color:#666;padding:0.5rem 0;}.cart-popover__link{display:block;margin-top:0.75rem;font-size:11px;letter-spacing:0.05em;text-decoration:none;color:#111;}.cart-popover__link:hover{opacity:0.6;}.cart-popover__backdrop{position:fixed;inset:0;z-index:199;display:none;}.cart-popover__backdrop.is-open{display:block;}';
  document.head.appendChild(style);
  var pop=document.createElement('div');
  pop.id='cartPopover';
  pop.className='cart-popover';
  var cartHref=window.location.pathname.indexOf('/pages/')!==-1||window.location.pathname.endsWith('/pages')?'cart.html':'pages/cart.html';
  pop.innerHTML='<div class="cart-popover__title">Cart</div><div class="cart-popover__empty">Your cart is empty.</div><div class="cart-popover__list" style="display:none"></div><div class="cart-popover__total"></div><a href="'+cartHref+'" class="cart-popover__link">View cart</a>';
  document.body.appendChild(pop);
  var backdrop=document.createElement('div');
  backdrop.className='cart-popover__backdrop';
  backdrop.id='cartBackdrop';
  document.body.insertBefore(backdrop,pop);
  backdrop.addEventListener('click',close);
  document.querySelectorAll('.custom-header-cart-toggle').forEach(function(btn){
    if(btn.tagName==='A'&&btn.getAttribute('href')&&btn.getAttribute('href').indexOf('cart')!==-1)return;
    btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();toggle();backdrop.classList.toggle('is-open',pop.classList.contains('is-open'));});
  });
  render();
  window.ggdCartRender=render;
})();
