'use strict';

const vscode = require('vscode');
const crypto = require('crypto');

function activate() {
    applyWorkspaceAccentColor();
}

function applyWorkspaceAccentColor() {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders || folders.length === 0) return;

    const workspaceName = folders[0].name;
    const hue = nameToHue(workspaceName);

    const config = vscode.workspace.getConfiguration('workbench');
    const existing = config.get('colorCustomizations') || {};

    // Don't overwrite if we've already applied colors for this workspace
    if (existing['[Primary Plus Dark]'] || existing['[Primary Plus Light]'] || existing['[Primary Plus Light Warm]']) return;

    config.update(
        'colorCustomizations',
        { ...existing, ...buildAccentColors(hue) },
        vscode.ConfigurationTarget.Workspace
    );
}

/**
 * Hash workspace name to a hue (0–359).
 */
function nameToHue(name) {
    const hash = crypto.createHash('sha256').update(name).digest('hex');
    return parseInt(hash.slice(0, 8), 16) % 360;
}

/**
 * Build color overrides for the outer VS Code chrome (title bar, status bar,
 * activity bar) for both theme variants, derived from a single hue.
 * Only these structural elements are overridden — editor colors stay untouched.
 */
function buildAccentColors(hue) {
    return {
        '[Primary Plus Dark]': {
            'statusBar.background':           hslHex(hue, 40, 13),
            'statusBar.foreground':           hslHex(hue, 20, 82),
            'statusBar.border':               hslHex(hue, 35, 22),
            'statusBarItem.remoteBackground': hslHex(hue, 50, 28),
            'statusBarItem.remoteForeground': hslHex(hue, 20, 88),
            'statusBarItem.hoverBackground':  hslHex(hue, 35, 20),
            'statusBarItem.activeBackground': hslHex(hue, 35, 22),
        },
        '[Primary Plus Light]': {
            'statusBar.background':           hslHex(hue, 45, 30),
            'statusBar.foreground':           hslHex(hue, 15, 93),
            'statusBar.border':               hslHex(hue, 40, 22),
            'statusBarItem.remoteBackground': hslHex(hue, 50, 40),
            'statusBarItem.remoteForeground': hslHex(hue, 10, 95),
            'statusBarItem.hoverBackground':  hslHex(hue, 40, 38),
            'statusBarItem.activeBackground': hslHex(hue, 40, 36),
        },
        '[Primary Plus Light Warm]': {
            'statusBar.background':           hslHex(hue, 45, 30),
            'statusBar.foreground':           hslHex(hue, 15, 93),
            'statusBar.border':               hslHex(hue, 40, 22),
            'statusBarItem.remoteBackground': hslHex(hue, 50, 40),
            'statusBarItem.remoteForeground': hslHex(hue, 10, 95),
            'statusBarItem.hoverBackground':  hslHex(hue, 40, 38),
            'statusBarItem.activeBackground': hslHex(hue, 40, 36),
            'statusBarItem.remoteForeground': hslHex(hue, 10, 95),
        }
    };
}

/**
 * Convert HSL (h: 0–360, s: 0–100, l: 0–100) to a #RRGGBB hex string.
 */
function hslHex(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const channel = n => {
        const k = (n + h / 30) % 12;
        const val = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * val).toString(16).padStart(2, '0');
    };
    return `#${channel(0)}${channel(8)}${channel(4)}`;
}

function deactivate() {}

module.exports = { activate, deactivate };
