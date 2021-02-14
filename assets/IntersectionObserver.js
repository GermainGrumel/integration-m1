// Higher number = more zoom
let scaleAmount = 0.5;

function scrollZoom() {
  const images = document.querySelectorAll("[data-scroll-zoom]");
  let scrollPosY = 0;
  scaleAmount = scaleAmount / 100;

  const observerConfig = {
    rootMargin: "0% 0% 0% 0%",
    threshold: 0
  };

  // Create separate IntersectionObservers and scroll event listeners for each image so that we can individually apply the scale only if the image is visible
  images.forEach(image => {
    let isVisible = false;
    const observer = new IntersectionObserver((elements, self) => {
      elements.forEach(element => {
        isVisible = element.isIntersecting;
      });
    }, observerConfig);

    observer.observe(image);

    // Set initial image scale on page load
    image.style.transform = `scale(${1 + scaleAmount * percentageSeen(image)})`;

    // Only fires if IntersectionObserver is intersecting
    window.addEventListener("scroll", () => {
      if (isVisible) {
        scrollPosY = window.pageYOffset;
        image.style.transform = `scale(${1 +
          scaleAmount * percentageSeen(image)})`;
      }
    });
  });

  // Calculates the "percentage seen" based on when the image first enters the screen until the moment it leaves
  // Here, we get the parent node position/height instead of the image since it's in a container that has a border, but
  // if your container has no extra height, you can simply get the image position/height
  function percentageSeen(element) {
    const parent = element.parentNode;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const elPosY = parent.getBoundingClientRect().top + scrollY;
    const borderHeight = parseFloat(getComputedStyle(parent).getPropertyValue('border-bottom-width')) + parseFloat(getComputedStyle(element).getPropertyValue('border-top-width'));
    const elHeight = parent.offsetHeight + borderHeight;

    if (elPosY > scrollY + viewportHeight) {
      // If we haven't reached the image yet
      return 0;
    } else if (elPosY + elHeight < scrollY) {
      // If we've completely scrolled past the image
      return 100;
    } else {
      // When the image is in the viewport
      const distance = scrollY + viewportHeight - elPosY;
      let percentage = distance / ((viewportHeight + elHeight) / 100);
      percentage = Math.round(percentage);

      return percentage;
    }
  }
}

scrollZoom();



var parent=document.getElementById("parent-div");
var child=document.getElementById("child-div");
body.onscroll = function(){
if(document.documentElement.scrollTop>=child.offsetTop)//Adjust Tolerance as you want
{
   child.style.display="block"
}

};


if(!!window.IntersectionObserver){
  let observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {
    if(entry.isIntersecting){
      console.log(entry);
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
    });
  }, {rootMargin: "0px 0px -200px 0px"});
  document.querySelectorAll('img').forEach(img => { observer.observe(img) });
}

else document.querySelector('#warning').style.display = 'block';if(!!window.IntersectionObserver){
  let observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {
    if(entry.isIntersecting){
      console.log(entry);
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
    });
  }, {rootMargin: "0px 0px -200px 0px"});
  document.querySelectorAll('img').forEach(img => { observer.observe(img) });
}

else document.querySelector('#warning').style.display = 'block';