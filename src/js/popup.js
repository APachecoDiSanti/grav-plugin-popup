class Popup {  
  static #TIMEOUT_DEFAULT = 5*1000;
  #wasPopupShown;

  constructor(isTimeoutEnabled = true, isWindowLeaveEnabled = true, timeout = Popup.#TIMEOUT_DEFAULT) { 
    this.#wasPopupShown = false;
    
    //showpopup on timeout
    if (isTimeoutEnabled) {
      const me = this;
      setTimeout(function () {
        me.#showPopup();
      }, timeout);
    }

    //showpopup on mouseleave
    if (isWindowLeaveEnabled) {
      document.body.addEventListener('mouseleave', (event) => {
        this.#showPopup();
      });
    }
    
    //hidepopup on click on outside box or on close button
    document.addEventListener('click', (event) => {
      if (this.#isPopupVisible() && event.target === this.#getCloseButton() || event.target === this.#getPopup()) {
        this.#hidePopup();
      }
    });
  
    //hidepopup on keypress Escape
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.#hidePopup();
      }
    });
  }

  #isPopupVisible() {
    return this.#getPopup().style.display === 'block';
  }
  
  #showPopup() {
    if (!this.#wasPopupShown) {
      this.#getPopup().style.display = 'block';
      this.#wasPopupShown = true;
    }
  }
  
  #hidePopup() {
    this.#getPopup().style.display = 'none'; 
  }
  
  #getPopup() {
    return document.getElementById("popup");
  }

  #getCloseButton() {
    return document.getElementById("popup-close-button");
  }
}

window.onload = function() {
  new Popup();
}

console.log("ADDED!");