import ListItem from './ListItem';

interface List {
    list: ListItem[];

    load(): void;

    save(): void;

    clearList(): void;

    addItem(itemObj: ListItem): void;

    removeItem(id: string) : void;
}

export default class FullList implements List {
    static instance: FullList = new FullList();

    private constructor(private _list: ListItem[] = []) {
    }

    get list(): ListItem[] {
        return this._list;
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("myList");
        if (!storedList) return;

        try {
            const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList);

            parsedList.forEach(itemObj => {
                const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
                FullList.instance.addItem(newListItem);
            });
        } catch (error) {
            console.error("Failed to load list from local storage:", error);
        }
    }

    save(): void {
        try {
            localStorage.setItem("myList", JSON.stringify(this._list));
        } catch (error) {
            console.error("Failed to save list to local storage:", error);
        }
    }

    clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}