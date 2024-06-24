import ListItem from './ListItem';
export default class FullList {
    _list;
    static instance = new FullList();
    constructor(_list = []) {
        this._list = _list;
    }
    get list() {
        return this._list;
    }
    load() {
        const storedList = localStorage.getItem("myList");
        if (!storedList)
            return;
        try {
            const parsedList = JSON.parse(storedList);
            parsedList.forEach(itemObj => {
                const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
                FullList.instance.addItem(newListItem);
            });
        }
        catch (error) {
            console.error("Failed to load list from local storage:", error);
        }
    }
    save() {
        try {
            localStorage.setItem("myList", JSON.stringify(this._list));
        }
        catch (error) {
            console.error("Failed to save list to local storage:", error);
        }
    }
    clearList() {
        this._list = [];
        this.save();
    }
    addItem(itemObj) {
        this._list.push(itemObj);
        this.save();
    }
    removeItem(id) {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}
