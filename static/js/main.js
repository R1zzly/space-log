// static/js/main.js

document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    // --- ОБЩАЯ ЛОГИКА ДЛЯ ВСЕХ СТРАНИЦ ---
    // ===================================================================

    // 1. Функция для получения CSRF-токена
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // 2. Единый объект с переводами
    const translations = {
    kz: {
        // Общие
        add: "Қосу",
        client: "Клиент",
        currency: "Валюта",
        noData: "Деректер жоқ",
        // Навигация и заголовки
        orderList: "Тапсырыстар тізімі",
        orderDetails: "Тапсырыс бөлшектері",
        createDeal: "Тапсырыс жасау",
        orderGoods: "Тапсырыс тауарлары",
        fileList: "Файлдар тізімі",
        // Поля
        orderDate: "Тапсырыс күні",
        orderNumber: "Тапсырыс нөмірі",
        crossing: "Өту нүктесі",
        destination: "Мақсатты орын",
        sender: "Жіберуші",
        receiver: "Қабылдаушы",
        senderAddress: "Жіберушінің мекенжайы",
        receiverAddress: "Қабылдаушының мекенжайы",
        carNumber: "Көлік нөмірі",
        carWeight: "Көлік салмағы",
        trailerNumber: "Тіркеме нөмірі",
        trailerWeight: "Тіркеме салмағы",
        driverNumber: "Жүргізуші нөмірі",
        loadedWeight: "Жалпы салмағы",
        status: "Күйі",
        product: "Өнім",
        quantity: "Саны",
        grossWeight: "Брутто салмақ",
        netWeight: "Таза салмақ",
        price: "Құны",
        // Метки и таблицы
        totalRecords: "Барлығы: {total} жазба",
        label_quantity: "Саны",
        label_grossWeight: "Брутто салмағы",
        label_amount: "Сомасы",
        // Сообщения и ошибки
        error_load_orders: "Деректерді жүктеу мүмкін болмады.",
        error_no_orders_found: "Тапсырыстар табылмады.",
        error_load_details: "Тапсырыс бөлшектерін жүктеу мүмкін болмады.",
        alert_add_product: "Кем дегенде бір тауар қосыңыз.",
        alert_select_client: "Клиентті таңдаңыз.",
        error_order_creation: "Тапсырыс жасау кезінде қате:",
        error_unexpected: "Күтпеген қате пайда болды.",
        alert_order_created: "Тапсырыс сәтті жасалды!",
        label_weight_for_distr: "Бөлуге арналған салмақ", error_weight_too_small: "Қате: салмақ тым аз!", option_select_product: "Тауарды таңдаңыз...", label_total_by_products: "Тауарлар бойынша жиыны:", label_sum_of_weights: "Салмақ сомасы", label_difference: "Айырмашылық", button_save_order: "Тапсырысты сақтау",
        profilePage: "Пайдаланушы профилі",
        header_update_profile: "Деректерді жаңарту",
        label_username: "Пайдаланушы аты (логин):",
        label_first_name: "Аты:",
        label_last_name: "Тегі:",
        label_email: "Email:",
        label_phone: "Телефон:",
        button_update_profile: "Профильді жаңарту",
        header_change_password: "Құпия сөзді өзгерту",
        button_change_password: "Құпия сөзді өзгерту",
        // Для полей смены пароля
        label_old_password: "Ескі құпия сөз",
        label_new_password1: "Жаңа құпия сөз",
        label_new_password2: "Жаңа құпия сөзді растау",
    },
    ru: {
        // Общие
        add: "Добавить",
        client: "Клиент",
        currency: "Валюта",
        noData: "Нет данных",
        // Навигация и заголовки
        orderList: "Список заказов",
        orderDetails: "Детали заказа",
        createDeal: "Создать заказ",
        orderGoods: "Товары заказа",
        fileList: "Список файлов",
        // Поля
        orderDate: "Дата заказа",
        orderNumber: "Номер заказа",
        crossing: "Точка перехода",
        destination: "Место назначения",
        sender: "Отправитель",
        receiver: "Получатель",
        senderAddress: "Адрес отп.",
        receiverAddress: "Адрес получателя",
        carNumber: "Номер машины",
        carWeight: "Вес машины",
        trailerNumber: "Номер Прицепа",
        trailerWeight: "Вес Прицепа",
        driverNumber: "Номер водителя",
        loadedWeight: "Общий Вес",
        status: "Статус",
        product: "Продукт",
        quantity: "К-во",
        grossWeight: "Вес Брутто",
        netWeight: "Вес Нетто",
        price: "Стоимость",
        // Метки и таблицы
        totalRecords: "Всего: {total} записей",
        label_quantity: "Кол-во",
        label_grossWeight: "Вес Брутто",
        label_amount: "Сумма",
        // Сообщения и ошибки
        error_load_orders: "Не удалось загрузить данные.",
        error_no_orders_found: "Заказы не найдены.",
        error_load_details: "Не удалось загрузить детали заказа.",
        alert_add_product: "Пожалуйста, добавьте хотя бы один товар.",
        alert_select_client: "Пожалуйста, выберите клиента.",
        error_order_creation: "Ошибка при создании заказа:",
        error_unexpected: "Произошла непредвиденная ошибка.",
        alert_order_created: "Заказ успешно создан!",
        label_weight_for_distr: "Вес для распределения",
        error_weight_too_small: "Ошибка: вес слишком мал!",
        option_select_product: "Выберите товар...",
        label_total_by_products: "Итог по товарам:",
        label_sum_of_weights: "Сумма весов:",
        label_difference: "Разница:",
        button_save_order: "Сохранить заказ",
        profilePage: "Страница профиля",
        header_update_profile: "Обновить данные",
        label_username: "Имя пользователя (логин):",
        label_first_name: "Имя:",
        label_last_name: "Фамилия:",
        label_email: "Email:",
        label_phone: "Телефон:",
        button_update_profile: "Обновить профиль",
        header_change_password: "Сменить пароль",
        button_change_password: "Сменить пароль",
        // Для полей смены пароля
        label_old_password: "Старый пароль",
        label_new_password1: "Новый пароль",
        label_new_password2: "Подтверждение нового пароля",
    },
    en: {
        // Common
        add: "Add",
        client: "Client",
        currency: "Currency",
        noData: "No data",
        // Navigation and Headers
        orderList: "Order List",
        orderDetails: "Order Details",
        createDeal: "Create Order",
        orderGoods: "Order Goods",
        fileList: "File List",
        // Fields
        orderDate: "Order Date",
        orderNumber: "Order Number",
        crossing: "Crossing Point",
        destination: "Destination",
        sender: "Sender",
        receiver: "Receiver",
        senderAddress: "Sender Address",
        receiverAddress: "Receiver Address",
        carNumber: "Car Number",
        carWeight: "Car Weight",
        trailerNumber: "Trailer Number",
        trailerWeight: "Trailer Weight",
        driverNumber: "Driver Number",
        loadedWeight: "Total Weight",
        status: "Status",
        product: "Product",
        quantity: "Qty",
        grossWeight: "Gross Weight",
        netWeight: "Net Weight",
        price: "Price",
        // Labels and Tables
        totalRecords: "Total: {total} records",
        label_quantity: "Qty",
        label_grossWeight: "Gross Wt",
        label_amount: "Amount",
        // Messages and Errors
        error_load_orders: "Failed to load data.",
        error_no_orders_found: "No orders found.",
        error_load_details: "Failed to load order details.",
        alert_add_product: "Please add at least one product.",
        alert_select_client: "Please select a client.",
        error_order_creation: "Error creating order:",
        error_unexpected: "An unexpected error occurred.",
        alert_order_created: "Order created successfully!",
        label_weight_for_distr: "Weight for distribution", error_weight_too_small: "Error: weight is too small!", option_select_product: "Select a product...", label_total_by_products: "Total for products:", label_sum_of_weights: "Sum of weights:", label_difference: "Difference:", button_save_order: "Save Order",
        profilePage: "Profile Page",
        header_update_profile: "Update Information",
        label_username: "Username (login):",
        label_first_name: "First Name:",
        label_last_name: "Last Name:",
        label_email: "Email:",
        label_phone: "Phone:",
        button_update_profile: "Update Profile",
        header_change_password: "Change Password",
        button_change_password: "Change Password",
        // For password change fields
        label_old_password: "Old password",
        label_new_password1: "New password",
        label_new_password2: "New password confirmation",
    },
    cn: {
        // 常用
        add: "添加",
        client: "客户",
        currency: "货币",
        noData: "没有数据",
        // 导航和标题
        orderList: "订单列表",
        orderDetails: "订单详情",
        createDeal: "创建订单",
        orderGoods: "订单商品",
        fileList: "文件列表",
        // 字段
        orderDate: "订单日期",
        orderNumber: "订单号",
        crossing: "过境点",
        destination: "目的地",
        sender: "发件人",
        receiver: "收件人",
        senderAddress: "发件人地址",
        receiverAddress: "收件人地址",
        carNumber: "车号",
        carWeight: "汽车重量",
        trailerNumber: "拖车号码",
        trailerWeight: "拖车重量",
        driverNumber: "司机号码",
        loadedWeight: "总重量",
        status: "地位",
        product: "产品",
        quantity: "数量",
        grossWeight: "毛重",
        netWeight: "净重",
        price: "价钱",
        // 标签和表格
        totalRecords: "总计: {total} 条记录",
        label_quantity: "数量",
        label_grossWeight: "毛重",
        label_amount: "总额",
        // 消息和错误
        error_load_orders: "无法加载数据。",
        error_no_orders_found: "未找到订单。",
        error_load_details: "无法加载订单详情。",
        alert_add_product: "请至少添加一个产品。",
        alert_select_client: "请选择一个客户。",
        error_order_creation: "创建订单时出错:",
        error_unexpected: "发生了意外的错误。",
        alert_order_created: "订单创建成功！",
        label_weight_for_distr: "分配重量", error_weight_too_small: "错误：重量太小！", option_select_product: "选择一个产品...", label_total_by_products: "产品总计:", label_sum_of_weights: "重量总和:", label_difference: "差异:", button_save_order: "保存订单",
        profilePage: "个人资料页面",
        header_update_profile: "更新信息",
        label_username: "用户名（登录名）：",
        label_first_name: "名字：",
        label_last_name: "姓：",
        label_email: "电子邮件：",
        label_phone: "电话：",
        button_update_profile: "更新个人资料",
        header_change_password: "更改密码",
        button_change_password: "更改密码",
        // 密码更改字段
        label_old_password: "旧密码",
        label_new_password1: "新密码",
        label_new_password2: "新密码确认",
    }
};

    // 3. Единая функция для переключения языков
    let currentLang = 'ru';
    const langButtons = document.querySelectorAll('.lang-btn');

    function applyTranslations(rootElement) {
        rootElement.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            const translation = translations[currentLang]?.[key];
            if (translation) {
                if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
    }

    function updatePageTranslations() {
        applyTranslations(document);
        if (typeof updatePagination === "function") {
            updatePagination();
        }
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentLang = button.dataset.lang;
            updatePageTranslations();
        });
    });

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentLang = button.dataset.lang;
            updateTranslations();
        });
    });

    // 4. Логика для кнопки выхода
    const logoutButton = document.querySelector('.logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            window.location.href = '/logout/';
        });
    }

    // ===================================================================
    // --- ЛОГИКА ДЛЯ КОНКРЕТНЫХ СТРАНИЦ ---
    // ===================================================================

    // --- ЛОГИКА СТРАНИЦЫ СПИСКА ЗАКАЗОВ ---
    if (document.getElementById('orderListBody')) {
        let currentPage = 1;
        const ordersPerPage = 10;
        let orders = [];

        const paginationContainer = document.getElementById('pagination');

        function renderOrders() {
            const orderListBody = document.getElementById('orderListBody');
            orderListBody.innerHTML = '';
            const startIndex = (currentPage - 1) * ordersPerPage;
            const endIndex = startIndex + ordersPerPage;
            const paginatedOrders = orders.slice(startIndex, endIndex);

            if (paginatedOrders.length === 0) {
                orderListBody.innerHTML = `<tr><td colspan="6">${translations[currentLang].error_no_orders_found}</td></tr>`;
                return;
            }
            paginatedOrders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.date}</td>
                    <td><a href="/orders/${order.id}/" class="order-link">${order.number}</a></td>
                    <td>${order.carNumber || 'N/A'}</td>
                    <td>${order.grossWeight}</td>
                    <td>${order.netWeight}</td>
                    <td>${order.price}</td>
                `;
                orderListBody.appendChild(row);
            });
        }
        
        function updatePagination() {
            if (!paginationContainer) return;
            paginationContainer.innerHTML = '';
            const totalPages = Math.ceil(orders.length / ordersPerPage);
            if (totalPages <= 1) return;
            
            const totalRecordsEl = document.createElement('span');
            totalRecordsEl.className = 'total-records';
            totalRecordsEl.textContent = (translations[currentLang].totalRecords || '').replace('{total}', orders.length);
            paginationContainer.appendChild(totalRecordsEl);
            
            const createPageElement = (text, page, type = 'link', isDisabled = false) => {
                const el = document.createElement('a');
                el.textContent = text;
                if (type === 'link') {
                    el.className = 'pagination-link';
                    el.dataset.page = page;
                    if (page === currentPage) el.classList.add('active');
                } else {
                    el.className = 'pagination-button';
                    if (isDisabled) el.style.pointerEvents = 'none';
                    el.dataset.page = page;
                }
                return el;
            };
            
            paginationContainer.appendChild(createPageElement('<', currentPage - 1, 'button', currentPage === 1));
            // ... (здесь можно добавить более сложную логику отображения номеров страниц)
            for (let i = 1; i <= totalPages; i++) {
                 paginationContainer.appendChild(createPageElement(i, i));
            }
            paginationContainer.appendChild(createPageElement('>', currentPage + 1, 'button', currentPage === totalPages));
        }

        paginationContainer?.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('.pagination-link, .pagination-button') && !target.classList.contains('active')) {
                const page = parseInt(target.dataset.page, 10);
                if (page && page !== currentPage && page > 0 && page <= Math.ceil(orders.length / ordersPerPage)) {
                    currentPage = page;
                    renderOrders();
                    updatePagination();
                }
            }
        });

        function fetchOrders() {
            fetch('/api/orders/')
                .then(response => response.json())
                .then(data => {
                    orders = data.orders;
                    currentPage = 1;
                    renderOrders();
                    updatePagination();
                }).catch(error => {
                    console.error('Failed to load orders:', error);
                    document.getElementById('orderListBody').innerHTML = `<tr><td colspan="6">${translations[currentLang].error_load_orders}</td></tr>`;
                });
        }
        
        fetchOrders();
    }

    // --- ЛОГИКА СТРАНИЦЫ ДЕТАЛЕЙ ЗАКАЗА ---
    else if (document.querySelector('.details-form')) {
        const pathParts = window.location.pathname.split('/');
        const orderId = pathParts[pathParts.length - 2];

        function displayOrderDetails(data) {
            const noDataText = "Нет данных";
            document.getElementById('client').textContent = data.client || noDataText;
            document.getElementById('crossing').textContent = data.crossing || noDataText;
            document.getElementById('destination').textContent = data.destination || noDataText;
            document.getElementById('sender').textContent = data.sender || noDataText;
            document.getElementById('receiver').textContent = data.receiver || noDataText;
            document.getElementById('senderAddress').textContent = data.senderAddress || noDataText;
            document.getElementById('receiverAddress').textContent = data.receiverAddress || noDataText;
            document.getElementById('carNumber').textContent = data.carNumber || noDataText;
            document.getElementById('carWeight').textContent = data.carWeight || noDataText;
            document.getElementById('trailerNumber').textContent = data.trailerNumber || noDataText;
            document.getElementById('trailerWeight').textContent = data.trailerWeight || noDataText;
            document.getElementById('loadedWeight').textContent = data.loadedWeight || noDataText;
            document.getElementById('currency').textContent = data.currency || noDataText;
            document.getElementById('driver_number').textContent = data.driver_number || noDataText;

            const goodsList = document.getElementById('goodsList');
            goodsList.innerHTML = '';
            if (data.goods && data.goods.length > 0) {
                // Вместо простого текста, теперь мы создаем HTML-структуру
                data.goods.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'list-item';

                    // Получаем переводы для меток
                    const qtyLabel = translations[currentLang]?.label_quantity || 'Кол-во';
                    const grossWtLabel = translations[currentLang]?.label_grossWeight || 'Вес Брутто';
                    const amountLabel = translations[currentLang]?.label_amount || 'Сумма';

                    // Собираем строку с использованием переведенных меток
                    el.textContent = `${item.name} - ${qtyLabel}: ${item.quantity}, ${grossWtLabel}: ${item.grossWeight}, ${amountLabel}: ${item.amount}`;
                    goodsList.appendChild(el);
                });
            } else {
                goodsList.textContent = noDataText;
            }

            const fileList = document.getElementById('fileList');
            fileList.innerHTML = '';
            if (data.files && data.files.length > 0) {
                data.files.forEach(item => {
                    const el = document.createElement('a');
                    el.className = 'list-item file-link';
                    el.textContent = item.name;
                    el.href = item.url;
                    fileList.appendChild(el);
                });
            } else {
                fileList.textContent = noDataText;
            }
        }

        let cachedOrderData = null;

        function reRenderGoodsList() {
            if (cachedOrderData) {
                displayOrderDetails(cachedOrderData);
            }
        }

        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Немного ждем, чтобы currentLang успел обновиться, затем перерисовываем
                setTimeout(reRenderGoodsList, 0);
            });
        });

        fetch(`/api/orders/${orderId}/`)
            .then(response => response.json())
            .then(data => {
                cachedOrderData = data;
                displayOrderDetails(data);
                updatePageTranslations();
            }).catch(error => {
                console.error('Failed to load order details:', error);
                document.querySelector('.main').innerHTML = `<h1>${translations[currentLang].error_load_details}</h1>`;
            });
    }

    else if (document.getElementById('createOrderForm')) {
    
        // --- Находим все элементы на странице ---
        const form = document.getElementById('createOrderForm');
        const clientSelect = document.getElementById('client-select');
        const carWeightInput = document.getElementById('car_weight_input');
        const trailerWeightInput = document.getElementById('trailer_weight_input');
        const loadedWeightInput = document.getElementById('loaded_weight_input');
        const targetWeightDisplay = document.getElementById('target-weight');
        const addProductBtn = document.getElementById('addProductBtn');
        const productRowsContainer = document.getElementById('product-rows-container');
        const productRowTemplate = document.getElementById('product-row-template');
        const currentSumDisplay = document.getElementById('current-sum-display');
        const weightDifferenceDisplay = document.getElementById('weight-difference-display');
        const saveOrderBtn = document.getElementById('saveOrderBtn');

        if (clientSelect && clientSelect.options.length === 2) {
        clientSelect.selectedIndex = 1;
    }
    // --- КОНЕЦ БЛОКА ДЛЯ ДИАГНОСТИКИ ---

    // Логика автоматического выбора клиента
    if (clientSelect && clientSelect.options.length === 2) {
        console.log('Условие выполнено! Пытаюсь выбрать клиента...'); // Проверяем, заходит ли скрипт сюда
        clientSelect.selectedIndex = 1; 
    }

        // --- Главная функция для всех расчетов ---
        function updateCalculations() {
            if (!carWeightInput) return; // Проверка, что мы на нужной странице

            const carWt = parseFloat(carWeightInput.value) || 0;
            const trailerWt = parseFloat(trailerWeightInput.value) || 0;
            const loadedWt = parseFloat(loadedWeightInput.value) || 0;

            const totalProductWeight = loadedWt - carWt - trailerWt;
            let targetWeight = totalProductWeight > 0 ? totalProductWeight - 650 : 0;
            
            // НОВАЯ ПРОВЕРКА: Вес для распределения не может быть отрицательным
            if (targetWeight <= 0) {
                targetWeight = 0;
                targetWeightDisplay.style.color = 'red';
                targetWeightDisplay.textContent = 'Ошибка: вес слишком мал!';
            } else {
                targetWeightDisplay.style.color = '#27ae60';
                targetWeightDisplay.textContent = `${targetWeight.toFixed(2)} kg`;
            }

            let manualSum = 0;
            const productRows = productRowsContainer.querySelectorAll('.product-row');
            productRows.forEach(row => {
                manualSum += parseFloat(row.querySelector('.gross-weight-input').value) || 0;
            });
            currentSumDisplay.textContent = `${manualSum.toFixed(2)} kg`;

            const difference = targetWeight - manualSum;
            weightDifferenceDisplay.textContent = `${difference.toFixed(2)} kg`;
            weightDifferenceDisplay.style.color = Math.abs(difference) < 0.01 ? 'green' : 'red';
            saveOrderBtn.disabled = Math.abs(difference) >= 0.01 || targetWeight <= 0;

            if (productRows.length === 1) {
                const singleWeightInput = productRows[0].querySelector('.gross-weight-input');
                const singleProductWeight = targetWeight > 0 ? targetWeight : 0;
                singleWeightInput.value = singleProductWeight.toFixed(2);
                setTimeout(updateCalculations, 0); 
            }
        }

        // --- Управление строками товаров ---
        function handleProductRowCountChange() {
            const productRows = productRowsContainer.querySelectorAll('.product-row');
            const isSingleProduct = productRows.length === 1;
            
            productRows.forEach(row => {
                const weightInput = row.querySelector('.gross-weight-input');
                weightInput.readOnly = isSingleProduct;
                if (wasSingleProduct && productRows.length > 1) {
                    weightInput.value = ''; // Очищаем вес у всех, если добавили второй товар
                }
            });
            
            updateCalculations();
        }

        let wasSingleProduct = false;
        function addProductRow() {
            const existingRows = productRowsContainer.querySelectorAll('.product-row');
            wasSingleProduct = existingRows.length === 1;
            
            const templateClone = productRowTemplate.content.cloneNode(true);
            const productSelect = templateClone.querySelector('.product-select');
            
            if (typeof all_products !== 'undefined' && productSelect) {
                const defaultOption = document.createElement('option');
                defaultOption.value = "";
                defaultOption.textContent = "Выберите товар...";
                productSelect.appendChild(defaultOption);

                all_products.forEach(product => {
                    const option = document.createElement('option');
                    option.value = product.id;
                    option.textContent = product.product_name;
                    productSelect.appendChild(option);
                });
            }
            
            productRowsContainer.appendChild(templateClone);
            handleProductRowCountChange();
        }

        // --- Инициализация и слушатели событий ---
        addProductBtn.addEventListener('click', addProductRow);

        productRowsContainer.addEventListener('click', e => {
            if (e.target.classList.contains('remove-product-btn')) {
                e.target.closest('.product-row').remove();
                handleProductRowCountChange();
            }
        });
        
        [carWeightInput, trailerWeightInput, loadedWeightInput].forEach(input => {
            input.addEventListener('input', updateCalculations);
        });

        productRowsContainer.addEventListener('input', e => {
            if (e.target.classList.contains('gross-weight-input')) {
                updateCalculations();
            }
        });

        addProductRow();
        
        // --- Отправка формы ---
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            if (saveOrderBtn.disabled) {
                const difference = parseFloat(weightDifferenceDisplay.textContent);
                alert(`Ошибка! Сумма весов товаров не совпадает с расчетной. Разница: ${difference.toFixed(2)} кг.`);
                return;
            }
        
            const orderData = {
                client_id: form.querySelector('#client-select').value,
                transition_point: form.querySelector('input[name="transition_point"]').value,
                destination: form.querySelector('input[name="destination"]').value,
                shipper: form.querySelector('input[name="shipper"]').value,
                consignee: form.querySelector('input[name="consignee"]').value,
                shipper_address: form.querySelector('input[name="shipper_address"]').value,
                consignee_address: form.querySelector('input[name="consignee_address"]').value,
                driver_number: form.querySelector('input[name="driver_number"]').value,
                currency: form.querySelector('select[name="currency"]').value,
                car_number: form.querySelector('input[name="car_number"]').value,
                car_weight: carWeightInput.value,
                trailer_number: form.querySelector('input[name="trailer_number"]').value,
                trailer_weight: trailerWeightInput.value,
                loaded_weight: loadedWeightInput.value,
                products: []
            };
        
            const productRows = productRowsContainer.querySelectorAll('.product-row');
            productRows.forEach(row => {
                const product = {
                    product_id: row.querySelector('.product-select').value,
                    quantity: row.querySelector('input[name="quantity"]').value,
                    gross_weight: row.querySelector('.gross-weight-input').value,
                };
                if (product.product_id) orderData.products.push(product);
            });
        
            fetch('/api/orders/create/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCookie('csrftoken') },
                body: JSON.stringify(orderData)
            })
            .then(response => response.json().then(data => ({ ok: response.ok, data })))
            .then(({ ok, data }) => {
                if (ok) {
                    alert(translations[currentLang].alert_order_created || "Заказ успешно создан!");
                    window.location.href = data.redirect_url;
                } else {
                    throw new Error(data.error || 'Unknown error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(`${translations[currentLang].error_order_creation || "Ошибка при создании заказа:"} ${error.message}`);
            });
        });
    }

    // Вызываем перевод один раз при начальной загрузке страницы
    updateTranslations();
});