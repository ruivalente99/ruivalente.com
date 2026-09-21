import { describe, test, expect } from "bun:test";
import { buildFileSystem } from "../lib/terminal/build-fs";
import { getNode, HOME } from "../lib/terminal/filesystem";
import { TERM_THEMES, getTheme, DEFAULT_THEME } from "../lib/terminal/themes";
import { COMMANDS, GAMES } from "../components/terminal/run-command";

describe("Terminal Window & Filesystem Substance", () => {
  test("builds complete virtual filesystem with home directory and system nodes", () => {
    const root = buildFileSystem({});
    expect(root).toBeDefined();
    expect(root.type).toBe("dir");

    // Verify /home/guest exists
    const homeNode = getNode(root, HOME);
    expect(homeNode).toBeDefined();
    expect(homeNode?.type).toBe("dir");

    // Verify system directories exist
    const binNode = getNode(root, "/bin");
    expect(binNode).toBeDefined();

    const etcNode = getNode(root, "/etc");
    expect(etcNode).toBeDefined();

    // Verify portfolio directories exist
    const projectsNode = getNode(root, "/projects");
    expect(projectsNode).toBeDefined();

    const experienceNode = getNode(root, "/experience");
    expect(experienceNode).toBeDefined();
  });

  test("contains valid terminal themes with default matrix and signature palettes", () => {
    expect(TERM_THEMES.length).toBeGreaterThanOrEqual(5);

    const defaultTheme = getTheme(DEFAULT_THEME);
    expect(defaultTheme).toBeDefined();
    expect(defaultTheme.name).toBe("matrix");
    expect(defaultTheme.colors.bg).toBeDefined();
    expect(defaultTheme.colors.fg).toBeDefined();
    expect(defaultTheme.colors.accent).toBeDefined();

    const draculaTheme = getTheme("dracula");
    expect(draculaTheme.colors.selection).toBeDefined();

    const cyberpunkTheme = getTheme("cyberpunk");
    expect(cyberpunkTheme.colors.cyan).toBeDefined();
  });

  test("contains essential unix commands and games", () => {
    const commandNames = COMMANDS.map((c) => c.name);
    expect(commandNames).toContain("ls");
    expect(commandNames).toContain("cd");
    expect(commandNames).toContain("cat");
    expect(commandNames).toContain("clear");
    expect(commandNames).toContain("theme");
    expect(commandNames).toContain("help");
    expect(commandNames).toContain("whoami");
    expect(commandNames).toContain("neofetch");
    expect(commandNames).toContain("vim");

    expect(GAMES).toContain("snake");
    expect(GAMES).toContain("guess");
    expect(GAMES).toContain("tictactoe");
  });

  test("all terminal commands and themes maintain strict lowercase and zero emojis", () => {
    const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\u2600-\u27BF/;

    for (const cmd of COMMANDS) {
      expect(cmd.name).toBe(cmd.name.toLowerCase());
      expect(cmd.desc).toBe(cmd.desc.toLowerCase());
      expect(emojiRegex.test(cmd.name)).toBe(false);
      expect(emojiRegex.test(cmd.desc)).toBe(false);
    }

    for (const th of TERM_THEMES) {
      expect(th.name).toBe(th.name.toLowerCase());
      expect(th.desc).toBe(th.desc.toLowerCase());
      expect(emojiRegex.test(th.name)).toBe(false);
      expect(emojiRegex.test(th.desc)).toBe(false);
    }

    for (const game of GAMES) {
      expect(game).toBe(game.toLowerCase());
      expect(emojiRegex.test(game)).toBe(false);
    }
  });
});
