import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import {
  dracula,
  cobalt,
  bespin,
  espresso,
  noctisLilac,
  smoothy,
  solarizedLight,
  ayuLight,
  rosePineDawn,
  clouds,
  tomorrow,
  birdsOfParadise
} from 'thememirror';

// Language configurations for Piston API
const LANGUAGE_CONFIGS: Record<string, { language: string; version: string }> = {
  python: { language: 'python', version: '3.10.0' },
  javascript: { language: 'javascript', version: '18.15.0' },
  typescript: { language: 'typescript', version: '5.0.3' },
  java: { language: 'java', version: '15.0.2' },
  cpp: { language: 'cpp', version: '10.2.0' },
  c: { language: 'c', version: '10.2.0' },
  rust: { language: 'rust', version: '1.68.2' },
  go: { language: 'go', version: '1.16.2' }
};

// Language support mapping for syntax highlighting
const LANGUAGE_SUPPORT: Record<string, any> = {
  python: python(),
  javascript: javascript(),
  typescript: javascript({ typescript: true }),
  java: java(),
  cpp: cpp(),
  c: cpp(),
  rust: cpp(), // Use cpp for syntax highlighting
  go: cpp() // Use cpp for syntax highlighting
};

// Theme configurations
const THEMES: Record<string, any> = {
  'one-dark': oneDark,
  'dracula': dracula,
  'cobalt': cobalt,
  'bespin': bespin,
  'espresso': espresso,
  'noctis-lilac': noctisLilac,
  'smoothy': smoothy,
  'birds-of-paradise': birdsOfParadise,
  'solarized-light': solarizedLight,
  'ayu-light': ayuLight,
  'rose-pine-dawn': rosePineDawn,
  'clouds': clouds,
  'tomorrow': tomorrow
};

// Theme color schemes for UI components
interface ThemeColors {
  background: string;
  headerBg: string;
  border: string;
  text: string;
  textSecondary: string;
  accent: string;
  buttonBg: string;
  buttonHover: string;
}

const THEME_COLORS: Record<string, ThemeColors> = {
  'one-dark': {
    background: '#21252b',
    headerBg: '#282c34',
    border: '#181a1f',
    text: '#abb2bf',
    textSecondary: '#5c6370',
    accent: '#61afef',
    buttonBg: '#61afef',
    buttonHover: '#528bcc'
  },
  'dracula': {
    background: '#282a36',
    headerBg: '#21222c',
    border: '#191a21',
    text: '#f8f8f2',
    textSecondary: '#6272a4',
    accent: '#ff79c6',
    buttonBg: '#ff79c6',
    buttonHover: '#ff92d0'
  },
  'cobalt': {
    background: '#002240',
    headerBg: '#001b33',
    border: '#001426',
    text: '#ffffff',
    textSecondary: '#0088ff',
    accent: '#ffdd00',
    buttonBg: '#ffdd00',
    buttonHover: '#ffee44'
  },
  'bespin': {
    background: '#28211c',
    headerBg: '#1f1916',
    border: '#16120f',
    text: '#8a8986',
    textSecondary: '#666462',
    accent: '#cf6a4c',
    buttonBg: '#cf6a4c',
    buttonHover: '#e07d5f'
  },
  'espresso': {
    background: '#2a211c',
    headerBg: '#211a16',
    border: '#18120e',
    text: '#bdae9d',
    textSecondary: '#888888',
    accent: '#43a8ed',
    buttonBg: '#43a8ed',
    buttonHover: '#5bb8fd'
  },
  'noctis-lilac': {
    background: '#f2f1f8',
    headerBg: '#e7e4f9',
    border: '#d5d1e8',
    text: '#0c006b',
    textSecondary: '#7060eb',
    accent: '#0094f0',
    buttonBg: '#0094f0',
    buttonHover: '#33a9f5'
  },
  'smoothy': {
    background: '#292d3e',
    headerBg: '#212532',
    border: '#1a1e2a',
    text: '#d4d4d4',
    textSecondary: '#717cb4',
    accent: '#82aaff',
    buttonBg: '#82aaff',
    buttonHover: '#a0c0ff'
  },
  'birds-of-paradise': {
    background: '#2a1f1d',
    headerBg: '#211816',
    border: '#18110f',
    text: '#e0dbcd',
    textSecondary: '#6b4e32',
    accent: '#efac32',
    buttonBg: '#efac32',
    buttonHover: '#f5c052'
  },
  'solarized-light': {
    background: '#fdf6e3',
    headerBg: '#eee8d5',
    border: '#e3dcc3',
    text: '#657b83',
    textSecondary: '#93a1a1',
    accent: '#268bd2',
    buttonBg: '#268bd2',
    buttonHover: '#4da3db'
  },
  'ayu-light': {
    background: '#fafafa',
    headerBg: '#f3f4f5',
    border: '#e7e8e9',
    text: '#5c6166',
    textSecondary: '#828c99',
    accent: '#399ee6',
    buttonBg: '#399ee6',
    buttonHover: '#55acea'
  },
  'rose-pine-dawn': {
    background: '#faf4ed',
    headerBg: '#fffaf3',
    border: '#f2e9e1',
    text: '#575279',
    textSecondary: '#9893a5',
    accent: '#d7827e',
    buttonBg: '#d7827e',
    buttonHover: '#e19592'
  },
  'clouds': {
    background: '#ffffff',
    headerBg: '#f8f8f8',
    border: '#e8e8e8',
    text: '#000000',
    textSecondary: '#5a5a5a',
    accent: '#4183c4',
    buttonBg: '#4183c4',
    buttonHover: '#5a97d4'
  },
  'tomorrow': {
    background: '#ffffff',
    headerBg: '#f6f6f6',
    border: '#e0e0e0',
    text: '#4d4d4c',
    textSecondary: '#8e908c',
    accent: '#4271ae',
    buttonBg: '#4271ae',
    buttonHover: '#5884be'
  }
};

let editorView: EditorView | null = null;
let currentTheme: string = 'cobalt';

/**
 * Initialize the CodeMirror editor
 */
function initEditor() {
  const editorElement = document.getElementById('code-editor');
  if (!editorElement) return;

  const initialCode = editorElement.getAttribute('data-initial-code') || '';
  const initialLanguage = editorElement.getAttribute('data-language') || 'python';

  const startState = EditorState.create({
    doc: initialCode,
    extensions: [
      basicSetup,
      LANGUAGE_SUPPORT[initialLanguage] || python(),
      THEMES[currentTheme],
      EditorView.lineWrapping,
      EditorView.editable.of(true),
      EditorState.readOnly.of(false),
      EditorView.theme({
        "&": {
          height: "100%"
        },
        ".cm-scroller": {
          overflow: "auto"
        },
        ".cm-content": {
          padding: "10px"
        }
      })
    ]
  });

  editorView = new EditorView({
    state: startState,
    parent: editorElement
  });
}

/**
 * Update editor language and syntax highlighting
 */
function updateEditorLanguage(language: string) {
  if (!editorView) return;

  const currentCode = editorView.state.doc.toString();

  const newState = EditorState.create({
    doc: currentCode,
    extensions: [
      basicSetup,
      LANGUAGE_SUPPORT[language] || python(),
      THEMES[currentTheme],
      EditorView.lineWrapping,
      EditorView.editable.of(true),
      EditorState.readOnly.of(false),
      EditorView.theme({
        "&": {
          height: "100%"
        },
        ".cm-scroller": {
          overflow: "auto"
        },
        ".cm-content": {
          padding: "10px"
        }
      })
    ]
  });

  editorView.setState(newState);
}

/**
 * Apply theme colors to UI components
 */
function applyThemeColors(theme: string) {
  const colors = THEME_COLORS[theme];
  if (!colors) return;

  const playground = document.querySelector('.code-playground') as HTMLElement;
  if (!playground) return;

  // Apply CSS variables to the playground component
  playground.style.setProperty('--playground-bg', colors.background);
  playground.style.setProperty('--playground-header-bg', colors.headerBg);
  playground.style.setProperty('--playground-border', colors.border);
  playground.style.setProperty('--playground-text', colors.text);
  playground.style.setProperty('--playground-text-secondary', colors.textSecondary);
  playground.style.setProperty('--playground-accent', colors.accent);
  playground.style.setProperty('--playground-button-bg', colors.buttonBg);
  playground.style.setProperty('--playground-button-hover', colors.buttonHover);
}

/**
 * Update editor theme
 */
function updateEditorTheme(theme: string) {
  if (!editorView) return;

  currentTheme = theme;
  const currentCode = editorView.state.doc.toString();
  const languageSelect = document.getElementById('language-select') as HTMLSelectElement;
  const currentLanguage = languageSelect ? languageSelect.value : 'python';

  const newState = EditorState.create({
    doc: currentCode,
    extensions: [
      basicSetup,
      LANGUAGE_SUPPORT[currentLanguage] || python(),
      THEMES[theme],
      EditorView.lineWrapping,
      EditorView.editable.of(true),
      EditorState.readOnly.of(false),
      EditorView.theme({
        "&": {
          height: "100%"
        },
        ".cm-scroller": {
          overflow: "auto"
        },
        ".cm-content": {
          padding: "10px"
        }
      })
    ]
  });

  editorView.setState(newState);

  // Apply theme colors to the entire component
  applyThemeColors(theme);
}

/**
 * Execute code using Piston API
 */
async function runCode() {
  if (!editorView) return;

  const runButton = document.getElementById('run-code') as HTMLButtonElement;
  const outputContent = document.getElementById('output-content');
  const outputStatus = document.getElementById('output-status');
  const languageSelect = document.getElementById('language-select') as HTMLSelectElement;
  const outputWrapper = document.querySelector('.output-wrapper');

  if (!runButton || !outputContent || !outputStatus || !languageSelect) return;

  const code = editorView.state.doc.toString();
  const language = languageSelect.value;
  const config = LANGUAGE_CONFIGS[language];

  if (!config) {
    outputContent.innerHTML = '<div class="output-error">Lenguaje no soportado</div>';
    return;
  }

  // Expand output panel if collapsed
  if (outputWrapper && outputWrapper.classList.contains('collapsed')) {
    outputWrapper.classList.remove('collapsed');
  }

  // Update UI
  runButton.classList.add('running');
  runButton.disabled = true;
  outputContent.innerHTML = '<div class="output-placeholder"><p>Ejecutando...</p></div>';
  outputStatus.textContent = 'Ejecutando...';
  outputStatus.className = 'output-status';

  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: config.language,
        version: config.version,
        files: [{
          content: code
        }]
      })
    });

    const result = await response.json();

    if (result.run) {
      const output = result.run.output || result.run.stderr || 'No output';
      const exitCode = result.run.code;

      if (exitCode === 0) {
        outputStatus.textContent = `Éxito (${exitCode})`;
        outputStatus.className = 'output-status success';
        outputContent.innerHTML = `<pre class="output-success">${escapeHtml(output)}</pre>`;
      } else {
        outputStatus.textContent = `Error (${exitCode})`;
        outputStatus.className = 'output-status error';
        outputContent.innerHTML = `<pre class="output-error">${escapeHtml(output)}</pre>`;
      }
    } else {
      throw new Error('No se pudo ejecutar el código');
    }
  } catch (error) {
    outputStatus.textContent = 'Error de red';
    outputStatus.className = 'output-status error';
    outputContent.innerHTML = `<div class="output-error">Error: ${error instanceof Error ? error.message : 'Error desconocido'}</div>`;
  } finally {
    runButton.classList.remove('running');
    runButton.disabled = false;
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Initialize code playground on page load
 */
export function initCodePlayground() {
  initEditor();

  // Apply initial theme colors
  applyThemeColors(currentTheme);

  const runButton = document.getElementById('run-code');
  const languageSelect = document.getElementById('language-select');
  const themeSelect = document.getElementById('theme-select');
  const toggleOutput = document.getElementById('toggle-output');
  const outputWrapper = document.querySelector('.output-wrapper');

  if (runButton) {
    runButton.addEventListener('click', runCode);
  }

  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      updateEditorLanguage(target.value);
    });
  }

  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      updateEditorTheme(target.value);
    });
  }

  if (toggleOutput && outputWrapper) {
    toggleOutput.addEventListener('click', () => {
      outputWrapper.classList.toggle('collapsed');
    });
  }
}

// Remove auto-initialization - only initialize via explicit call from component
