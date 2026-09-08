const slider = document.getElementById("slider")
const next = document.getElementById("next")
const prev = document.getElementById("prev")

const cartContainer = document.getElementById("cartContainer")
const sebetmodal = document.getElementById("sebetmodal")
const wishlistmodal = document.getElementById("wishlistmodal")

const sebetlist = document.getElementById("sebetlist")
const wishlistlist = document.getElementById("wishlistlist")

const cartcount = document.getElementById("cartcount")
const wishlistcount = document.getElementById("wishlistcount")
const menuOverlay = document.getElementById("menuOverlay")
const hamburgerBtn = document.getElementById('hamburgerBtn')
const mobileMenu = document.getElementById("mobileMenu")
const detailModal = document.getElementById("detailModal")
const detailContent = document.getElementById('detailContent')


let srchcontainer = document.getElementById('srchcontainer')

let SEBET = [];
let SEBET2 = [];
let AllProduct = [];

let BASE_API = "https://6a6756de157beab892d34a25.mockapi.io/api/v1";

//==================Menu ACILIB BAGLANMASI=============
function openMenu() {
    mobileMenu.classList.remove("hidden");
}

function closeMenu() {
    mobileMenu.classList.add("hidden");
}

// DETAIL JS

function modalibagla() {
    detailModal.style.display = 'none'
}

function modaliac(id) {

    detailModal.style.display = "flex";

    fetch(`${BASE_API}/Blog/${id}`)
        .then(res => res.json())
        .then(data => {

            detailContent.innerHTML = `

               
                <div class="bg-gray-100 flex items-center justify-center
                            min-h-[400px] p-8">

                    <img
                        src="${data.image}"
                        alt="${data.title}"
                        class="w-full h-[400px] object-contain
                               hover:scale-105 transition duration-500"
                    >

                </div>


              
                <div class="p-8 flex flex-col justify-center">

                    <!-- Category -->
                    <span class="text-sm text-pink-500 font-semibold
                                 uppercase tracking-wider mb-3">
                        ${data.category}
                    </span>


                    <h2 class="text-3xl md:text-4xl font-bold
                               text-gray-900 mb-4">
                        ${data.title}
                    </h2>


                 
                    <div class="flex items-center gap-2 mb-5">

                        <div class="text-yellow-400 text-lg">
                            ★★★★★
                        </div>

                        <span class="text-sm text-gray-500">
                            4.8 (24 reviews)
                        </span>

                    </div>


                   
                    <div class="mb-6">

                        <span class="text-3xl font-bold text-gray-900">
                            $${data.price}
                        </span>

                    </div>


               
                    <div class="flex items-center gap-4 mb-6">

                        <span class="font-semibold">
                            Quantity:
                        </span>

                        <div class="flex items-center border rounded-lg">

                            <button
                                onclick="detailMinus()"
                                class="w-10 h-10 text-xl hover:bg-gray-100">
                                −
                            </button>

                            <span id="detailQuantity"
                                class="w-10 text-center">
                                1
                            </span>

                            <button
                                onclick="detailPlus()"
                                class="w-10 h-10 text-xl hover:bg-gray-100">
                                +
                            </button>

                        </div>

                    </div>


                    <div class="flex gap-3">

                        <button
                            onclick="addcart('${data.id}')"
                            class="flex-1 bg-black text-white
                                   py-3 rounded-lg font-semibold
                                   hover:bg-gray-800 transition">
                            🛒 Add to Cart
                        </button>

                        <button
                            onclick="addwishlist('${data.id}')"
                            class="w-12 h-12 border border-gray-300
                                   rounded-lg text-xl
                                   hover:bg-pink-50 hover:text-pink-500
                                   transition">
                            ♡
                        </button>

                    </div>

                </div>
            `;


            detailQuantity = 1;

        });
}

let detailQuantity = 1;

function detailPlus() {

    detailQuantity++;

    document.getElementById("detailQuantity").innerText =
        detailQuantity;
}


function detailMinus() {

    if (detailQuantity > 1) {
        detailQuantity--;
    }

    document.getElementById("detailQuantity").innerText =
        detailQuantity;
}



// ==================== SLIDER ====================

let index = 0;

next.addEventListener("click", () => {
    index++;

    if (index > 2) {
        index = 0;
    }

    slider.style.transform = `translateX(-${index * 100}%)`;
});

prev.addEventListener("click", () => {
    index--;

    if (index < 0) {
        index = 2;
    }

    slider.style.transform = `translateX(-${index * 100}%)`;
});


// ==================== API ====================



function getShowData() {
    fetch(`${BASE_API}/Blog`)
        .then(res => res.json())
        .then(data => {

            AllProduct = data.map(product => ({
                ...product,
                id: String(product.id)
            }));

            renderProducts(AllProduct);
        })
        .catch(error => console.log("API error:", error));
}

getShowData();


// ==================== PRODUCTS ====================

function renderProducts(list) {

    cartContainer.innerHTML = "";

    list.forEach(product => {

        cartContainer.innerHTML += `
            <li class="bg-white flex flex-col rounded-md border border-slate-200 shadow-sm relative overflow-hidden">

                <div class="relative group">
                     <a href="#" onclick="modaliac('${product.id}')">
                        <img
                        src="${product.image}"
                        alt="${product.title}"
                        class="w-full h-[250px] object-contain p-5">
                    </a>
                    


                    <div class="
                        absolute left-3 top-1/2 -translate-y-1/2
                        flex flex-col gap-3
                        opacity-0 -translate-x-3
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        transition-all duration-300
                    ">

                        <button
                            onclick="addcart('${product.id}')"
                            class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow hover:bg-[#F34F8C] hover:text-white transition"
                            title="Add to cart"
                        >
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>

                        <button
                            onclick="addwishlist('${product.id}')"
                            class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow hover:bg-[#F34F8C] hover:text-white transition"
                            title="Add to wishlist"
                        >
                            <i class="fa-regular fa-heart"></i>
                        </button>

                        <button
                            class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow hover:bg-[#F34F8C] hover:text-white transition"
                            title="Compare this product"
                        >
                            <i class="fa-solid fa-code-compare"></i>
                        </button>

                        <button
                            class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow hover:bg-[#F34F8C] hover:text-white transition"
                            title="Quick view"
                        >
                            <i class="fa-regular fa-eye"></i>
                        </button>

                    </div>
                     <div class="pt-4 text-center">
        <h3 class="text-sm  text-gray-800 hover:text-pink-500">
            ${product.title}
        </h3>

        <p class="text-base font-medium text-pink-500 mt-2">
            $${product.price}
        </p>
    </div>

                </div>

            </li>
        `;
    });
}


// ==================== CATEGORYFILTER ====================

function filtrCtgry(name) {

    if (name === "AllProducts") {
        renderProducts(AllProduct);
    } else {

        let newmehsul = AllProduct.filter(
            c => c.category === name
        );

        renderProducts(newmehsul);
    }
}


// ==================== MODAL ====================

function opencart() {

    sebetmodal.style.display === "none" ? sebetmodal.style.display = "flex" : sebetmodal.style.display = "none"

}

function openwishlist() {

    wishlistmodal.style.display === "none" ? wishlistmodal.style.display = "flex" : wishlistmodal.style.display = "none"
}


// ==================== ADD TO CART ====================

function addcart(id) {

    id = String(id);

    let item = SEBET.find(e => e.id === id);

    if (item) {
        item.say++;
    } else {
        SEBET.push({
            id: id,
            say: 1
        });
    }

    showBasket();
    updatecount();
}


// ==================== ADD TO WISHLIST ====================

function addwishlist(id) {

    id = String(id);

    let item = SEBET2.find(e => e.id === id);

    if (item) {
        item.say++;
    } else {
        SEBET2.push({
            id: id,
            say: 1
        });
    }

    showBasket2();
    updatecount2();
}


// ========================================

function showBasket() {

    sebetlist.innerHTML = SEBET.map(item => {

        let product = AllProduct.find(
            p => p.id === item.id
        );

        if (!product) {
            return "";
        }

        return `
            <li class="flex gap-4 bg-white px-4 py-6 rounded-md border border-slate-300">

                <div class="flex gap-6 sm:gap-4 max-sm:flex-col">

                    <div class="w-24 h-24 shrink-0">
                        <img
                            src="${product.image}"
                            class="w-full h-full object-contain"
                            alt="${product.title}"
                        />
                    </div>

                    <div class="flex flex-col gap-4">

                        <div>
                            <h3 class="text-base font-semibold text-slate-900">
                                ${product.title}
                            </h3>

                            <p class="text-[13px] text-slate-600 mt-2">
                                Kategoriya:
                                <span class="font-medium">
                                    ${product.category}
                                </span>
                            </p>
                        </div>

                        <div class="mt-auto">
                            <p class="text-sm font-semibold text-slate-900">
                                ${product.price}$
                            </p>
                        </div>

                    </div>

                </div>

                <div class="ml-auto flex flex-col">

                    <div class="flex items-start gap-4 justify-end">

                        <button
                            onclick="addwishlist('${item.id}')"
                            type="button"
                            class="cursor-pointer"
                            title="Add to wishlist"
                        >
                            <i class="fa-regular fa-heart"></i>
                        </button>

                        <button
                            onclick="productdelete('${item.id}')"
                            type="button"
                            class="cursor-pointer"
                            title="Remove from cart"
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>

                    </div>

                    <div class="flex items-center mt-auto px-2.5 py-1.5 border border-slate-300 text-slate-900 font-medium text-xs rounded-md">

                        <button
                            onclick="productminus('${item.id}')"
                            type="button"
                            class="cursor-pointer"
                        >
                            <i class="fa-solid fa-minus"></i>
                        </button>

                        <span class="mx-3">${item.say}</span>

                        <button
                            onclick="productplus('${item.id}')"
                            type="button"
                            class="cursor-pointer"
                        >
                            <i class="fa-solid fa-plus"></i>
                        </button>

                    </div>

                </div>

            </li>
        `;

    }).join("");

}


// ==================== SHOW WISHLIST ====================

function showBasket2() {

    wishlistlist.innerHTML = SEBET2.map(item => {

        let product = AllProduct.find(
            p => p.id === item.id
        );

        if (!product) {
            return "";
        }

        return `
            <li class="flex gap-4 bg-white px-4 py-6 rounded-md border border-slate-300">

                <div class="flex gap-6 sm:gap-4 max-sm:flex-col">

                    <div class="w-24 h-24 shrink-0">
                        <img
                            src="${product.image}"
                            class="w-full h-full object-contain"
                            alt="${product.title}"
                        />
                    </div>

                    <div class="flex flex-col gap-4">

                        <div>
                            <h3 class="text-base font-semibold text-slate-900">
                                ${product.title}
                            </h3>

                            <p class="text-[13px] text-slate-600 mt-2">
                                Kategoriya:
                                <span class="font-medium">
                                    ${product.category}
                                </span>
                            </p>
                        </div>

                        <div class="mt-auto">
                            <p class="text-sm font-semibold text-slate-900">
                                ${product.price}$
                            </p>
                        </div>

                    </div>

                </div>

                <div class="ml-auto flex flex-col">

                    <div class="flex items-start gap-4 justify-end">

                        <button
                            onclick="productdelete2('${item.id}')"
                            type="button"
                            class="cursor-pointer"
                            title="Remove from wishlist"
                        >
                            <i class="fa-solid fa-trash"></i>
                        </button>

                    </div>

                    <div class="flex items-center mt-auto px-2.5 py-1.5 border border-slate-300 text-slate-900 font-medium text-xs rounded-md">

                        <button
                            onclick="productminus2('${item.id}')"
                            type="button"
                            class="cursor-pointer"
                        >
                            <i class="fa-solid fa-minus"></i>
                        </button>

                        <span class="mx-3">${item.say}</span>

                        <button
                            onclick="productplus2('${item.id}')"
                            type="button"
                            class="cursor-pointer"
                        >
                            <i class="fa-solid fa-plus"></i>
                        </button>

                    </div>

                </div>

            </li>
        `;

    }).join("");

}


function productplus(id) {

    id = String(id);

    let item = SEBET.find(e => e.id === id);

    if (item) {
        item.say++;
    }

    showBasket();
    updatecount();
}

function productminus(id) {

    id = String(id);

    let item = SEBET.find(e => e.id === id);

    if (item) {

        item.say--;

        if (item.say <= 0) {
            SEBET = SEBET.filter(e => e.id !== id);
        }

    }

    showBasket();
    updatecount();
}



function productplus2(id) {

    id = String(id);

    let item = SEBET2.find(e => e.id === id);

    if (item) {
        item.say++;
    }

    showBasket2();
    updatecount2();
}

function productminus2(id) {

    id = String(id);

    let item = SEBET2.find(e => e.id === id);

    if (item) {

        item.say--;

        if (item.say <= 0) {
            SEBET2 = SEBET2.filter(e => e.id !== id);
        }

    }

    showBasket2();
    updatecount2();
}


function productdelete(id) {

    SEBET = SEBET.filter(e => e.id !== id);

    showBasket();
    updatecount();
}

function productdelete2(id) {

    SEBET2 = SEBET2.filter(e => e.id !== id);

    showBasket2();
    updatecount2();
}



function updatecount() {

    cartcount.innerHTML = SEBET.reduce(
        (sum, i) => sum + i.say,
        0
    );

    cartcount.classList.remove("hidden");
}

function updatecount2() {

    wishlistcount.innerHTML = SEBET2.reduce(
        (sum, i) => sum + i.say,
        0
    );

    wishlistcount.classList.remove("hidden");
}

// ==================== SEARCH PART ====================

function axtariset(txt) {
    let searchInput = document.getElementById('searchInput')
    searchInput = txt.trim().toLowerCase();
    let axtarisSon = AllProduct.filter(s => s.title.toLowerCase().includes(searchInput) || s.category.toLowerCase().includes(searchInput))
    searchInput === '' ? srchcontainer.style.display = 'none' : srchcontainer.style.display = 'block'
    srcporduct(axtarisSon)

}


function srcporduct(axtarisSon) {

    srchcontainer.innerHTML = axtarisSon.map(item => {


        return `
                   <li>
                <a href="#" class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div class="w-12 h-12 shrink-0 bg-gray-100 p-1 rounded-md overflow-hidden">
                        <img src="${item.image}" alt="${item.title}" class="h-full w-full object-contain" />
                    </div>

                    <div class="overflow-hidden">
                        <h3 class="text-sm font-semibold text-slate-900 truncate">
                            ${item.title}
                        </h3>
                        <p class="text-xs text-blue-600 font-bold mt-0.5">
                            ${item.price} Azn
                        </p>
                    </div>
                </a>
            </li>`;
    }).join("")
}
