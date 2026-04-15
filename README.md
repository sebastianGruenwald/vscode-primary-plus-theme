# Primary Plus

A warm, old-school VS Code theme inspired by [Obsidian Primary](https://github.com/ceciliamay/obsidianmd-theme-primary). Boosted contrast on borders and selections for real visibility.

## Variants

| Variant | Style |
|---|---|
| **Primary Plus Dark** | Deep warm chocolate and coffee browns |
| **Primary Plus Light** | Aged yellowed paper |
| **Primary Plus Light Warm** | Light warm with a golden tint |

## Syntax Highlighting

Follows the Primary color palette:

- 🔴 **Red** — strings
- 🔵 **Blue** — keywords
- 🟡 **Yellow** — functions
- 🟣 **Purple** — types

Semantic highlighting is enabled for richer, language-aware coloring.

## Workspace Accent Color (optional)

Primary Plus can tint the status bar with a unique color automatically derived from your workspace name — so each project gets its own subtle accent.

This feature is **disabled by default**. To enable it, add the following to your user or workspace settings:

```json
"primaryPlus.workspaceAccentColor": true
```

Once enabled, the status bar color is generated the first time you open a workspace and then stays fixed. To reset it, remove the `workbench.colorCustomizations` entries for the Primary Plus themes from your `.vscode/settings.json`.

## Installation

Search for **Primary Plus** in the VS Code Extension Marketplace, or install from the command line:

```bash
code --install-extension Waschtlgrea.primary-plus
```

## Links

- [GitHub Repository](https://github.com/sebastianGruenwald/vscode-primary-plus-theme)
- [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)
