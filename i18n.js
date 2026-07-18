/* StickerYa! — i18n runtime */
(function () {
  var SUPPORTED = ['es', 'en', 'pt'];
  var STORAGE_KEY = 'sy_lang';

  function pickLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    var langs = navigator.languages || [navigator.language || 'es'];
    for (var i = 0; i < langs.length; i++) {
      var code = langs[i].slice(0, 2).toLowerCase();
      if (SUPPORTED.indexOf(code) !== -1) return code;
    }
    return 'es';
  }

  function t(lang, key) {
    var dict = window.I18N && window.I18N[lang];
    var fallback = window.I18N && window.I18N['es'];
    if (dict && dict[key] !== undefined) return dict[key];
    if (fallback && fallback[key] !== undefined) return fallback[key];
    return key;
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;

    // textContent nodes
    var textEls = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < textEls.length; i++) {
      textEls[i].textContent = t(lang, textEls[i].getAttribute('data-i18n'));
    }

    // innerHTML nodes (elements with internal markup)
    var htmlEls = document.querySelectorAll('[data-i18n-html]');
    for (var i = 0; i < htmlEls.length; i++) {
      htmlEls[i].innerHTML = t(lang, htmlEls[i].getAttribute('data-i18n-html'));
    }

    // attribute nodes: data-i18n-attr="attr:key" or "attr1:key1;attr2:key2"
    var attrEls = document.querySelectorAll('[data-i18n-attr]');
    for (var i = 0; i < attrEls.length; i++) {
      var pairs = attrEls[i].getAttribute('data-i18n-attr').split(';');
      for (var j = 0; j < pairs.length; j++) {
        var parts = pairs[j].split(':');
        if (parts.length >= 2) {
          var attr = parts[0].trim();
          var key  = parts.slice(1).join(':').trim();
          attrEls[i].setAttribute(attr, t(lang, key));
        }
      }
    }

    // update picker visual state
    var pickers = document.querySelectorAll('.sy-lang-picker');
    for (var i = 0; i < pickers.length; i++) {
      pickers[i].value = lang;
    }
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'es';
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  // expose globally so picker onclick can call it
  window.sySetLang = setLang;

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(pickLang());
  });
})();
