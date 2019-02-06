const state = {
    parent: null,
    child: null
};

// вставка в корень
export function addIntoRoot() {
    debugger;
    let childNode = document.createElement("li");
    childNode.classList.add("item");
    childNode.innerHTML = `
        <input type="text" class=" item__input" placeholder="input name...">
        <button type="button" data-action="delete" class="item__btn">Delete</button>
        <button type="button" data-action="add" class="item__btn">Add</button>
        <button type="button" data-action="edit" class="item__btn">Edit</button>
`;

    //TODO
    tree.add(childNode);

    let insertedElement = root.appendChild(childNode);
    let input = insertedElement.children[0];
    input.focus();

    root.classList.remove("hidden");
}
