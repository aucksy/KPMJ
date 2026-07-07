/* =========================================================
   KPMJ & Associates — interactions
   Vanilla JS, no dependencies. Respects reduced motion.
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Preloader ---------- */
  var pre = $("#preloader");
  window.addEventListener("load", function () {
    setTimeout(function () { if (pre) pre.classList.add("done"); }, reduce ? 0 : 650);
  });
  // safety: never keep the loader forever
  setTimeout(function () { if (pre) pre.classList.add("done"); }, 3000);

  /* ---------- Year ---------- */
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- Nav: shrink + mobile toggle ---------- */
  var nav = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks");
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");

    // scroll progress
    var h = document.documentElement;
    var sp = $("#scrollProgress");
    var max = h.scrollHeight - h.clientHeight;
    if (sp) sp.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";

    // back-to-top
    var tt = $("#toTop");
    if (tt) tt.classList.toggle("show", window.scrollY > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var closeMenu = function () {
    if (!links) return;
    links.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  if (toggle) toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$("#navLinks a").forEach(function (a) { a.addEventListener("click", closeMenu); });

  var toTop = $("#toTop");
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  /* ---------- Reveal on scroll + trigger counters/bars ---------- */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var plain = el.getAttribute("data-plain") === "1"; // e.g. a year: no thousands, no easing flourish
    if (reduce) { el.textContent = (plain ? target : target.toFixed(decimals)) + suffix; return; }
    var dur = 1500, start = null;
    function tick(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = (plain ? Math.round(val).toString() : val.toFixed(decimals)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = (plain ? target : target.toFixed(decimals)) + suffix;
    }
    requestAnimationFrame(tick);
  }
  var counters = $$(".stat__num");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  } else { counters.forEach(animateCount); }

  /* ---------- Rating bars fill ---------- */
  var bars = $$(".ratingcard__bars .bar");
  if ("IntersectionObserver" in window) {
    var bio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); bio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    bars.forEach(function (b) { bio.observe(b); });
  } else { bars.forEach(function (b) { b.classList.add("in"); }); }

  /* ---------- Contact form -> WhatsApp ---------- */
  var form = $("#cform");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = $("#f-name"), phone = $("#f-phone");
      var ok = true;
      [name, phone].forEach(function (f) {
        if (!f.value.trim()) { f.classList.add("err"); ok = false; }
        else f.classList.remove("err");
      });
      if (!ok) { (name.value.trim() ? phone : name).focus(); return; }

      var service = $("#f-service").value;
      var msg = $("#f-message").value.trim();
      // Build the message as plain text, then encode the WHOLE thing once so
      // special characters (&, *, spaces, newlines) can't break the query string.
      var lines = [
        "Hello KPMJ & Associates,",
        "",
        "*Name:* " + name.value.trim(),
        "*Phone:* " + phone.value.trim(),
        "*Service:* " + service
      ];
      if (msg) lines.push("*Details:* " + msg);
      lines.push("", "Please get in touch. Thank you!");
      var text = encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/919950554949?text=" + text, "_blank", "noopener");
    });
    // clear error styling on input
    $$("#cform input").forEach(function (f) {
      f.addEventListener("input", function () { f.classList.remove("err"); });
    });
  }

  /* ---------- Hero particle canvas (light, gold motes) ---------- */
  var canvas = $("#heroCanvas");
  if (canvas && !reduce) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, pts = [], raf = null, running = false;

    function size() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(70, Math.floor(W * H / 16000));
      pts = [];
      for (var i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.7 + 0.4, a: Math.random() * 0.5 + 0.15
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      // link lines
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 13000) {
            ctx.globalAlpha = (1 - d / 13000) * 0.14;
            ctx.strokeStyle = "#E4C15A";
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      // dots
      for (var k = 0; k < pts.length; k++) {
        var pt = pts[k];
        ctx.globalAlpha = pt.a;
        ctx.fillStyle = "#EAD196";
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function start() { if (!running) { running = true; draw(); } }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }

    size();
    start();

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt); rt = setTimeout(size, 180);
    });
    // pause when tab hidden or hero scrolled away (perf)
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });
    var heroEl = $(".hero");
    if (heroEl && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
      }, { threshold: 0.02 }).observe(heroEl);
    }
  }
})();
