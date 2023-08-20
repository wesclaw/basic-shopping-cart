const products = [
  {
    imgSrc:
      'https://images.unsplash.com/photo-1582845512747-e42001c95638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    name: 'Duck',
    description: 'loremm kjaskd kjas dkj k adkj kasdj  ks jdakj kjsdk ',
    price: 100.99,
  },
  {
    imgSrc:
      'https://images.unsplash.com/photo-1546776230-bb86256870ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=810&q=80',
    name: 'Robot',
    description: 'oremm kjaskd kjas dkj k adkj kasdj  ks jdakj kjsdk',
    price: 300.99,
  },
  {
    imgSrc:
      'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    name: 'Bear',
    description: 'oremm kjaskd kjas dkj k adkj kasdj  ks jdakj kjsdk',
    price: 10.99,
  },
];

const cart = [];

// let pickedProduct = false;

let count = 0;

let totalPrice = 0;

// trigger the cart menu slide

const body = document.querySelector('body');
const wrapper = document.querySelector('.wrapper');
const cart_btn = document.querySelector('.cart-btn');
const toggle_btn = document.createElement('button');
toggle_btn.classList.add('toggle_btn');
toggle_btn.textContent = 'X';
const cart_slide = document.createElement('div');
cart_slide.classList.add('cart-slide');
body.append(cart_slide);

cart_btn.addEventListener('click', () => {
  cart_slide.style = 'width: 100vw;';
  cart_slide.append(toggle_btn);
});

toggle_btn.addEventListener('click', () => {
  cart_slide.style = 'width: 0vw;';
});

// making the html products

const createProducts = () => {
  for (let i = 0; i < products.length; i++) {
    const product_list = document.createElement('div');
    product_list.classList.add('product-list');
    wrapper.append(product_list);
    const img_el = document.createElement('img');
    img_el.src = products[i].imgSrc;
    img_el.classList.add('img_el');
    product_list.append(img_el);
    const item_info_el = document.createElement('div');
    item_info_el.classList.add('item-info');
    product_list.append(item_info_el);
    const name_el = document.createElement('p');
    name_el.textContent = products[i].name;
    item_info_el.append(name_el);
    const description_el = document.createElement('p');
    description_el.textContent = 'lorem askdjksad j kjadsklajsd';
    item_info_el.append(description_el);
    const price_el = document.createElement('div');
    price_el.classList.add('price');
    product_list.append(price_el);
    const cost_el = document.createElement('p');
    cost_el.textContent = `$${products[i].price} `;
    price_el.append(cost_el);
    const btn_cart = document.createElement('button');
    btn_cart.textContent = 'Add to cart';
    price_el.append(btn_cart);

    btn_cart.setAttribute('prod-index', i);

    btn_cart.addEventListener('click', () => {
      const getBtns = btn_cart.getAttribute('prod-index');
      const selectedProducts = products[getBtns];

      if (cart.some(item => item.name === selectedProducts.name)) {
        alert('This item is already in the cart.');
      } else {
        cart.push(selectedProducts);
        count++;
        totalPrice += selectedProducts.price;
        createItemsInCart();
        createCount();
      }
    });
  }
};

createProducts();

const createItemsInCart = () => {
  cart_slide.innerHTML = '';

  cart.forEach(product => {
    cart_slide.append(toggle_btn);
    const product_wrap = document.createElement('div');
    product_wrap.classList.add('product-wrap');
    cart_slide.append(product_wrap);

    const product_img = document.createElement('img');
    product_img.classList.add('cart-img');
    product_img.src = product.imgSrc;
    product_wrap.append(product_img);

    const p_name = document.createElement('p');
    p_name.textContent = product.name;
    product_wrap.append(p_name);

    const price_el = document.createElement('p');
    price_el.textContent = `$${product.price}`;
    product_wrap.append(price_el);

    const remove_btn = document.createElement('button');
    remove_btn.textContent = 'X';
    product_wrap.append(remove_btn);

    remove_btn.addEventListener('click', () => {
      product_wrap.remove();

      // need to remove the cart again. clear the cart out
      for(let i=0;i<cart.length;i++){
        if(cart[i].name===product.name){
          cart.splice(i, 1)
          break
        }
      }

      count--

      totalPrice -= product.price

      createItemsInCart();
      createCount(); 
      
      cart_slide.append(toggle_btn);
    });
  });

  const price_div = document.createElement('div');
  price_div.classList.add('price_div');
  cart_slide.append(price_div);
  const h2 = document.createElement('h2');
  h2.textContent = 'Total:';
  price_div.append(h2);
  const price_tag = document.createElement('h1');
  price_tag.textContent = `$${totalPrice.toFixed(2)}`;
  price_div.append(price_tag);

  const buy_now_btn = document.createElement('button');
  buy_now_btn.textContent = 'Buy now';
  buy_now_btn.classList.add('buy-now-btn');
  cart_slide.append(buy_now_btn);

  buy_now_btn.addEventListener('click',()=>{
    if(price_tag.textContent==='$0.00'){
     alert('you must add somthing')
     return 
    }else{
      const div_module = document.createElement('div')
      div_module.classList.add('module')
      cart_slide.append(div_module) 
      const h1 = document.createElement('h1')
      h1.classList.add('h1_el')
      div_module.append(h1)
      const return_btn = document.createElement('button')
      return_btn.textContent = 'Return home'
      div_module.append(return_btn)
      h1.textContent = 'Your order has been placed. Thank you!'

      return_btn.addEventListener('click',()=>{
        location.reload()
      })
    }
  })
};

const createCount = () => {
  const cart_number = document.querySelector('.cart-btn');
  cart_btn.textContent = `Cart ${count}`; 
};
