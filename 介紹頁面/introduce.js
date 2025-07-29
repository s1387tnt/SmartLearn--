// 添加一些互動效果
document.addEventListener("DOMContentLoaded", function () {
  // CTA按鈕點擊效果
  const ctaBtn = document.querySelector(".cta-button");
  ctaBtn.addEventListener("click", function () {
    alert("歡迎來到 SmartLearn！");
  });

  // 滑鼠移動視差效果
  document.addEventListener("mousemove", function (e) {
    const shapes = document.querySelectorAll(".floating-shape");
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.5;
      const xMove = (x - 0.5) * speed * 20;
      const yMove = (y - 0.5) * speed * 20;
      shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
  });
});
