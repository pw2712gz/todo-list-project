import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';
// Initialize the application
const initApp = () => {
    const fullList = FullList.instance;
    const template = ListTemplate.instance;
    // Add listener to new entry form submit
    const itemEntryForm = document.getElementById("itemEntryForm");
    const input = document.getElementById("newItem");
    itemEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newEntryText = input.value.trim();
        if (!newEntryText)
            return;
        const itemId = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;
        const newItem = new ListItem(itemId.toString(), newEntryText);
        fullList.addItem(newItem);
        template.render(fullList);
        input.value = '';
    });
    const clearItems = document.getElementById("clearItemsButton");
    clearItems.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear all items?")) {
            fullList.clearList();
            template.clear();
        }
    });
    fullList.load();
    template.render(fullList);
};
document.addEventListener("DOMContentLoaded", initApp);
