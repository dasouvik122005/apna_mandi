document.addEventListener('DOMContentLoaded', () => {
    // --- Global Data (Simulated Backend Data) ---
    const baseProducts = [ // Renamed to baseProducts as we will duplicate them
        {
            id: 'prod001',
            name: 'Fresh Tomatoes',
            image: 'food.png',
            description: 'Locally sourced, organic fresh tomatoes, perfect for sauces and curries. Available in various bulk quantities.',
            unit: 'kg',
            basePrice: 25.00,
            moq: 1, // Set MOQ to 1 for flexibility, discounts apply from 5kg
            tieredPricing: [
                { quantity: 1, discount: 0 },
                { quantity: 5, discount: 0.05 }, // 5% discount for 5kg+
                { quantity: 10, discount: 0.10 }, // 10% discount for 10kg+
                { quantity: 20, discount: 0.15 } // Example: 15% discount for 20kg+
            ],
            category: 'vegetables',
            supplier: 'Green Farms India',
            supplierRating: 4.8
        },
        {
            id: 'prod002',
            name: 'Basmati Rice',
            image: 'food.png',
            description: 'Premium aged Basmati rice, ideal for biryani and pulao. Long grain and aromatic. Sold in 10kg, 25kg, 50kg bags.',
            unit: 'kg',
            basePrice: 75.00,
            moq: 10,
            tieredPricing: [
                { quantity: 1, discount: 0 }, // If purchased less than MOQ, base price no discount
                { quantity: 10, discount: 0.05 }, // 5% discount for 10kg+
                { quantity: 25, discount: 0.10 }, // 10% discount for 25kg+
                { quantity: 50, discount: 0.15 }
            ],
            category: 'dairy',
            supplier: 'AgroMart Wholesalers',
            supplierRating: 4.5
        },
        {
            id: 'prod003',
            name: 'Ground Turmeric Powder',
            image: 'food.png',
            description: 'High-quality, pure turmeric powder, essential for Indian cooking. Rich in color and flavor. Available in 1kg, 5kg packs.',
            unit: 'kg',
            basePrice: 280.00,
            moq: 1,
            tieredPricing: [
                { quantity: 1, discount: 0 },
                { quantity: 5, discount: 0.05 },
                { quantity: 10, discount: 0.10 }
            ],
            category: 'spices',
            supplier: 'Spice Route Distributors',
            supplierRating: 4.9
        },
        {
            id: 'prod004',
            name: 'Refined Sunflower Oil',
            image: 'food.png',
            description: 'Healthy and light sunflower oil, perfect for frying and general cooking. Comes in 5L and 15L jerry cans.',
            unit: 'Litre',
            basePrice: 120.00,
            moq: 5,
            tieredPricing: [
                { quantity: 1, discount: 0 },
                { quantity: 5, discount: 0.05 },
                { quantity: 10, discount: 0.10 }, // Assuming 10L is also a tier for 10% discount
                { quantity: 15, discount: 0.12 } // Example: 12% discount for 15L+
            ],
            category: 'oils',
            supplier: 'Oil & More Supplies',
            supplierRating: 4.7
        },
        {
            id: 'prod005',
            name: 'Red Onions',
            image: 'food.png',
            description: 'Fresh red onions, good for gravy bases and salads. Medium to large size. Sold in 5kg and 10kg bags.',
            unit: 'kg',
            basePrice: 30.00,
            moq: 1,
            tieredPricing: [
                { quantity: 1, discount: 0 },
                { quantity: 5, discount: 0.05 },
                { quantity: 10, discount: 0.10 },
                { quantity: 25, discount: 0.15 }
            ],
            category: 'vegetables',
            supplier: 'Fresh Harvest Co.',
            supplierRating: 4.6
        },
        {
            id: 'prod006',
            name: 'Ginger Garlic Paste',
            image: 'food.png',
            description: 'Ready-to-use ginger garlic paste, a time-saver for busy kitchens. Made from fresh ingredients. Available in 1kg, 5kg tubs.',
            unit: 'kg',
            basePrice: 150.00,
            moq: 1,
            tieredPricing: [
                { quantity: 1, discount: 0 },
                { quantity: 5, discount: 0.05 },
                { quantity: 10, discount: 0.10 }
            ],
            category: 'spices',
            supplier: 'Kitchen Staples Ltd.',
            supplierRating: 4.7
        },
        {
            id: 'prod007',
            name: 'Disposable Food Containers',
            image: 'food.png',
            description: 'Eco-friendly, durable disposable food containers with lids. Perfect for packaging various street food items. Pack of 100.',
            unit: 'pack',
            basePrice: 450.00,
            moq: 1,
            tieredPricing: [
                { quantity: 1, discount: 0 },
                { quantity: 5, discount: 0.05 },
                { quantity: 10, discount: 0.10 }
            ],
            category: 'packaging',
            supplier: 'Pack & Go Solutions',
            supplierRating: 4.4
        },
        {
            id: 'prod008',
            name: 'Green Chillies',
            image: 'food.png',
            description: 'Spicy green chillies, adds a kick to any dish. Freshly picked. Sold per 1kg or 5kg bundles.',
            unit: 'kg',
            basePrice: 80.00,
            moq: 1,
            tieredPricing: [
                { quantity: 1, discount: 0 },
                { quantity: 5, discount: 0.05 },
                { quantity: 10, discount: 0.10 }
            ],
            category: 'vegetables',
            supplier: 'Veggie Fresh Mart',
            supplierRating: 4.7
        },
        {
            id: 'prod009',
            name: 'Fresh Coriander',
            image: 'food.png',
            description: 'Fresh, aromatic coriander leaves, perfect for garnishing and flavoring. Bundles of 500g.',
            unit: 'bundle',
            basePrice: 30.00,
            moq: 2,
            tieredPricing: [
                { quantity: 1, discount: 0 }, // For single bundles below MOQ
                { quantity: 2, discount: 0.05 }, // 5% discount for 2+ bundles
                { quantity: 10, discount: 0.10 } // 10% discount for 10+ bundles
            ],
            category: 'vegetables',
            supplier: 'Green Farms India',
            supplierRating: 4.8
        },
        {
            id: 'prod010',
            name: 'Mustard Seeds',
            image: 'food.png',
            description: 'High-quality mustard seeds, essential for tempering and pickling. Available in 500g, 1kg packs.',
            unit: 'kg',
            basePrice: 120.00,
            moq: 1,
            tieredPricing: [
                { quantity: 1, discount: 0 },
                { quantity: 5, discount: 0.05 },
                { quantity: 10, discount: 0.10 }
            ],
            category: 'spices',
            supplier: 'Spice Route Distributors',
            supplierRating: 4.9
        }
    ];

    let products = []; // This will be the expanded list of products

    // Function to duplicate products to reach ~100+ items
    const generateMoreProducts = () => {
        const targetCount = 100;
        if (baseProducts.length >= targetCount) {
            products = baseProducts;
            return;
        }

        let currentId = baseProducts.length;
        let generatedProducts = [...baseProducts]; // Start with base products

        while (generatedProducts.length < targetCount) {
            const productToDuplicate = baseProducts[currentId % baseProducts.length]; // Cycle through base products
            const newProduct = { ...productToDuplicate }; // Create a shallow copy
            newProduct.id = `prod${String(currentId + 1).padStart(3, '0')}`; // New unique ID
            newProduct.name = `${productToDuplicate.name} (Variety ${Math.floor(currentId / baseProducts.length) + 1})`; // Differentiate names
            generatedProducts.push(newProduct);
            currentId++;
        }
        products = generatedProducts;
    };

    generateMoreProducts(); // Call this function to populate the 'products' array


    let cartItems = [];
    let currentUser = null; // Store logged-in user's data
    let userAddresses = [];
    let userOrders = []; // Stores orders for the currently logged-in vendor user
    let allUsersOrders = {}; // Stores orders for all users, keyed by user email
    let isAdminLoggedIn = false;

    const DELIVERY_FEE = 50.00;
    const GST_RATE = 0.05; // 5% GST

    // Admin Credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'password'; // In a real app, this would be hashed and secured!


    // --- DOM Elements (Grouped for clarity) ---
    // Header & Navigation
    const homeLink = document.getElementById('homeLink');
    const mainNav = document.getElementById('mainNav');
    const globalSearchInput = document.getElementById('globalSearchInput');
    const cartIcon = document.getElementById('cartIcon');
    const cartCount = document.getElementById('cartCount');
    const loginRegisterBtn = document.getElementById('loginRegisterBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const closeMobileNav = document.getElementById('closeMobileNav');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn'); // Added for mobile menu logout

    // Sections
    const authSection = document.getElementById('authSection');
    const vendorDashboard = document.getElementById('vendorDashboard');
    const browseProductsSection = document.getElementById('browseProducts');
    const quickOrderSection = document.getElementById('quickOrder');
    const orderHistorySection = document.getElementById('orderHistory');
    const myAddressesSection = document.getElementById('myAddresses');
    const checkoutSection = document.getElementById('checkoutSection');
    const termsAndConditionsSection = document.getElementById('termsAndConditions');
    const privacyPolicySection = document.getElementById('privacyPolicy');
    const adminDashboard = document.getElementById('adminDashboard'); // New Admin Dashboard Section

    // Auth Forms
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginError = document.getElementById('loginError');
    const registerForm = document.getElementById('registerForm');
    const regBusinessNameInput = document.getElementById('regBusinessName');
    const regContactPersonInput = document.getElementById('regContactPerson');
    const regEmailInput = document.getElementById('regEmail');
    const regPasswordInput = document.getElementById('regPassword');
    const regGSTINInput = document.getElementById('regGSTIN');
    const regFSSAIInput = document.getElementById('regFSSAI');
    const registerError = document.getElementById('registerError');

    // Dashboard
    const dashboardWelcome = document.getElementById('dashboardWelcome');
    const dashboardCards = document.querySelectorAll('.dashboard-card');

    // Browse Products
    const productGrid = document.getElementById('productGrid');
    const noBrowseResults = document.getElementById('noBrowseResults');
    const categoryFilterBrowse = document.getElementById('categoryFilterBrowse');
    const priceRangeBrowse = document.getElementById('priceRangeBrowse');
    const priceValueBrowse = document.getElementById('priceValueBrowse');

    // Quick Order
    const quickOrderSearchInput = document.getElementById('quickOrderSearchInput');
    const quickOrderForm = document.getElementById('quickOrderForm');
    const quickOrderTableBody = document.getElementById('quickOrderTableBody');
    const noQuickOrderResults = document.getElementById('noQuickOrderResults');

    // Order History
    const orderHistoryList = document.getElementById('orderHistoryList');
    const noOrdersMessage = document.getElementById('noOrdersMessage');

    // My Addresses
    const addAddressForm = document.getElementById('addAddressForm');
    const addressLine1Input = document.getElementById('addressLine1');
    const addressLine2Input = document.getElementById('addressLine2');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const pincodeInput = document.getElementById('pincode');
    const addressList = document.getElementById('addressList');
    const noAddressesMessage = document.getElementById('noAddressesMessage');

    // Cart Modal
    const cartModal = document.getElementById('cartModal');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalItems = document.getElementById('cartTotalItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartGSTAmount = document.getElementById('cartGSTAmount'); // Added GST
    const cartGrandTotal = document.getElementById('cartGrandTotal'); // Added Grand Total
    const clearCartBtn = document.getElementById('clearCartBtn');
    const proceedToCheckoutBtn = document.getElementById('proceedToCheckoutBtn');
    const cartError = document.getElementById('cartError');

    // Checkout Section
    const checkoutSummaryList = document.getElementById('checkoutSummaryList');
    const checkoutTotalItems = document.getElementById('checkoutTotalItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutGSTAmount = document.getElementById('checkoutGSTAmount'); // Added GST
    const checkoutDeliveryFee = document.getElementById('checkoutDeliveryFee');
    const checkoutGrandTotal = document.getElementById('checkoutGrandTotal');
    const deliveryAddressSelect = document.getElementById('deliveryAddressSelect');
    const addAddressFromCheckoutBtn = document.getElementById('addAddressFromCheckoutBtn');
    // const poNumberInput = document.getElementById('poNumber'); // Removed PO Number
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const creditLineInfo = document.getElementById('creditLineInfo');
    const podInfo = document.getElementById('podInfo');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const checkoutError = document.getElementById('checkoutError');
    const addressError = document.getElementById('addressError');

    // Product Detail Modal
    const productDetailModal = document.getElementById('productDetailModal');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const modalProductCategory = document.getElementById('modalProductCategory');
    const modalProductMOQ = document.getElementById('modalProductMOQ');
    const modalProductSupplier = document.getElementById('modalProductSupplier');
    const modalProductSupplierRating = document.getElementById('modalProductSupplierRating');
    const modalProductTieredPricing = document.getElementById('modalProductTieredPricing');
    const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');

    // Order Success Modal
    const orderSuccessModal = document.getElementById('orderSuccessModal');
    const successOrderId = document.getElementById('successOrderId');
    const goToOrdersBtn = document.getElementById('goToOrdersBtn');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');

    // Invoice Modal
    const invoiceModal = document.getElementById('invoiceModal');
    const invoiceNumber = document.getElementById('invoiceNumber');
    const invoiceDate = document.getElementById('invoiceDate');
    const invoiceOrderId = document.getElementById('invoiceOrderId');
    const invoiceCustomerName = document.getElementById('invoiceCustomerName');
    const invoiceCustomerGSTIN = document.getElementById('invoiceCustomerGSTIN');
    const invoiceCustomerFSSAI = document.getElementById('invoiceCustomerFSSAI');
    const invoiceShippingAddress1 = document.getElementById('invoiceShippingAddress1');
    const invoiceShippingAddress2 = document.getElementById('invoiceShippingAddress2');
    const invoiceShippingCityStatePincode = document.getElementById('invoiceShippingCityStatePincode');
    const invoiceItemsTableBody = document.getElementById('invoiceItemsTableBody');
    const invoiceSubtotal = document.getElementById('invoiceSubtotal');
    const invoiceTotalGST = document.getElementById('invoiceTotalGST'); // Added GST to invoice
    const invoiceDeliveryFee = document.getElementById('invoiceDeliveryFee');
    const invoiceGrandTotal = document.getElementById('invoiceGrandTotal');
    const invoicePaymentMethod = document.getElementById('invoicePaymentMethod');
    // const invoicePONumber = document.getElementById('invoicePONumber'); // Removed PO Number
    const printInvoiceBtn = document.getElementById('printInvoiceBtn'); // Existing print button

    // Admin Login/Dashboard elements
    const adminLoginFab = document.getElementById('adminLoginFab');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminUsernameInput = document.getElementById('adminUsername');
    const adminPasswordInput = document.getElementById('adminPassword');
    const adminLoginError = document.getElementById('adminLoginError');
    const adminOrderSearchInput = document.getElementById('adminOrderSearchInput');
    const adminOrderTableBody = document.getElementById('adminOrderTableBody');
    const noAdminOrdersMessage = document.getElementById('noAdminOrdersMessage');


    // Global variable to track navigation source for "add address"
    const LAST_SECTION_BEFORE_ADDRESS_ADD_KEY = 'lastSectionBeforeAddressAdd';

    // --- Helper Functions ---

    // Utility for showing/hiding sections
    const showSection = (sectionElement) => {
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.add('hidden');
        });
        sectionElement.classList.remove('hidden');

        // Update active class in main nav (desktop)
        document.querySelectorAll('#mainNav a').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionElement.id) {
                link.classList.add('active');
            }
        });
        // Update active class in mobile nav
        document.querySelectorAll('#mobileNavOverlay nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionElement.id) {
                link.classList.add('active');
            }
        });
        // Special handling for dashboard link if mainNav doesn't have it
        if (sectionElement.id === 'vendorDashboard' || sectionElement.id === 'adminDashboard') {
            document.querySelectorAll('#mainNav a').forEach(link => link.classList.remove('active'));
            document.querySelectorAll('#mobileNavOverlay nav ul li a').forEach(link => link.classList.remove('active'));
        }
        // Close any open modals when switching sections
        document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hidden'));

        // Close mobile nav overlay if open
        mobileNavOverlay.classList.remove('active');
    };

    // Calculate price based on tiered pricing (percentage discount)
    const getTieredPrice = (productId, quantity) => {
        const product = products.find(p => p.id === productId);
        if (!product || !product.tieredPricing) return product.basePrice || 0;

        let applicableDiscount = 0;

        // Sort tiers by quantity in ascending order to find the highest applicable discount
        // Ensure that base price (quantity 1, discount 0) is always the first tier if it exists.
        const sortedTiers = [...product.tieredPricing].sort((a, b) => a.quantity - b.quantity);

        for (let i = 0; i < sortedTiers.length; i++) {
            if (quantity >= sortedTiers[i].quantity) {
                applicableDiscount = sortedTiers[i].discount;
            } else {
                break; // Quantities are sorted, so no further tiers will apply
            }
        }
        return product.basePrice * (1 - applicableDiscount);
    };

    // --- Local Storage Management ---
    const saveToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const loadFromLocalStorage = (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };

    const updateAuthUI = () => {
        if (isAdminLoggedIn) {
            loginRegisterBtn.style.display = 'none';
            logoutBtn.style.display = 'block'; // Admin can logout
            mainNav.classList.add('hidden'); // Hide vendor nav for admin
            hamburgerMenu.style.display = 'none'; // Hide hamburger for admin
            adminLoginFab.classList.add('hidden'); // Hide admin button
            showSection(adminDashboard); // Go to admin dashboard
            renderAdminOrders();
            return;
        }

        if (currentUser) {
            loginRegisterBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
            mainNav.classList.remove('hidden'); // Ensure desktop nav is visible
            hamburgerMenu.style.display = 'block'; // Ensure hamburger is visible (controlled by CSS media query)
            dashboardWelcome.textContent = `Welcome, ${currentUser.businessName || currentUser.contactPerson}!`;
            adminLoginFab.classList.remove('hidden'); // Show admin button for vendor view
            showSection(vendorDashboard); // Go to dashboard after login
        } else {
            loginRegisterBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
            mainNav.classList.add('hidden'); // Hide nav if not logged in
            hamburgerMenu.style.display = 'none'; // Hide hamburger
            adminLoginFab.classList.remove('hidden'); // Show admin button on auth page
            showSection(authSection); // Go to login/register if not logged in
            cartItems = []; // Clear cart on logout
            saveCartToLocalStorage();
        }
        renderCart(); // Always update cart display
    };

    // --- Data Persistence Calls ---
    const saveCartToLocalStorage = () => saveToLocalStorage('cartItems', cartItems);
    const loadCartFromLocalStorage = () => { cartItems = loadFromLocalStorage('cartItems') || []; };

    const saveCurrentUser = () => saveToLocalStorage('currentUser', currentUser);
    const loadCurrentUser = () => { currentUser = loadFromLocalStorage('currentUser'); };

    const saveUserAddresses = () => saveToLocalStorage(`${currentUser?.email}_addresses`, userAddresses); // Use optional chaining
    const loadUserAddresses = () => { userAddresses = loadFromLocalStorage(`${currentUser?.email}_addresses`) || []; };

    const saveUserOrders = () => {
        if (currentUser && currentUser.email) { // Ensure currentUser and its email exist
            allUsersOrders[currentUser.email] = userOrders; // Update specific user's orders in the global object
            saveToLocalStorage('allUsersOrders', allUsersOrders); // Save the entire global object
        }
    };
    const loadUserOrders = () => {
        if (currentUser && currentUser.email) { // Ensure currentUser and its email exist
            userOrders = allUsersOrders[currentUser.email] || [];
        } else {
            userOrders = [];
        }
    };

    const saveAllUsersOrders = () => saveToLocalStorage('allUsersOrders', allUsersOrders);


    // --- Render Functions ---

    const renderProductCards = (filteredProducts) => {
        productGrid.innerHTML = '';
        if (filteredProducts.length === 0) {
            noBrowseResults.classList.remove('hidden');
            return;
        } else {
            noBrowseResults.classList.add('hidden');
        }

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.dataset.id = product.id; // Store ID for click event

            // Determine price to display on card (e.g., lowest tiered price or base price)
            const displayPrice = getTieredPrice(product.id, product.moq); // Price at MOQ

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">From INR ${displayPrice.toFixed(2)}/${product.unit}</p>
                    <p class="moq-supplier">MOQ: ${product.moq} ${product.unit} | Supplier: ${product.supplier}</p>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    };

    const renderQuickOrderTable = (filteredProducts) => {
        quickOrderTableBody.innerHTML = '';
        if (filteredProducts.length === 0) {
            noQuickOrderResults.classList.remove('hidden');
            return;
        } else {
            noQuickOrderResults.classList.add('hidden');
        }

        filteredProducts.forEach(product => {
            const row = document.createElement('tr');
            row.dataset.id = product.id;

            let tieredPricingHtml = '<div class="tiered-pricing-info">';
            // Only show discount tiers, or "No discounts"
            const discountTiers = product.tieredPricing.filter(tier => tier.discount > 0);
            if (discountTiers.length > 0) {
                tieredPricingHtml += `Base: ₹${product.basePrice.toFixed(2)}/${product.unit}<br>`;
                discountTiers.forEach(tier => {
                    const discountedPrice = (product.basePrice * (1 - tier.discount)).toFixed(2);
                    tieredPricingHtml += `${tier.quantity}${product.unit}+: ₹${discountedPrice}/${product.unit} (${Math.round(tier.discount * 100)}% off) <br>`;
                });
            } else {
                tieredPricingHtml += `No tiered discounts.`;
            }

            tieredPricingHtml += '</div>';

            const cartItemQty = cartItems.find(item => item.id === product.id)?.quantity || 0;

            row.innerHTML = `
                <td><img src="${product.image}" alt="${product.name}" class="product-thumb">${product.name}</td>
                <td>INR ${product.basePrice.toFixed(2)}/${product.unit}</td>
                <td>${product.moq} ${product.unit}</td>
                <td>${tieredPricingHtml}</td>
                <td><input type="number" class="quick-order-qty" value="${cartItemQty}" min="0" data-id="${product.id}" placeholder="Qty"></td>
            `;
            quickOrderTableBody.appendChild(row);
        });
    };

    const renderCart = () => {
        cartItemsList.innerHTML = '';
        let totalItems = 0;
        let subtotal = 0;
        cartError.textContent = ''; // Clear previous errors
        cartError.style.color = ''; // Reset color

        if (cartItems.length === 0) {
            cartItemsList.innerHTML = '<li class="cart-empty-message">Your cart is empty.</li>';
            cartTotalItems.textContent = '0';
            cartSubtotal.textContent = 'INR 0.00';
            cartGSTAmount.textContent = 'INR 0.00';
            cartGrandTotal.textContent = 'INR 0.00';
            proceedToCheckoutBtn.disabled = true;
            clearCartBtn.disabled = true;
            cartCount.textContent = '0';
            return;
        }

        proceedToCheckoutBtn.disabled = false;
        clearCartBtn.disabled = false;
        let moqIssues = false;

        cartItems.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) { // Handle case where product might have been removed from source data
                console.warn(`Product with ID ${item.id} not found.`);
                return;
            }

            const itemPrice = getTieredPrice(item.id, item.quantity);
            const lineTotal = itemPrice * item.quantity;

            // Check MOQ compliance
            if (item.quantity < product.moq) {
                moqIssues = true;
                cartError.textContent = `Warning: ${item.name} requires a minimum quantity of ${product.moq} ${product.unit}.`;
                cartError.style.color = 'orange'; // Indicate warning not critical error
            }

            totalItems += item.quantity;
            subtotal += lineTotal;

            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="cart-item-details">
                    <strong>${item.name}</strong> <br>
                    <span>Price: INR ${itemPrice.toFixed(2)}/${item.unit} | Total: INR ${lineTotal.toFixed(2)}</span>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-qty" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="qty-input" data-id="${item.id}">
                    <button class="quantity-btn increase-qty" data-id="${item.id}">+</button>
                </div>
                <button class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
            `;
            cartItemsList.appendChild(listItem);
        });

        if (moqIssues) {
            proceedToCheckoutBtn.disabled = true;
        } else {
            cartError.textContent = ''; // Clear warning if all MOQs are now met
            cartError.style.color = '';
        }

        const gstAmount = subtotal * GST_RATE;
        const grandTotal = subtotal + gstAmount + DELIVERY_FEE;


        cartTotalItems.textContent = totalItems;
        cartSubtotal.textContent = `INR ${subtotal.toFixed(2)}`;
        cartGSTAmount.textContent = `INR ${gstAmount.toFixed(2)}`;
        cartGrandTotal.textContent = `INR ${grandTotal.toFixed(2)}`;
        cartCount.textContent = totalItems;
    };

    const renderOrderHistory = () => {
        orderHistoryList.innerHTML = '';
        if (userOrders.length === 0) {
            noOrdersMessage.classList.remove('hidden');
            return;
        } else {
            noOrdersMessage.classList.add('hidden');
        }

        userOrders.forEach(order => {
            const orderCard = document.createElement('li');
            orderCard.classList.add('order-card');
            const orderDate = new Date(order.orderDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

            let itemsHtml = order.items.map(item => `
                <li>${item.name} x ${item.quantity} ${item.unit} @ INR ${item.pricePerUnit.toFixed(2)}/${item.unit}</li>
            `).join('');

            const statusClass = order.status.toLowerCase().replace(/\s/g, ''); // "Placed" -> "placed"
            const paymentMethodText = order.paymentMethod === 'upi' ? 'UPI / Online' :
                                      order.paymentMethod === 'pod' ? 'Cash on Delivery (COD)' :
                                      'Credit Line (Net 30)';

            orderCard.innerHTML = `
                <div class="order-header">
                    <h3>Order ID: #${order.id}</h3>
                    <span class="status ${statusClass}">${order.status}</span>
                </div>
                <div class="order-details">
                    <p><strong>Order Date:</strong> ${orderDate}</p>
                    <p><strong>Total:</strong> INR ${order.grandTotal.toFixed(2)}</p>
                    <p><strong>Delivery Address:</strong> ${order.deliveryAddress.line1}, ${order.deliveryAddress.city} - ${order.deliveryAddress.pincode}</p>
                    <p><strong>Payment Method:</strong> ${paymentMethodText}</p>
                    <h4>Items:</h4>
                    <ul>${itemsHtml}</ul>
                </div>
                <button class="reorder-btn" data-order-id="${order.id}"><i class="fas fa-redo-alt"></i> Reorder This</button>
                <button class="generate-invoice-btn" data-order-id="${order.id}"><i class="fas fa-file-invoice"></i> Generate Invoice</button>
            `;
            orderHistoryList.appendChild(orderCard);
        });
    };

    const renderAddresses = () => {
        addressList.innerHTML = '';
        if (userAddresses.length === 0) {
            noAddressesMessage.classList.remove('hidden');
            return;
        } else {
            noAddressesMessage.classList.add('hidden');
        }

        userAddresses.forEach((address, index) => {
            const addressCard = document.createElement('li');
            addressCard.classList.add('address-card');
            addressCard.innerHTML = `
                <div class="address-details">
                    <p>${address.line1}</p>
                    ${address.line2 ? `<p>${address.line2}</p>` : ''}
                    <p>${address.city}, ${address.state} - ${address.pincode}</p>
                </div>
                <div class="address-actions">
                    <button class="delete-address-btn" data-index="${index}"><i class="fas fa-trash-alt"></i> Delete</button>
                </div>
            `;
            addressList.appendChild(addressCard);
        });

        // Update delivery address select in checkout
        updateDeliveryAddressSelect();
    };

    const updateDeliveryAddressSelect = () => {
        deliveryAddressSelect.innerHTML = '<option value="">Select an address</option>';
        userAddresses.forEach((address, index) => {
            const option = document.createElement('option');
            option.value = index; // Use index to reference in array
            option.textContent = `${address.line1}, ${address.city} - ${address.pincode}`;
            deliveryAddressSelect.appendChild(option);
        });
    };

    const renderCheckoutSummary = () => {
        checkoutSummaryList.innerHTML = '';
        let currentSubtotal = 0;
        let currentTotalItems = 0;

        cartItems.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                const pricePerUnit = getTieredPrice(item.id, item.quantity);
                const lineTotal = pricePerUnit * item.quantity;
                currentSubtotal += lineTotal;
                currentTotalItems += item.quantity;

                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${product.name} x ${item.quantity} ${product.unit}</span>
                    <strong>INR ${lineTotal.toFixed(2)}</strong>
                `;
                checkoutSummaryList.appendChild(listItem);
            }
        });

        const gstAmount = currentSubtotal * GST_RATE;
        const grandTotal = currentSubtotal + gstAmount + DELIVERY_FEE;

        checkoutTotalItems.textContent = currentTotalItems;
        checkoutSubtotal.textContent = `INR ${currentSubtotal.toFixed(2)}`;
        checkoutGSTAmount.textContent = `INR ${gstAmount.toFixed(2)}`;
        checkoutDeliveryFee.textContent = `INR ${DELIVERY_FEE.toFixed(2)}`;
        checkoutGrandTotal.textContent = `INR ${grandTotal.toFixed(2)}`;

        // Enable/disable place order button based on cart content and selected address
        if (cartItems.length === 0 || deliveryAddressSelect.value === "") { // Check for empty string value explicitly
            placeOrderBtn.disabled = true;
            checkoutError.textContent = 'Please add items to cart and select a delivery address.';
        } else {
            placeOrderBtn.disabled = false;
            checkoutError.textContent = '';
        }
    };

    const populateInvoiceModal = (order) => {
        // This function can be called by both vendor history and admin dashboard
        // Needs the 'order' object which should contain customer details for admin view
        if (!order) return;

        const orderDate = new Date(order.orderDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
        const invoiceGenDate = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

        invoiceNumber.textContent = `INV-${order.id.split('-')[1]}-${Date.now().toString().slice(-4)}`; // Dummy invoice number
        invoiceDate.textContent = invoiceGenDate;
        invoiceOrderId.textContent = order.id;

        // Use order's stored customer info for invoice
        invoiceCustomerName.textContent = order.customer.businessName || order.customer.contactPerson;
        invoiceCustomerGSTIN.textContent = order.customer.gstin ? `GSTIN: ${order.customer.gstin}` : 'N/A';
        invoiceCustomerFSSAI.textContent = `FSSAI: ${order.customer.fssai || 'N/A'}`;

        invoiceShippingAddress1.textContent = order.deliveryAddress.line1;
        invoiceShippingAddress2.textContent = order.deliveryAddress.line2 || '';
        invoiceShippingCityStatePincode.textContent = `${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`;

        invoiceItemsTableBody.innerHTML = '';
        order.items.forEach((item, index) => {
            const product = products.find(p => p.id === item.id);
            const lineItemPrice = item.pricePerUnit * item.quantity;
            const lineItemGST = lineItemPrice * GST_RATE;
            const lineItemTotalIncGST = lineItemPrice + lineItemGST;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td class="text-right">${item.quantity} ${item.unit}</td>
                <td class="text-right">${item.pricePerUnit.toFixed(2)}</td>
                <td class="text-right">${lineItemGST.toFixed(2)}</td>
                <td class="text-right">${lineItemTotalIncGST.toFixed(2)}</td>
            `;
            invoiceItemsTableBody.appendChild(row);
        });

        const totalGSTAmount = order.subtotal * GST_RATE;

        invoiceSubtotal.textContent = order.subtotal.toFixed(2);
        invoiceTotalGST.textContent = totalGSTAmount.toFixed(2);
        invoiceDeliveryFee.textContent = DELIVERY_FEE.toFixed(2);
        invoiceGrandTotal.textContent = (order.subtotal + totalGSTAmount + DELIVERY_FEE).toFixed(2); // Recalculate grand total for invoice for consistency

        invoicePaymentMethod.textContent = order.paymentMethod === 'upi' ? 'UPI / Online Payment' :
                                         order.paymentMethod === 'pod' ? 'Cash on Delivery (COD)' :
                                         'Credit Line (Net 30)';
        invoiceModal.classList.remove('hidden');
    };

    const renderAdminOrders = (searchTerm = '') => {
        adminOrderTableBody.innerHTML = '';
        const allOrdersArray = [];
        for (const userEmail in allUsersOrders) {
            allUsersOrders[userEmail].forEach(order => {
                allOrdersArray.push({ ...order, userEmail: userEmail }); // Add user email to order object
            });
        }

        let filteredOrders = allOrdersArray;

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredOrders = allOrdersArray.filter(order =>
                order.id.toLowerCase().includes(lowerCaseSearchTerm) ||
                (order.customer.businessName && order.customer.businessName.toLowerCase().includes(lowerCaseSearchTerm)) ||
                (order.customer.contactPerson && order.customer.contactPerson.toLowerCase().includes(lowerCaseSearchTerm)) ||
                order.items.some(item => item.name.toLowerCase().includes(lowerCaseSearchTerm))
            );
        }

        if (filteredOrders.length === 0) {
            noAdminOrdersMessage.classList.remove('hidden');
            return;
        } else {
            noAdminOrdersMessage.classList.add('hidden');
        }

        // Sort by date, most recent first
        filteredOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

        filteredOrders.forEach(order => {
            const row = document.createElement('tr');
            row.dataset.orderId = order.id;
            row.dataset.userEmail = order.userEmail;

            const orderDate = new Date(order.orderDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
            const statusClass = order.status.toLowerCase().replace(/\s/g, '');

            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer.businessName || order.customer.contactPerson}</td>
                <td>INR ${order.grandTotal.toFixed(2)}</td>
                <td>${orderDate}</td>
                <td>
                    <select class="status-dropdown ${statusClass}" data-order-id="${order.id}" data-user-email="${order.userEmail}">
                        <option value="Placed" ${order.status === 'Placed' ? 'selected' : ''}>Placed</option>
                        <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <button class="generate-invoice-btn" data-order-id="${order.id}" data-user-email="${order.userEmail}"><i class="fas fa-file-invoice"></i> Invoice</button>
                </td>
            `;
            adminOrderTableBody.appendChild(row);
        });
    };


    // --- Event Handlers ---

    // Navigation and Section Switching
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (isAdminLoggedIn) {
            showSection(adminDashboard);
        } else if (currentUser) {
            showSection(vendorDashboard);
        } else {
            showSection(authSection);
        }
    });

    // Mobile Hamburger Menu Toggle
    hamburgerMenu.addEventListener('click', () => {
        mobileNavOverlay.classList.add('active');
    });

    closeMobileNav.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
    });

    // Delegated click for mobile nav links
    mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.dataset.section) {
            e.preventDefault();
            const sectionId = e.target.dataset.section;
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                showSection(targetSection);
                if (sectionId === 'browseProducts') applyFilters();
                if (sectionId === 'quickOrder') renderQuickOrderTable(products);
                if (sectionId === 'orderHistory') renderOrderHistory();
                if (sectionId === 'myAddresses') renderAddresses();
            }
        }
    });

    // Delegated click for footer links
    document.querySelector('footer').addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.dataset.section) {
            e.preventDefault();
            const sectionId = e.target.dataset.section;
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                showSection(targetSection);
            }
        }
    });


    mainNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.dataset.section) {
            e.preventDefault();
            const sectionId = e.target.dataset.section;
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                showSection(targetSection);
                if (sectionId === 'browseProducts') applyFilters(); // Re-render if going to browse
                if (sectionId === 'quickOrder') renderQuickOrderTable(products); // Re-render quick order
                if (sectionId === 'orderHistory') renderOrderHistory(); // Re-render order history
                if (sectionId === 'myAddresses') renderAddresses(); // Re-render addresses
            }
        }
    });

    dashboardCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const sectionId = e.currentTarget.dataset.section;
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                showSection(targetSection);
                if (sectionId === 'browseProducts') applyFilters();
                if (sectionId === 'quickOrder') renderQuickOrderTable(products);
                if (sectionId === 'orderHistory') renderOrderHistory();
                if (sectionId === 'myAddresses') renderAddresses();
            }
        });
    });

    // --- Authentication ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;

        const users = loadFromLocalStorage('registeredUsers') || [];
        const user = users.find(u => u.email === email && u.password === password); // Simple password check

        if (user) {
            currentUser = user;
            saveCurrentUser();
            loadUserAddresses();
            loadUserOrders(); // Load orders specific to this user
            loginError.textContent = '';
            updateAuthUI();
        } else {
            loginError.textContent = 'Invalid email or password.';
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const businessName = regBusinessNameInput.value;
        const contactPerson = regContactPersonInput.value;
        const email = regEmailInput.value;
        const password = regPasswordInput.value;
        const gstin = regGSTINInput.value;
        const fssai = regFSSAIInput.value;

        const users = loadFromLocalStorage('registeredUsers') || [];
        if (users.some(u => u.email === email)) {
            registerError.textContent = 'Email already registered. Please login.';
            return;
        }

        if (!fssai) {
            registerError.textContent = 'FSSAI License Number is required for business registration.';
            return;
        }

        const newUser = {
            id: 'user_' + Date.now(),
            businessName,
            contactPerson,
            email,
            password, // In real app, this would be hashed!
            gstin,
            fssai,
            isApproved: true // Simulate instant approval for demo purposes
        };
        users.push(newUser);
        saveToLocalStorage('registeredUsers', users);

        registerError.textContent = 'Registration successful! You can now login.';
        registerError.style.color = 'green'; // Success message
        registerForm.reset(); // Clear form
    });

    loginRegisterBtn.addEventListener('click', () => {
        showSection(authSection);
        loginError.textContent = '';
        registerError.textContent = '';
    });

    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        isAdminLoggedIn = false; // Ensure admin status is cleared
        saveCurrentUser();
        updateAuthUI();
        alert('You have been logged out.');
    });

    mobileLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentUser = null;
        isAdminLoggedIn = false; // Ensure admin status is cleared
        saveCurrentUser();
        updateAuthUI();
        alert('You have been logged out.');
        mobileNavOverlay.classList.remove('active'); // Close mobile menu after logout
    });

    // --- Product Browse and Filtering ---
    const applyFilters = () => {
        const searchTerm = globalSearchInput.value.toLowerCase();
        const selectedCategory = categoryFilterBrowse.value;
        const maxPrice = parseFloat(priceRangeBrowse.value);

        let filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesPrice = product.basePrice <= maxPrice; // Simplified: filtering by base price
            return matchesSearch && matchesCategory && matchesPrice;
        });
        renderProductCards(filtered);
    };

    globalSearchInput.addEventListener('input', () => {
        // Apply global search only when in browse or quick order sections
        if (!browseProductsSection.classList.contains('hidden')) {
            applyFilters();
        } else if (!quickOrderSection.classList.contains('hidden')) {
            const searchTerm = globalSearchInput.value.toLowerCase(); // Use global search for quick order too
            const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
            renderQuickOrderTable(filtered);
        } else if (!adminDashboard.classList.contains('hidden')) {
            renderAdminOrders(globalSearchInput.value); // Apply search to admin orders
        }
    });

    categoryFilterBrowse.addEventListener('change', applyFilters);

    priceRangeBrowse.addEventListener('input', () => {
        priceValueBrowse.textContent = `INR ${priceRangeBrowse.value}+`;
        applyFilters();
    });

    // Product Card Click (Open Product Detail Modal)
    productGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card && !e.target.classList.contains('add-to-cart-btn')) { // Don't open modal if add to cart button is clicked
            const productId = card.dataset.id;
            const product = products.find(p => p.id === productId);
            if (product) {
                modalProductImage.src = product.image;
                modalProductImage.alt = product.name;
                modalProductName.textContent = product.name;
                modalProductPrice.textContent = `INR ${product.basePrice.toFixed(2)}/${product.unit}`; // Show base price here
                modalProductDescription.textContent = product.description;
                modalProductCategory.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
                modalProductMOQ.textContent = `${product.moq} ${product.unit}`;
                modalProductSupplier.textContent = product.supplier;
                modalProductSupplierRating.textContent = product.supplierRating;

                modalProductTieredPricing.innerHTML = '';
                // Display tiered pricing with calculated discounted prices
                product.tieredPricing.forEach(tier => {
                    const li = document.createElement('li');
                    const discountedPrice = (product.basePrice * (1 - tier.discount)).toFixed(2);
                    const discountText = tier.discount > 0 ? `(${Math.round(tier.discount * 100)}% off)` : '';
                    li.textContent = `Buy ${tier.quantity}+ ${product.unit} for INR ${discountedPrice}/${product.unit} ${discountText}`;
                    modalProductTieredPricing.appendChild(li);
                });

                modalAddToCartBtn.dataset.id = product.id;
                productDetailModal.classList.remove('hidden');
            }
        }
    });

    // Add to Cart from Product Grid / Product Detail Modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            if (!currentUser) {
                alert('Please login or register to add items to cart.');
                showSection(authSection);
                return;
            }

            const productId = e.target.dataset.id;
            const productToAdd = products.find(p => p.id === productId);

            if (productToAdd) {
                const existingCartItem = cartItems.find(item => item.id === productId);
                const quantityToAdd = productToAdd.moq; // Add MOQ quantity by default for B2B

                if (existingCartItem) {
                    existingCartItem.quantity += quantityToAdd;
                } else {
                    cartItems.push({ ...productToAdd, quantity: quantityToAdd });
                }
                saveCartToLocalStorage();
                renderCart();
                alert(`${productToAdd.name} (MOQ: ${productToAdd.moq} ${productToAdd.unit}) added to cart!`);
                productDetailModal.classList.add('hidden'); // Close modal if added from there
            }
        }
    });

    // --- Quick Order Logic ---
    quickOrderSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
        renderQuickOrderTable(filtered);
    });

    quickOrderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const qtyInputs = quickOrderTableBody.querySelectorAll('.quick-order-qty');
        let itemsAdded = 0;
        let moqAlertShown = false; // Flag to show alert only once

        qtyInputs.forEach(input => {
            const productId = input.dataset.id;
            const quantity = parseInt(input.value);
            const product = products.find(p => p.id === productId);

            if (quantity > 0 && product) {
                // Check MOQ for quick order
                if (quantity < product.moq) {
                    if (!moqAlertShown) {
                        alert(`Error: Quantity for ${product.name} must be at least ${product.moq} ${product.unit}. Please adjust.`);
                        moqAlertShown = true;
                    }
                    return; // Prevent adding if MOQ not met
                }

                const existingCartItem = cartItems.find(item => item.id === productId);
                if (existingCartItem) {
                    existingCartItem.quantity += quantity;
                } else {
                    cartItems.push({ ...product, quantity: quantity });
                }
                itemsAdded++;
                input.value = 0; // Reset input after adding
            }
        });

        if (itemsAdded > 0) {
            saveCartToLocalStorage();
            renderCart();
            alert(`${itemsAdded} items added to cart successfully from Quick Order!`);
        } else if (!moqAlertShown) {
            alert('No valid quantities entered for Quick Order.');
        }
        // Re-render table to clear inputs and apply current filter (important for quick order UX)
        renderQuickOrderTable(products.filter(p => p.name.toLowerCase().includes(quickOrderSearchInput.value.toLowerCase())));
    });

    // --- Cart Modal Logic ---
    cartIcon.addEventListener('click', () => {
        if (!currentUser) {
            alert('Please login or register to use the cart.');
            showSection(authSection);
            return;
        }
        cartModal.classList.remove('hidden');
        renderCart(); // Ensure cart is up-to-date when opened
    });

    // Close Modals (delegated)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button')) {
            const modalId = e.target.dataset.modal;
            document.getElementById(modalId).classList.add('hidden');
        } else if (e.target.classList.contains('modal')) { // Close modals by clicking outside (removed id !== 'invoiceModal' check here)
            e.target.classList.add('hidden');
        }
    });

    // Cart Quantity and Remove buttons (delegated event listener on cartItemsList)
    cartItemsList.addEventListener('click', (e) => {
        const target = e.target;
        const input = target.closest('.cart-item-quantity')?.querySelector('.qty-input');
        const materialId = target.dataset.id || input?.dataset.id; // Get ID from button or input

        if (!materialId) return;

        const itemIndex = cartItems.findIndex(item => item.id === materialId);

        if (itemIndex > -1) {
            let currentQty = cartItems[itemIndex].quantity;
            const product = products.find(p => p.id === materialId);

            if (target.classList.contains('increase-qty')) {
                currentQty++;
            } else if (target.classList.contains('decrease-qty')) {
                currentQty--;
            } else if (target.classList.contains('qty-input')) {
                currentQty = parseInt(target.value);
            } else if (target.classList.contains('cart-item-remove')) {
                cartItems.splice(itemIndex, 1); // Remove item directly
                saveCartToLocalStorage();
                renderCart();
                return; // Exit as item is removed
            }

            if (isNaN(currentQty) || currentQty < 0) currentQty = 0; // Sanitize input

            // Enforce MOQ if quantity is less than MOQ and not zero
            if (product && currentQty > 0 && currentQty < product.moq) {
                alert(`Quantity for ${product.name} must be at least ${product.moq} ${product.unit}. Adjusting quantity.`);
                currentQty = product.moq; // Force to MOQ if less
            }

            if (currentQty <= 0) {
                cartItems.splice(itemIndex, 1); // Remove if quantity becomes 0 or less
            } else {
                cartItems[itemIndex].quantity = currentQty;
            }
            saveCartToLocalStorage();
            renderCart();
        }
    });

    // Live update quantity in cart input
    cartItemsList.addEventListener('change', (e) => {
        if (e.target.classList.contains('qty-input')) {
            const materialId = e.target.dataset.id;
            const newQty = parseInt(e.target.value);
            const itemIndex = cartItems.findIndex(item => item.id === materialId);

            if (itemIndex > -1) {
                const product = products.find(p => p.id === materialId);
                let quantityToSet = newQty;

                if (isNaN(newQty) || newQty < 0) {
                    quantityToSet = 0;
                } else if (product && newQty > 0 && newQty < product.moq) {
                    alert(`Quantity for ${product.name} must be at least ${product.moq} ${product.unit}. Setting to MOQ.`);
                    quantityToSet = product.moq;
                }

                if (quantityToSet <= 0) {
                    cartItems.splice(itemIndex, 1);
                } else {
                    cartItems[itemIndex].quantity = quantityToSet;
                }
                saveCartToLocalStorage();
                renderCart();
            }
        }
    });


    // Clear Cart button
    clearCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            cartItems = [];
            saveCartToLocalStorage();
            renderCart();
            cartError.textContent = '';
        }
    });

    // --- Checkout Logic ---
    proceedToCheckoutBtn.addEventListener('click', () => {
        if (!currentUser) {
            alert('Please login or register to proceed to checkout.');
            showSection(authSection);
            return;
        }
        if (cartItems.length === 0) {
            cartError.textContent = 'Your cart is empty. Please add items before checkout.';
            return;
        }
        // Check all MOQs before proceeding
        const moqNotMet = cartItems.some(item => {
            const product = products.find(p => p.id === item.id);
            return product && item.quantity < product.moq;
        });

        if (moqNotMet) {
            cartError.textContent = 'Please adjust quantities to meet Minimum Order Quantities for all items.';
            return;
        }

        cartModal.classList.add('hidden');
        showSection(checkoutSection);
        updateDeliveryAddressSelect(); // Ensure dropdown is fresh

        // Auto-select first address if available and then render summary
        if (userAddresses.length > 0) {
            deliveryAddressSelect.value = 0; // Select the first address
            renderCheckoutSummary(); // Explicitly call to update button state
        } else {
            deliveryAddressSelect.value = ''; // Ensure no address is pre-selected if none exist
            checkoutError.textContent = 'Please add a delivery address to proceed.'; // Prompt to add address
            placeOrderBtn.disabled = true;
        }

        document.querySelector('input[name="paymentMethod"][value="upi"]').checked = true; // Default payment
        creditLineInfo.classList.add('hidden');
        podInfo.classList.add('hidden');
        // Clear checkoutError here as it's handled by select/place order checks
        checkoutError.textContent = '';
        addressError.textContent = '';
    });

    deliveryAddressSelect.addEventListener('change', () => {
        renderCheckoutSummary(); // Re-render to enable/disable place order button
        if (deliveryAddressSelect.value) {
            addressError.textContent = '';
        } else {
            addressError.textContent = 'Please select a delivery address.';
        }
    });

    addAddressFromCheckoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Store current section before navigating to add address
        localStorage.setItem(LAST_SECTION_BEFORE_ADDRESS_ADD_KEY, checkoutSection.id);
        showSection(myAddressesSection);
        // Optionally scroll to add address form
        setTimeout(() => addAddressForm.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            creditLineInfo.classList.add('hidden');
            podInfo.classList.add('hidden');
            if (e.target.value === 'credit') {
                creditLineInfo.classList.remove('hidden');
            } else if (e.target.value === 'pod') {
                podInfo.classList.remove('hidden');
            }
        });
    });

    placeOrderBtn.addEventListener('click', () => {
        if (cartItems.length === 0) {
            checkoutError.textContent = 'Cart is empty. Please add items.';
            return;
        }
        if (deliveryAddressSelect.value === "") { // Explicitly check empty string for address
            checkoutError.textContent = 'Please select a delivery address.';
            return;
        }

        const selectedAddressIndex = parseInt(deliveryAddressSelect.value);
        const selectedAddress = userAddresses[selectedAddressIndex];
        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        if (!selectedAddress) {
            checkoutError.textContent = 'Invalid delivery address selected.';
            return;
        }

        const orderItems = cartItems.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            pricePerUnit: getTieredPrice(item.id, item.quantity),
        }));

        const subtotal = orderItems.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);
        const gstAmount = subtotal * GST_RATE;
        const grandTotal = subtotal + gstAmount + DELIVERY_FEE;
        const orderId = `SES-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`; // Unique-ish ID

        const newOrder = {
            id: orderId,
            orderDate: new Date().toISOString(),
            items: orderItems,
            deliveryAddress: selectedAddress,
            paymentMethod: selectedPaymentMethod,
            subtotal: subtotal,
            grandTotal: grandTotal,
            gstAmount: gstAmount, // Store GST for invoice accuracy
            status: 'Placed', // Initial status
            customer: { // Store relevant customer info with the order for admin panel
                id: currentUser.id,
                email: currentUser.email,
                businessName: currentUser.businessName,
                contactPerson: currentUser.contactPerson,
                gstin: currentUser.gstin,
                fssai: currentUser.fssai
            }
        };

        // FIX: Add to userOrders for the current user once.
        userOrders.unshift(newOrder);
        saveUserOrders(); // This correctly saves to allUsersOrders as well via `userOrders`

        cartItems = []; // Clear cart after order
        saveCartToLocalStorage();
        renderCart(); // Update cart count in header

        successOrderId.textContent = `#${orderId}`;
        showSection(orderSuccessModal); // Show success modal
    });

    // --- Order Success Modal Actions ---
    goToOrdersBtn.addEventListener('click', () => {
        orderSuccessModal.classList.add('hidden');
        showSection(orderHistorySection);
        renderOrderHistory();
    });

    continueShoppingBtn.addEventListener('click', () => {
        orderSuccessModal.classList.add('hidden');
        showSection(browseProductsSection);
        applyFilters();
    });

    // --- My Addresses Logic ---
    addAddressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newAddress = {
            line1: addressLine1Input.value.trim(),
            line2: addressLine2Input.value.trim(),
            city: cityInput.value.trim(),
            state: stateInput.value.trim(),
            pincode: pincodeInput.value.trim()
        };

        if (newAddress.line1 && newAddress.city && newAddress.state && newAddress.pincode.length === 6) {
            userAddresses.push(newAddress);
            saveUserAddresses();
            renderAddresses();
            addAddressForm.reset();
            alert('Address saved successfully!');

            // Logic to go back to checkout if came from there
            const lastVisited = localStorage.getItem(LAST_SECTION_BEFORE_ADDRESS_ADD_KEY);
            if (lastVisited === checkoutSection.id) {
                localStorage.removeItem(LAST_SECTION_BEFORE_ADDRESS_ADD_KEY); // Clear flag
                showSection(checkoutSection);
                updateDeliveryAddressSelect(); // Refresh dropdown
                // Auto-select the newly added address (which is always the last one in the array)
                deliveryAddressSelect.value = userAddresses.length - 1;
                renderCheckoutSummary(); // Update summary with newly selected address
            }
        } else {
            alert('Please fill in all required address fields correctly (Pincode must be 6 digits).');
        }
    });

    addressList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-address-btn')) {
            const indexToDelete = parseInt(e.target.dataset.index);
            if (confirm('Are you sure you want to delete this address?')) {
                userAddresses.splice(indexToDelete, 1);
                saveUserAddresses();
                renderAddresses();
                alert('Address deleted.');
            }
        }
    });

    // --- Reorder from History ---
    orderHistoryList.addEventListener('click', (e) => {
        if (e.target.classList.contains('reorder-btn')) {
            const orderId = e.target.dataset.orderId;
            const orderToReorder = userOrders.find(order => order.id === orderId);

            if (orderToReorder) {
                // Confirm with user before clearing cart
                if (cartItems.length > 0 && !confirm('Your current cart will be cleared to reorder this. Continue?')) {
                    return;
                }

                cartItems = []; // Clear current cart first
                orderToReorder.items.forEach(item => {
                    const product = products.find(p => p.id === item.id);
                    if (product) {
                        cartItems.push({
                            id: product.id,
                            name: product.name,
                            quantity: item.quantity,
                            unit: product.unit,
                        });
                    }
                });
                saveCartToLocalStorage();
                renderCart();
                alert(`Order #${orderId} has been added to your cart for reorder.`);
                cartModal.classList.remove('hidden'); // Show cart with reordered items
            }
        }
        // --- Generate Invoice from History ---
        else if (e.target.classList.contains('generate-invoice-btn')) {
            const orderId = e.target.dataset.orderId;
            const orderToInvoice = userOrders.find(order => order.id === orderId);
            if (orderToInvoice) {
                populateInvoiceModal(orderToInvoice);
            } else {
                alert('Order not found for invoice generation.');
            }
        }
    });

    // --- Admin Login/Dashboard Logic ---
    adminLoginFab.addEventListener('click', () => {
        adminLoginModal.classList.remove('hidden');
        adminLoginError.textContent = '';
        adminLoginForm.reset();
    });

    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = adminUsernameInput.value;
        const password = adminPasswordInput.value;

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            isAdminLoggedIn = true;
            adminLoginModal.classList.add('hidden');
            updateAuthUI(); // Transition to admin dashboard
            globalSearchInput.value = ''; // Clear search when switching context
            renderAdminOrders(); // Initial render of all orders
        } else {
            adminLoginError.textContent = 'Invalid admin credentials.';
        }
    });

    adminOrderSearchInput.addEventListener('input', (e) => {
        renderAdminOrders(e.target.value);
    });

    adminOrderTableBody.addEventListener('change', (e) => {
        if (e.target.classList.contains('status-dropdown')) {
            const orderId = e.target.dataset.orderId;
            const userEmail = e.target.dataset.userEmail;
            const newStatus = e.target.value;

            // Find the specific order within allUsersOrders and update its status
            if (allUsersOrders[userEmail]) {
                const orderIndex = allUsersOrders[userEmail].findIndex(order => order.id === orderId);
                if (orderIndex > -1) {
                    allUsersOrders[userEmail][orderIndex].status = newStatus;
                    saveAllUsersOrders(); // Save the updated status to global orders

                    // Update the dropdown's class for styling immediately
                    e.target.className = `status-dropdown ${newStatus.toLowerCase().replace(/\s/g, '')}`;

                    alert(`Order ${orderId} status updated to ${newStatus}.`);

                    // If the current user (vendor) is the one whose order was updated, re-render their order history
                    if (currentUser && currentUser.email === userEmail) {
                        loadUserOrders(); // Reload specific user's orders to get latest status
                        renderOrderHistory(); // Re-render their view
                    }
                }
            }
        }
    });

    // Delegated click for "Generate Invoice" on admin dashboard
    adminOrderTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('generate-invoice-btn')) {
            const orderId = e.target.dataset.orderId;
            const userEmail = e.target.dataset.userEmail;

            const userOrdersForInvoice = allUsersOrders[userEmail];
            if (userOrdersForInvoice) {
                const orderToInvoice = userOrdersForInvoice.find(order => order.id === orderId);
                if (orderToInvoice) {
                    // Temporarily set currentUser to the user who placed the order for invoice population
                    // This is a workaround for the current structure; in a real app,
                    // customer details would be passed directly or fetched from a user management system.
                    const registeredUsers = loadFromLocalStorage('registeredUsers') || [];
                    const tempUser = registeredUsers.find(u => u.email === userEmail);
                    if (tempUser) {
                        // Create a temporary object that mimics currentUser for populateInvoiceModal
                        const invoiceContextOrder = {
                            ...orderToInvoice,
                            customer: tempUser // Ensure the customer object is complete
                        };
                        populateInvoiceModal(invoiceContextOrder);

                    } else {
                        alert('Customer details not found for invoice generation.');
                    }
                } else {
                    alert('Order not found for invoice generation.');
                }
            }
        }
    });

    // --- Print/Save as PDF Invoice (UPDATED LOGIC for quality) ---
    printInvoiceBtn.addEventListener('click', () => {
        const invoiceContent = document.querySelector('#invoiceModal .modal-content');

        // Temporarily hide actions and close button for PDF generation
        const noPrintElements = invoiceContent.querySelectorAll('.no-print, .invoice-actions'); // Include invoice-actions
        noPrintElements.forEach(el => el.style.display = 'none');

        // Temporarily adjust styles for optimal capture
        invoiceContent.style.padding = '20mm'; // Standard print padding
        invoiceContent.style.backgroundColor = 'white';
        invoiceContent.style.boxShadow = 'none'; // Remove box shadow for print

        // Add a temporary class to potentially adjust specific print-only styles
        invoiceContent.classList.add('for-print-capture');


        // Increase scale for better resolution in PDF
        html2canvas(invoiceContent, {
            scale: 3, // Increased scale for better resolution
            useCORS: true,
            logging: false, // Turn off logging for cleaner console
            backgroundColor: '#ffffff' // Explicitly set background color for capture
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png', 1.0); // Use PNG for better quality, 1.0 for max quality
            const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for A4 size

            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            // Add the first page
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Add subsequent pages if content is longer than one page
            while (heightLeft >= -10) { // Add a small buffer to heightLeft
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`invoice_${invoiceNumber.textContent}.pdf`);

            // Restore hidden elements and original styles after PDF generation
            noPrintElements.forEach(el => el.style.display = ''); // Restore display
            invoiceContent.style.padding = ''; // Reset padding
            invoiceContent.style.backgroundColor = ''; // Reset background
            invoiceContent.style.boxShadow = ''; // Reset box shadow
            invoiceContent.classList.remove('for-print-capture'); // Remove temporary class
        }).catch(error => {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');

            // Ensure elements are restored even on error
            noPrintElements.forEach(el => el.style.display = '');
            invoiceContent.style.padding = '';
            invoiceContent.style.backgroundColor = '';
            invoiceContent.style.boxShadow = '';
            invoiceContent.classList.remove('for-print-capture');
        });
    });


    // --- Initial Load ---
    // Load allUsersOrders first, as other load functions depend on it
    allUsersOrders = loadFromLocalStorage('allUsersOrders') || {};

    loadCurrentUser();
    loadCartFromLocalStorage();

    // Determine initial UI state
    // Check if an admin was logged in last session
    if (loadFromLocalStorage('isAdminLoggedIn')) { // Check a simple flag for admin session
        isAdminLoggedIn = true;
        // Don't set currentUser if only admin is loaded
        updateAuthUI();
    } else if (currentUser) {
        loadUserAddresses();
        loadUserOrders(); // Load specific user's orders
        updateAuthUI(); // This also calls showSection(vendorDashboard)
        applyFilters(); // Render products for the browse section
        renderQuickOrderTable(products); // Render all products in quick order view initially
        renderAddresses();
        renderOrderHistory();
    } else {
        updateAuthUI(); // Show login/register
    }

    // Save isAdminLoggedIn state on logout or before page unload for persistence
    window.addEventListener('beforeunload', () => {
        saveToLocalStorage('isAdminLoggedIn', isAdminLoggedIn);
    });

});