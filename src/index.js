const ROOT_ID = 1;

let map = {};
let idCounter = ROOT_ID;

try {
    // пробуем восстановить из хранилища
    map = JSON.parse(localStorage.getItem("treeMap"));
    // восстанавливаем счетчик для id
    idCounter = Math.max(...Object.keys(map).map(Number));
    // отрисовываем элементы из восстановленной мапы
    Object.entries(map)
        .sort((a, b) => a[0] - b[0]) // неявное приведение к числу
        .forEach(([_, itemObject]) => {
            // пропускаем рутовый элемент
            if (itemObject.id === 1) return;
            const parentNode = document.querySelector(`[data-id="${itemObject.parent}"]`);
            renderItem(itemObject, parentNode);
        });
} catch (err) {
    const rootItem = {
        id: ROOT_ID,
        children: []
    };
    map = {
        [rootItem.id]: rootItem
    };
}

document.addEventListener("click", function({ target }) {
    if (target.tagName !== "BUTTON") {
        return;
    }
    const itemNode = target.parentNode;
    switch (target.getAttribute("data-action")) {
        case "add":
            addItem(itemNode);
            break;
        case "delete":
            deleteItem(itemNode);
            break;
    }
    saveState();
});

document.addEventListener("change", function({ target }) {
    const itemNode = target.parentNode;
    const itemId = itemNode.getAttribute("data-id");
    map[itemId].value = target.value;
    saveState();
});

function addItem(parentNode) {
    const itemId = generateId();
    const parentId = Number(parentNode.getAttribute("data-id"));
    const parentObject = map[parentId];

    const itemObject = {
        id: itemId,
        parent: parentId,
        value: "",
        children: []
    };

    map[itemId] = itemObject;

    parentObject.children.push(itemObject);

    renderItem(itemObject, parentNode);

    const itemNode = parentNode.querySelector(`[data-id="${itemId}"]`);
    const itemInputNode = itemNode.querySelector("input");
    itemInputNode.focus();
}

function renderItem(itemObject, parentNode) {
    const children = parentNode.querySelector("ul");
    const html = `
        <li class="item" data-id="${itemObject.id}">
            <input 
                type="text" 
                class="item__input" 
                placeholder="Type name here..." 
                value="${itemObject.value}"
            />
            <button title="Add child" type="button" data-action="add" class="item__btn">➕</button>
            <button title="Delete" type="button" data-action="delete" class="item__btn">❌</button>
            <span class="item__id">Id: ${itemObject.id}</span>
            <ul class="item__children"></ul>
        </li>
    `;
    children.insertAdjacentHTML("beforeend", html);
}

function deleteItem(itemNode) {
    const itemId = Number(itemNode.getAttribute("data-id"));
    deleteFromMap(itemId);
    // удаляем из DOM (включая всех потомков)
    itemNode.remove();
}

/**
 * Функция удаления из мапы, рекурсивно удаляет потомков
 * Note: нужно соблюдать ограничение по вложенности,
 * чтобы не переполнить стек вызовов
 */
function deleteFromMap(itemId) {
    const children = map[itemId].children;
    if (children.length) {
        children.forEach(childItemObject => deleteFromMap(childItemObject.id));
    }
    const itemObject = map[itemId];
    const parentItemObject = map[itemObject.parent];
    // удаляем ссылку из children массива у родителя
    parentItemObject.children = parentItemObject.children.filter(({ id }) => {
        return id !== itemId;
    });
    // удаляем сам элемент
    delete map[itemId];
}

function generateId() {
    return ++idCounter;
}

function saveState() {
    localStorage.setItem("treeMap", JSON.stringify(map));
}

// для отладки
window.printMap = () => console.log(map);
