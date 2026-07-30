(function () {
  (function (C, A, L) {
    const enqueue = function (api, args) {
      api.q.push(args);
    };
    const documentRef = C.document;

    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal;
        const args = arguments;

        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          documentRef.head.appendChild(documentRef.createElement("script")).src = A;
          cal.loaded = true;
        }

        if (args[0] === L) {
          const api = function () {
            enqueue(api, arguments);
          };
          const namespace = args[1];
          api.q = api.q || [];

          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            enqueue(cal.ns[namespace], args);
            enqueue(cal, ["initNamespace", namespace]);
          } else {
            enqueue(cal, args);
          }
          return;
        }

        enqueue(cal, args);
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  window.Cal("init", "consultation", { origin: "https://cal.com" });
  window.Cal.ns.consultation("ui", {
    hideEventTypeDetails: false,
    layout: "month_view",
    cssVarsPerTheme: {
      light: {
        "cal-brand": "#0d5bff",
        "cal-brand-emphasis": "#080808",
        "cal-brand-text": "#ffffff"
      },
      dark: {
        "cal-brand": "#0d5bff",
        "cal-brand-emphasis": "#2f76ff",
        "cal-brand-text": "#ffffff"
      }
    }
  });
  window.Cal.ns.consultation("preload", {
    calLink: "vladimir-belolipetskiy-uh9xmh/30min"
  });
})();
