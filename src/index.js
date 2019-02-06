import { addIntoRoot } from "./utils";

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    const handlerOnButtonClick = target => {
        switch (target.getAttribute("data-action")) {
            case "add-into-root":
                addIntoRoot();
                break;

            case "delete":
                break;

            case "add":
                break;

            case "edit":
                break;
        }
    };

    const root = document.querySelector(".root");
    if (root.childElementCount) {
        root.classList.remove("hidden");
    }

    document.addEventListener("focusin", handlerOnFocusin);
    document.addEventListener("blur", handlerOnBlur);
    document.addEventListener("click", handlerOnClick);

    function handlerOnFocusin(e) {
        let target = e.target;
    }

    function handlerOnBlur(e) {
        console.log("blur handler");
    }

    function handlerOnClick(e) {
        const target = e.target;

        // нажали на кнопку
        if (target.tagName === "BUTTON") {
            handlerOnButtonClick(target);
        }
    }
}
