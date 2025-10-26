import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';

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

let editorView: EditorView | null = null;

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
      oneDark,
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
      oneDark,
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

  const runButton = document.getElementById('run-code');
  const languageSelect = document.getElementById('language-select');
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

  if (toggleOutput && outputWrapper) {
    toggleOutput.addEventListener('click', () => {
      outputWrapper.classList.toggle('collapsed');
    });
  }
}

// Remove auto-initialization - only initialize via explicit call from component
