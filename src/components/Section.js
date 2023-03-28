export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems() {
    this._items.forEach((item) => {
      const test = this._renderer(item);
      this.addItem(test);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
