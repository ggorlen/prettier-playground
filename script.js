const config = {
  "arrowParens": "avoid",
  "bracketSameLine": false,
  "bracketSpacing": false,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 65,
  "proseWrap": "preserve",
  "quoteProps": "consistent",
  "requirePragma": false,
  "semi": true,
  "singleAttributePerLine": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
};

document.querySelector("button").addEventListener("click", (e) => {
  copyToClipboard(document.querySelector("pre").textContent);
});

document
  .querySelector("textarea")
  .addEventListener("keyup", (e) => format(e.target.value));

const copyToClipboard = text => {
  const ta = document.createElement("textarea");
  ta.textContent = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
};

const format = (text) => {
  try {
    const formatted = prettier.format(text, {
      parser: "babel",
      plugins: prettierPlugins,
      ...config,
    });
    document.querySelector("pre").textContent = formatted;
  } catch (err) {
    document.querySelector("pre").textContent = err.message;
  }
};

format(document.querySelector("textarea").value);