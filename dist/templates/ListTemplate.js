import FullList from "../model/FullList";
export default class ListTemplate {
    static instance = new ListTemplate();
    ul;
    constructor() {
        this.ul = document.getElementById("listItems");
    }
    clear() {
        this.ul.innerHTML = '';
    }
    render(fullList) {
        this.clear();
        fullList.list.forEach(item => {
            const li = document.createElement("li");
            li.className = "item list-group-item d-flex justify-content-between align-items-center";
            const check = document.createElement("input");
            check.type = "checkbox";
            check.id = item.id;
            check.checked = item.checked;
            check.className = "mr-2";
            check.setAttribute("aria-label", `Mark ${item.item} as ${item.checked ? 'incomplete' : 'complete'}`);
            li.append(check);
            check.addEventListener('change', () => {
                item.checked = !item.checked;
                FullList.instance.save();
            });
            const label = document.createElement("label");
            label.htmlFor = item.id;
            label.textContent = item.item;
            li.append(label);
            const editButton = document.createElement("button");
            editButton.className = 'btn btn-secondary btn-sm ml-2';
            editButton.textContent = 'Edit';
            editButton.setAttribute("aria-label", `Edit ${item.item}`);
            li.append(editButton);
            editButton.addEventListener('click', () => {
                const newItemText = prompt("Edit item:", item.item);
                if (newItemText !== null && newItemText.trim() !== "") {
                    item.item = newItemText.trim();
                    FullList.instance.save();
                    this.render(fullList);
                }
            });
            const deleteButton = document.createElement("button");
            deleteButton.className = 'btn btn-danger btn-sm ml-2';
            deleteButton.textContent = 'Delete';
            deleteButton.setAttribute("aria-label", `Remove ${item.item}`);
            li.append(deleteButton);
            deleteButton.addEventListener('click', () => {
                FullList.instance.removeItem(item.id);
                this.render(fullList);
            });
            this.ul.append(li);
        });
    }
}
