document.addEventListener("mousemove", function (e) {
  var body = document.querySelector("body");
  var heart = document.createElement("span");
  var x = e.offsetX;
  var y = e.offsetY;
  heart.style.left = 10 + x + "px";
  heart.style.top = 10 + y + "px";
  var size = Math.random() * 10;
  heart.style.width = 10 + size + "px";
  heart.style.height = 10 + size + "px";
  body.appendChild(heart);

  setTimeout(function () {
    heart.remove();
  }, 1000);
});

function hearts() {
  const create = document.createElement("div");
  const container = document.querySelector(".foot-container");
  create.classList.add("hearts");
  create.innerHTML = "💙";
  container.appendChild(create);

  setTimeout(() => {
    create.remove();
  }, 3000);
  create.style.left = Math.random() * 100 + "vw";
  create.style.animationDuration = Math.random() * 3 + 2 + "s";
}

hearts();

setInterval(hearts, 200);
