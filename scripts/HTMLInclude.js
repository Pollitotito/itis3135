/*! HTMLInclude v1.1.1 | MIT License | github.com/paul-browne/HTMLInclude */ 
!function(w, d) {
    if (!w.HTMLInclude) {
        w.HTMLInclude = function() {
            function isInViewport(element, offset) {
                return element.getBoundingClientRect().top <= (+offset + w.innerHeight);
            }
            function ajax(url, elements) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        elements.forEach(function(element) {
                            var dataReplace = element.getAttribute("data-replace");
                            var z = xhr.responseText;
                            if (dataReplace) {
                                dataReplace.split(",").forEach(function(el) {
                                    var o = el.trim().split(":");
                                    z = z.replace(new RegExp(o[0], "g"), o[1]);
                                });
                            }
                            element.outerHTML = z;
                            var scripts = new DOMParser().parseFromString(z, 'text/html').querySelectorAll("SCRIPT");
                            var i = 0;
                            var j = scripts.length;
                            while (i < j) {
                                var newScript = d.createElement("SCRIPT");
                                scripts[i].src ? newScript.src = scripts[i].src : newScript.innerHTML = scripts[i].innerHTML;
                                d.head.appendChild(newScript);
                                i++;
                            }
                        });
                    }
                };
                xhr.open("GET", url, true);
                xhr.send();
            }
            function lazyLoad(element, offset) {
                w.addEventListener("scroll", function scrollFunc() {
                    if (isInViewport(element, offset)) {
                        w.removeEventListener("scroll", scrollFunc);
                        ajax(element.getAttribute("data-include"), [element]);
                    }
                })
            }
            var store = {};
            var dis = d.querySelectorAll('[data-include]:not([data-in])');
            var i = dis.length;
            while (i--) {
                var di = dis[i].getAttribute('data-include');
                var laziness = dis[i].getAttribute('data-lazy');
                dis[i].setAttribute("data-in", "");
                if (!laziness || (laziness && isInViewport(dis[i], laziness))) {
                    store[di] = store[di] || [];
                    store[di].push(dis[i]);
                } else {
                    lazyLoad(dis[i], laziness);
                }
            }
            for (var key in store) {
                ajax(key, store[key]);
                document.dispatchEvent(new Event("htmlinclude-loaded")); // added by Diego Mendoza
            }
        }
    }
    w.HTMLInclude();
}(window, document)
// Script to dynamically set the page title based on the current HTML file, added by Diego Mendoza
function updatePageTitle() {
  const pageTitle = document.getElementById("page-title");
  if (!pageTitle) return;

  const path = window.location.pathname.split("/").pop();

  switch (path) {
    case "index.html":
      pageTitle.innerHTML = `<span class="title-letter">W</span><span class="title-letter">e</span><span class="title-letter">l</span><span class="title-letter">c</span><span class="title-letter">o</span><span class="title-letter">m</span><span class="title-letter">e</span>`;
      break;

    case "introduction.html":
      pageTitle.innerHTML = `<span class="title-letter">I</span><span class="title-letter">n</span><span class="title-letter">t</span><span class="title-letter">r</span><span class="title-letter">o</span><span class="title-letter">d</span><span class="title-letter">u</span><span class="title-letter">c</span><span class="title-letter">t</span><span class="title-letter">i</span><span class="title-letter">o</span><span class="title-letter">n</span>`;
      break;

    case "contract.html":
      pageTitle.innerHTML = `<span class="title-letter">C</span><span class="title-letter">o</span><span class="title-letter">u</span><span class="title-letter">r</span><span class="title-letter">s</span><span class="title-letter">e</span>
      <span> </span>
      <span class="title-letter">C</span><span class="title-letter">o</span><span class="title-letter">n</span><span class="title-letter">t</span><span class="title-letter">r</span><span class="title-letter">a</span><span class="title-letter">c</span><span class="title-letter">t</span>`;
      break;

    case "website_evaluations.html":
      pageTitle.innerHTML = `<span class="title-letter">W</span><span class="title-letter">e</span><span class="title-letter">b</span><span class="title-letter">s</span><span class="title-letter">i</span><span class="title-letter">t</span><span class="title-letter">e</span>
      <span> </span>
      <span class="title-letter">E</span><span class="title-letter">v</span><span class="title-letter">a</span><span class="title-letter">l</span><span class="title-letter">u</span><span class="title-letter">a</span><span class="title-letter">t</span><span class="title-letter">i</span><span class="title-letter">o</span><span class="title-letter">n</span><span class="title-letter">s</span>`;
      break;

    case "fccfsjs_outline.html":
        pageTitle.innerHTML = `<span class="title-letter">O</span><span class="title-letter">u</span><span class="title-letter">t</span><span class="title-letter">l</span><span class="title-letter">i</span><span class="title-letter">n</span><span class="title-letter">e</span>`;
      break;
  }
  pageTitle.classList.add("visible");
}

document.addEventListener("htmlinclude-loaded", updatePageTitle);

