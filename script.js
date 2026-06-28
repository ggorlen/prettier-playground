const defaultConfig = {
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

const outputEl = document.querySelector("pre");

const configEl = document.querySelector("#config");
configEl.value ||= JSON.stringify(defaultConfig, null, 2);
configEl.addEventListener("keyup", () => format());

document.querySelector("button").addEventListener("click", (e) => {
  copyToClipboard(outputEl.textContent);
});

const codeEl = document.querySelector("#code");
codeEl.addEventListener("keyup", (e) => format(e.target.value));
codeEl.focus();
codeEl.select();

let parser = "babel";
document.querySelector("select").addEventListener("change", event => {
  parser = event.target.value;
  format();
});

const copyToClipboard = text => {
  const ta = document.createElement("textarea");
  ta.textContent = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
};

const format = () => {
  try {
    const formatted = prettier.format(codeEl.value, {
      parser,
      plugins: prettierPlugins,
      ...JSON.parse(configEl.value)
    });
    outputEl.textContent = formatted;
  } catch (err) {
    outputEl.textContent = err.message;
  }
};
