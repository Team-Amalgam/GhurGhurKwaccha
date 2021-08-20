class Keyboard {
  constructor(layout = "US", language = "english") {
    this.elements = {
      main: null,
      keysContainer: null,
      keys: [],
    };
    this.eventHandlers = {
      oninput: null,
      onclose: null,
    };
    this.properties = {
      value: "",
      capsLock: false,
    };
    this.fragment = {};
    this.layout = layout;
    this.language = language;
    //console.log(combinedKeyLayout);
    this.keyLayout = combinedKeyLayout[layout];
    this.upperCaseMapping = mapping[layout];
    this.init();
  }
  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard");
    this.elements.main.classList.add("keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
  }
  _createKeys() {
    this.fragment = document.createDocumentFragment();

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    this.keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      let insertLineBreak = [];
      if (this.layout == "US") {
        insertLineBreak = ["backspace", "\\", "'", "/"].indexOf(key) !== -1;
      } else if (this.layout == "UK") {
        insertLineBreak = ["backspace", "\\", "'", "/"].indexOf(key) !== -1;
      }

      // Add attributes/classes/id
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      keyElement.style.fontFamily =
        '"Lucida Console", "Courier New", monospace';
      keyElement.style.fontSize = "20px";
      keyElement.setAttribute("id", key);
      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");
          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");
          break;

        case "done":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.innerHTML = createIconHTML("check_circle");
          break;

        default:
          keyElement.textContent = this.getLowerCase(key);
          break;
      }
      this.fragment.appendChild(keyElement);
      if (insertLineBreak) {
        this.fragment.appendChild(document.createElement("br"));
      }
    });
    return this.fragment;
  }

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  }
  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? this.getUpperCase(key.textContent)
          : this.getLowerCase(key.textContent);
      }
    }
  }
  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  }
  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
  glow(key) {
    if (!key) {
      return;
    }
    // if (key === " ") {
    //   this.glow_space();
    //   return;
    // }
    if (key != this.getLowerCase(key)) {
      if (!this.properties.capsLock) {
        this._toggleCapsLock();
      }
      this.glow_caps();
    }
    const keyElement = document.getElementById(this.getLowerCase(key));
    if (!keyElement.classList.value.includes("keyboard__key--activate")) {
      keyElement.classList.add("keyboard__key--activate");
    }
  }
  dim(key) {
    if (key === "space") {
      this.dim_space();
      return;
    }
    if (this.properties.capsLock) {
      console.log("Test");
      this._toggleCapsLock();
    }
    this.dim_caps();
    const keyElement = document.getElementById(this.getLowerCase(key));
    if (keyElement.classList.value.includes("keyboard__key--activate")) {
      keyElement.classList.remove("keyboard__key--activate");
    }
  }
  glow_space() {
    const keyElement = document.getElementById("space");
    if (
      !keyElement.classList.value.includes(
        "keyboard__key--extra-wide--activable"
      )
    ) {
      keyElement.classList.add("keyboard__key--extra-wide--activable");
    }
  }
  dim_space() {
    const keyElement = document.getElementById("space");
    if (
      keyElement.classList.value.includes(
        "keyboard__key--extra-wide--activable"
      )
    ) {
      keyElement.classList.remove("keyboard__key--extra-wide--activable");
      keyElement.classList.remove("keyboard__key--extra-wide--activable");
    }
  }
  glow_caps() {
    const keyElement = document.getElementById("caps");
    if (!keyElement.classList.value.includes("keyboard__key--activate")) {
      keyElement.classList.add("keyboard__key--activate");
    }
  }
  dim_caps() {
    const keyElement = document.getElementById("caps");
    if (keyElement.classList.value.includes("keyboard__key--activate")) {
      keyElement.classList.remove("keyboard__key--activate");
    }
  }
  dim_all() {
    for (var item in this.keyLayout) {
      this.dim(this.keyLayout[item]);
    }
  }
  glow_dim(textToType, textTyped) {
    this.dim_all();
    if (textTyped == "") {
      this.glow(textToType[0]);
      return;
    }
    if (textTyped === textToType) {
      this.glow_space();
      return;
    }
    if (textToType.includes(textTyped)) {
      this.glow(textToType[textTyped.length]);
      return;
    } else {
      this.glow("backspace");
    }
    for (var i = 0; i < textTyped.length; i++) {
      if (textToType[i] != textTyped[i]) {
        this.glow(textToType[i]);
        return;
      }
    }
  }
  getUpperCase(key) {
    return Object.keys(this.upperCaseMapping).includes(key)
      ? this.upperCaseMapping[key]
      : key.toUpperCase();
  }
  getLowerCase(key) {
    const x = Object.keys(this.upperCaseMapping).find(
      (keyz) => this.upperCaseMapping[keyz] === key
    );
    return x ? x : key.toLowerCase();
  }
}
