import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplate from './templates/ListTemplate';

// Initialize the application
const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  // Add listener to new entry form submit
  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;
  const input = document.getElementById("newItem") as HTMLInputElement;

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
    const newEntryText: string = input.value.trim();
    console.log("New entry text:", newEntryText);  // Log the input value
    if (!newEntryText) return;

    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;
    const newItem = new ListItem(itemId.toString(), newEntryText);
    fullList.addItem(newItem);
    template.render(fullList);

    input.value = '';
  });

  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;
  clearItems.addEventListener('click', (): void => {
    if (confirm("Are you sure you want to clear all items?")) {
      fullList.clearList();
      template.clear();
    }
  });

  fullList.load();
  template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);