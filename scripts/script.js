class Slider {
  constructor() {
    this.imgCount = 5;
    this.currentId = 0;
    this.interval = 5000;
    this.images = [...document.querySelectorAll(".main_img")];
    this.buttons = [...document.querySelectorAll(".bunner_button")];
    this.intervalHandler = undefined;
  }

  showItem = (n) => {
    console.log(n);
    for (let img of this.images) {
      if (img.dataset.id == n) {
        this.currentId = n;
        img.classList.add("active_img");
      } else if (img.dataset.id != n && img.classList.contains("active_img")) {
        img.classList.remove("active_img");
      }
    }
    this.buttonsStylesUpdate(n);
  };

  nextItem = () => {
    if (this.currentId < this.imgCount - 1) {
      ++this.currentId;
    } else {
      this.currentId = 0;
    }
    this.showItem(this.currentId);
  };

  startInterval = () => {
    this.intervalHandler = setInterval(this.nextItem, this.interval);
  };

  buttonSlideHandler = (event) => {
    if (this.intervalHandler) {
      clearInterval(this.intervalHandler);
    }
    const imgId = event.target.dataset.id;
    this.showItem(imgId);
    this.startInterval();
  };

  buttonsStylesUpdate = (id) => {
    for (let item of this.buttons) {
      if (item.dataset.id == id) {
        item.classList.add("active");
      } else if (item.dataset.id != id && item.classList.contains("active")) {
        item.classList.remove("active");
      }
    }
  };
}

const slider = new Slider();

document.addEventListener("DOMContentLoaded", (event) => {
  slider.startInterval();
  const bannerButtons = [...document.querySelectorAll(".bunner_button")];
  bannerButtons.forEach((item) => {
    item.addEventListener("click", slider.buttonSlideHandler);
  });
});
