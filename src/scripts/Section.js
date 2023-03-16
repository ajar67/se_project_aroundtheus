class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items; // is an array
    this._renderer = renderer; // a function that renders and item on the page
    this._classSelector = document.querySelector(classSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItems(element) {
    this.classSelector.prepend(element);
  }
}
