#!/usr/bin/env python3
"""
bionic.py — Bionic Reading pour LaTeX
Usage : python3 bionic.py input.tex output.tex
"""
import re, sys, math

def bold_prefix(word):
    m = re.match(r'^([a-zA-Z\xc0-\xf6\xf8-\xff]+)', word)
    if not m:
        return word
    n = max(1, math.ceil(len(m.group(1)) / 2))
    return r'\textbf{' + word[:n] + '}' + word[n:]

TOKEN_RE = re.compile(
    r'%[^\n]*\n?'
    r'|\$\$[\s\S]*?\$\$'
    r'|\$[^$\n]*?\$'
    r'|\\\([\s\S]*?\\\)'
    r'|\\\[[\s\S]*?\\\]'
    r'|\\[a-zA-Z@]+\*?'
    r'|[{}[\]]'
    r'|[^\\%${}[\]]+',
    re.DOTALL
)

# Commandes dont on skip TOUS les arguments {..} et [..]
SKIP_CMDS = {
    r'\label', r'\ref', r'\eqref', r'\pageref',
    r'\cite', r'\citet', r'\citep', r'\citealt', r'\nocite',
    r'\bibliography', r'\bibliographystyle', r'\addbibresource',
    r'\usepackage', r'\documentclass',
    r'\newcommand', r'\renewcommand', r'\providecommand',
    r'\input', r'\include', r'\includegraphics',
    r'\url', r'\href', r'\footnote', r'\footnotemark', r'\footnotetext',
    r'\hypersetup', r'\lstset', r'\definecolor',
    r'\color', r'\textcolor', r'\colorbox',
    r'\newenvironment', r'\renewenvironment',
    r'\DeclareMathOperator', r'\setcounter', r'\addtocounter',
    r'\newtheorem', r'\theoremstyle',
    r'\begin', r'\end',
    r'\section', r'\subsection', r'\subsubsection',
    r'\chapter', r'\paragraph', r'\subparagraph',
    r'\caption', r'\title', r'\author', r'\date',
    r'\pagestyle', r'\thispagestyle', r'\pagenumbering',
    r'\bibliographystyle',
}

# Environnements dont on ne transforme PAS le contenu
OPAQUE_ENVS = {
    'verbatim', 'lstlisting', 'minted', 'Verbatim',
    'equation', 'equation*', 'align', 'align*',
    'gather', 'gather*', 'multline', 'multline*',
    'displaymath', 'array', 'tabular', 'tabular*',
    'tikzpicture', 'pgfpicture', 'filecontents',
}

def apply_bionic(text):
    parts = re.split(r'(\s+|[^\w\s\xc0-\xf6\xf8-\xff])', text)
    return ''.join(
        bold_prefix(p) if re.match(r'^[a-zA-Z\xc0-\xf6\xf8-\xff]', p) else p
        for p in parts
    )

def skip_balanced(tokens, i, open_c, close_c):
    """Consomme open_c...close_c et retourne (string, nouvel_i)."""
    depth = 1
    buf = [tokens[i]]
    i += 1
    while i < len(tokens) and depth > 0:
        if tokens[i] == open_c:    depth += 1
        elif tokens[i] == close_c: depth -= 1
        buf.append(tokens[i])
        i += 1
    return ''.join(buf), i

def process_latex(source):
    tokens = TOKEN_RE.findall(source)
    result = []
    i = 0
    opaque_stack = []  # noms des envs opaques ouverts

    while i < len(tokens):
        tok = tokens[i]

        # Commentaire
        if tok.startswith('%'):
            result.append(tok); i += 1; continue

        # Maths
        if tok.startswith('$') or tok.startswith(r'\(') or tok.startswith(r'\['):
            result.append(tok); i += 1; continue

        # Commande
        if tok.startswith('\\'):
            result.append(tok)
            i += 1
            cmd = tok.rstrip('*')

            # Gestion \begin / \end pour les envs opaques
            if cmd == r'\begin':
                # Lire le {nom}
                while i < len(tokens) and tokens[i].strip() == '':
                    result.append(tokens[i]); i += 1
                if i < len(tokens) and tokens[i] == '{':
                    blk, i = skip_balanced(tokens, i, '{', '}')
                    result.append(blk)
                    env_name = blk[1:-1].strip()
                    if env_name in OPAQUE_ENVS:
                        opaque_stack.append(env_name)
                continue

            if cmd == r'\end':
                while i < len(tokens) and tokens[i].strip() == '':
                    result.append(tokens[i]); i += 1
                if i < len(tokens) and tokens[i] == '{':
                    blk, i = skip_balanced(tokens, i, '{', '}')
                    result.append(blk)
                    env_name = blk[1:-1].strip()
                    if opaque_stack and opaque_stack[-1] == env_name:
                        opaque_stack.pop()
                continue

            # Autres commandes à protéger
            if cmd in SKIP_CMDS:
                while i < len(tokens) and tokens[i].strip() == '':
                    result.append(tokens[i]); i += 1
                # [...]
                while i < len(tokens) and tokens[i] == '[':
                    blk, i = skip_balanced(tokens, i, '[', ']')
                    result.append(blk)
                    while i < len(tokens) and tokens[i].strip() == '':
                        result.append(tokens[i]); i += 1
                # {...}
                while i < len(tokens) and tokens[i] == '{':
                    blk, i = skip_balanced(tokens, i, '{', '}')
                    result.append(blk)
                    while i < len(tokens) and tokens[i].strip() == '':
                        result.append(tokens[i]); i += 1
            continue

        # Accolades/crochets
        if tok in ('{', '}', '[', ']'):
            result.append(tok); i += 1; continue

        # Texte ordinaire
        if opaque_stack:
            result.append(tok)
        else:
            result.append(apply_bionic(tok))
        i += 1

    return ''.join(result)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 bionic.py input.tex [output.tex]")
        sys.exit(1)
    input_file  = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) >= 3 else input_file
    with open(input_file, 'r', encoding='utf-8') as f:
        source = f.read()
    result = process_latex(source)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(result)
    print(f"Bionic Reading applique -> {output_file}")

if __name__ == '__main__':
    main()