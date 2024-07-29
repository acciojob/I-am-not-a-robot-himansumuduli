//your code here
document.addEventListener("DOMContentLoaded", function () {
  const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
  const imageContainer = document.getElementById("image-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");

  let selectedImages = [];
  let repeatedImageClass = "";

  function initialize() {
    // Reset the state
    imageContainer.innerHTML = "";
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.textContent = "";
    document.getElementById("h").textContent =
      "Please click on the identical tiles to verify that you are not a robot.";

    // Select a random image to repeat
    const repeatedIndex = Math.floor(Math.random() * imageClasses.length);
    repeatedImageClass = imageClasses[repeatedIndex];

    // Create the images array with the repeated image
    const images = [...imageClasses, repeatedImageClass];

    // Shuffle the images array
    images.sort(() => Math.random() - 0.5);

    // Render the images
    images.forEach((imgClass, index) => {
      const img = document.createElement("img");
      img.className = imgClass;
      img.dataset.index = index;
      img.addEventListener("click", onImageClick);
      imageContainer.appendChild(img);
    });
  }

  function onImageClick(event) {
    const img = event.target;
    const imgClass = img.className;

    if (selectedImages.includes(img.dataset.index)) return;

    img.classList.add("selected");
    selectedImages.push(img.dataset.index);

    if (selectedImages.length > 0) {
      resetButton.style.display = "inline-block";
    }

    if (selectedImages.length === 2) {
      verifyButton.style.display = "inline-block";
    }

    if (selectedImages.length > 2) {
      verifyButton.style.display = "none";
    }
  }

  resetButton.addEventListener("click", initialize);

  verifyButton.addEventListener("click", function () {
    verifyButton.style.display = "none";
    const img1Class = document.querySelector(
      `img[data-index='${selectedImages[0]}']`
    ).className;
    const img2Class = document.querySelector(
      `img[data-index='${selectedImages[1]}']`
    ).className;

    if (img1Class === img2Class) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent =
        "We can't verify you as a human. You selected the non-identical tiles.";
    }
  });

  initialize();
});

