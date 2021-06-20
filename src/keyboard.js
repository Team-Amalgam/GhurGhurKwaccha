class Keyboard {
  constructor() {
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

    // // Automatically use keyboard for elements with .use-keyboard-input
    // document.querySelectorAll(".use-keyboard-input").forEach(element => {
    //     element.addEventListener("focus", () => {
    //         this.open(element.value, currentValue => {
    //             element.value = currentValue;
    //         });
    //     });
    // });
  }
  _createKeys() {
    this.fragment = document.createDocumentFragment();

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "]", "'", "/"].indexOf(key) !== -1;

      // Add attributes/classes/id
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      keyElement.setAttribute("id", key);
      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });

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
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
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
    console.log(this.elements.main.classList);
  }
  glow(key) {
    if (key === " ") {
      this.glow_space();
      return;
    }
    if (key != key.toLowerCase()) {
      if (!this.properties.capsLock) {
        this._toggleCapsLock();
      }
      this.glow_caps();
    }
    const keyElement = document.getElementById(key.toLowerCase());
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
    const keyElement = document.getElementById(key.toLowerCase());
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
    for (var item in keyLayout) {
      this.dim(keyLayout[item]);
    }
  }
  glow_dim(textToType, textTyped) {
    if (textToType === "*/*") {
      return;
    }
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
}
const keyLayout = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
  "=",
  "backspace",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "[",
  "]",
  "caps",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  "'",
  "done",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/",
  "space",
];
