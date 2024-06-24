export default class ListItem {
    _id;
    _item;
    _checked;
    constructor(_id = '', _item = '', _checked = false) {
        this._id = _id;
        this._item = _item;
        this._checked = _checked;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get item() {
        return this._item;
    }
    set item(item) {
        this._item = item;
    }
    get checked() {
        return this._checked;
    }
    set checked(checked) {
        this._checked = checked;
    }
}
