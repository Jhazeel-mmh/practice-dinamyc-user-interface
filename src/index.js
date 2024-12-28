import "./style.css";
import "./normalize.css";

const $ = (el) => document.querySelector(el);

const $$ = (el) => document.querySelectorAll(el);

function setDropdown(trigger, c, cls) {
  let dropdown = $(trigger);
  let content = $(c);
  dropdown.addEventListener("click", () => {
    content.classList.toggle(cls);
  });
}

setDropdown(".dropdown", ".content", "hidden");

const createCarrousel = function (selector, btnsOfSlides) {
  const images = [];
  let currentIndex = 0;

  function getImages() {
    return images;
  }

  function getCurrentIndex() {
    return currentIndex;
  }

  function slideChangue() {
    let nodes = $$(btnsOfSlides);
    nodes.forEach((node, index) => {
      if (index === getCurrentIndex()) {
        node.style.backgroundColor = "#aaaaaa";
        return;
      }
      node.style.backgroundColor = "#ffffff";
    });
  }

  function setImages(s) {
    let elements = $$(s);
    elements.forEach((element, index) => {
      images.push(element.id);
      element.style.visibility = index === currentIndex ? "visible" : "hidden";
    });
  }

  function setVisibility() {
    images.forEach((id, index) => {
      let element = $("#" + id);
      element.style.visibility = index === currentIndex ? "visible" : "hidden";
    });
    slideChangue();
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
    setVisibility();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    setVisibility();
  }
  5;

  function setCurrentIndex(index) {
    if (index >= 0 && index < images.length) {
      currentIndex = index;
      setVisibility();
    }
  }

  function setCurrentIndexByKey(key) {
    images.forEach((img, index) => {
      if (img == key) {
        currentIndex = index;
      }
    });
    setVisibility();
  }

  function changueSlides() {
    setInterval(() => {
      next();
    }, 3000);
  }

  setImages(selector);
  changueSlides();

  return {
    getImages,
    getCurrentIndex,
    setCurrentIndex,
    setCurrentIndexByKey,
    next,
    prev,
    slideChangue,
  };
};

let carrousel = createCarrousel(".picture-frame", ".buttons > button");

console.log(carrousel.getImages());

const carrrouselDomControl = function (
  selectorSlides,
  selectorNext,
  selectorPrev,
  carrouselObj,
) {
  function setControls(select) {
    let btns = $$(select);
    btns.forEach((btn, index) => {
      btn.addEventListener("click", (event) => {
        setSlide(event, index);
      });
    });
  }

  function setSlide(e, index) {
    let targetId = e.target.id;
    targetId = targetId.replace("slides-", "");
    carrouselObj.setCurrentIndex(index);
  }

  function setNextAndPrevControls(n, p) {
    $(n).addEventListener("click", carrouselObj.next);
    $(p).addEventListener("click", carrouselObj.prev);
  }

  setNextAndPrevControls(selectorNext, selectorPrev);
  setControls(selectorSlides);
};

const carrouselDOM = carrrouselDomControl(
  ".buttons > button",
  "#next",
  "#prev",
  carrousel,
);
