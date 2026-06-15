import React from "react";
import { profile, social } from "@/lib/data";
import {
  getNode,
  listDir,
  renderTree,
  resolvePath,
  displayPath,
  VFile,
  VDir,
} from "@/lib/terminal/filesystem";
import { TERM_THEMES } from "@/lib/terminal/themes";
import {
  cowsay,
  COFFEE,
  FORTUNES,
  HACK_LINES,
  NEOFETCH_LOGO,
  RM_RF_LINES,
  TRAIN,
  TYPING_QUOTES,
  VADER,
} from "@/lib/terminal/ascii";
import type { TermAPI } from "./types";

export interface CmdSpec {
  name: string;
  usage: string;
  desc: string;
  hidden?: boolean;
  /** what to tab-complete for the first argument */
  complete?: "path" | "dir" | "theme" | "game" | "command";
}

export const GAMES = ["snake", "tictactoe", "guess", "typing"];

export const COMMANDS: CmdSpec[] = [
  // filesystem
  { name: "ls", usage: "ls [-la] [path]", desc: "list directory contents", complete: "path" },
  { name: "cd", usage: "cd <dir>", desc: "change directory", complete: "dir" },
  { name: "pwd", usage: "pwd", desc: "print working directory" },
  { name: "cat", usage: "cat <file>", desc: "print file contents", complete: "path" },
  { name: "tree", usage: "tree [path]", desc: "directory tree", complete: "path" },
  { name: "vim", usage: "vim <file>", desc: "edit a file (yes, really)", complete: "path" },
  { name: "open", usage: "open <file|url>", desc: "open a file's link in a new tab", complete: "path" },
  { name: "grep", usage: "grep <pattern> <file>", desc: "search inside a file" },
  { name: "echo", usage: "echo <text>", desc: "print text" },
  // info
  { name: "help", usage: "help [command]", desc: "this help", complete: "command" },
  { name: "man", usage: "man <command>", desc: "manual pages", complete: "command" },
  { name: "neofetch", usage: "neofetch", desc: "system info, but make it fashion" },
  { name: "whoami", usage: "whoami", desc: "who are you?" },
  { name: "contact", usage: "contact", desc: "how to reach me" },
  { name: "social", usage: "social", desc: "links, clickable" },
  { name: "email", usage: "email", desc: "open your mail client" },
  { name: "resume", usage: "resume", desc: "open my resume (pdf)" },
  { name: "date", usage: "date", desc: "current date and time" },
  { name: "uptime", usage: "uptime", desc: "session uptime" },
  { name: "history", usage: "history", desc: "command history" },
  // appearance
  { name: "theme", usage: "theme [name]", desc: "list or switch color schemes", complete: "theme" },
  // games
  { name: "play", usage: "play [game]", desc: `mini games: ${GAMES.join(", ")}`, complete: "game" },
  { name: "snake", usage: "snake", desc: "the classic. arrows/wasd" },
  { name: "tictactoe", usage: "tictactoe", desc: "you vs a smug AI" },
  { name: "guess", usage: "guess", desc: "number guessing, 1-100" },
  { name: "typing", usage: "typing", desc: "wpm test" },
  // session
  { name: "clear", usage: "clear", desc: "clear the screen (also Ctrl+L)" },
  { name: "gui", usage: "gui [page]", desc: "back to the clickable website" },
  { name: "exit", usage: "exit", desc: "log out to ruivalente.com" },
  // hidden / easter eggs
  { name: "vi", usage: "vi <file>", desc: "vim's nickname", hidden: true, complete: "path" },
  { name: "nano", usage: "nano <file>", desc: "we both know what happens", hidden: true, complete: "path" },
  { name: "emacs", usage: "emacs", desc: "nope", hidden: true },
  { name: "sudo", usage: "sudo <cmd>", desc: "with great power...", hidden: true },
  { name: "rm", usage: "rm ...", desc: "what could go wrong", hidden: true, complete: "path" },
  { name: "mkdir", usage: "mkdir", desc: "", hidden: true },
  { name: "touch", usage: "touch", desc: "", hidden: true },
  { name: "mv", usage: "mv", desc: "", hidden: true },
  { name: "cp", usage: "cp", desc: "", hidden: true },
  { name: "chmod", usage: "chmod", desc: "", hidden: true },
  { name: "sl", usage: "sl", desc: "choo choo", hidden: true },
  { name: "cowsay", usage: "cowsay <text>", desc: "moo", hidden: true },
  { name: "fortune", usage: "fortune", desc: "wisdom", hidden: true },
  { name: "cmatrix", usage: "cmatrix", desc: "follow the white rabbit", hidden: true },
  { name: "matrix", usage: "matrix", desc: "alias of cmatrix", hidden: true },
  { name: "crt", usage: "crt", desc: "scanlines", hidden: true },
  { name: "flip", usage: "flip", desc: "(╯°□°)╯︵ ┻━┻", hidden: true },
  { name: "glitch", usage: "glitch", desc: "reality.exe has stopped", hidden: true },
  { name: "reset", usage: "reset", desc: "clear all effects", hidden: true },
  { name: "hack", usage: "hack <target>", desc: "hollywood mode", hidden: true },
  { name: "coffee", usage: "coffee", desc: "☕", hidden: true },
  { name: "darkside", usage: "darkside", desc: "join us", hidden: true },
  { name: "jedi", usage: "jedi", desc: "return to the light", hidden: true },
  { name: "vimtutor", usage: "vimtutor", desc: "learn vim in 2 minutes", hidden: true },
  { name: "ping", usage: "ping <host>", desc: "fake packets", hidden: true },
  { name: "top", usage: "top", desc: "fake processes", hidden: true },
  { name: "uname", usage: "uname [-a]", desc: "system name", hidden: true },
  { name: "hostname", usage: "hostname", desc: "host name", hidden: true },
  { name: "reboot", usage: "reboot", desc: "turn it off and on again", hidden: true },
  { name: "uuddlrlrba", usage: "↑↑↓↓←→←→BA", desc: "you know the code", hidden: true },
];

const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a className="t-link" href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

function findFile(t: TermAPI, arg: string): { node: VFile | null; err?: string } {
  const abs = resolvePath(t.getCwd(), arg);
  const node = getNode(t.fsRoot, abs);
  if (!node) return { node: null, err: `no such file or directory: ${arg}` };
  if (node.type === "dir") return { node: null, err: `${arg}: is a directory` };
  return { node };
}

function looksLikeUrl(s: string) {
  return /^https?:\/\//.test(s) || /^[\w-]+(\.[\w-]+)+(\/|$)/.test(s);
}

export function execute(raw: string, t: TermAPI): void {
  const input = raw.trim();
  if (!input) return;

  const tokens = input.split(/\s+/);
  const cmd = tokens[0].toLowerCase();
  const args = tokens.slice(1);
  const rest = input.slice(tokens[0].length).trim();

  switch (cmd) {
    // ---------- filesystem ----------
    case "ls": {
      const flags = args.filter((a) => a.startsWith("-")).join("");
      const showHidden = flags.includes("a");
      const long = flags.includes("l");
      const pathArg = args.find((a) => !a.startsWith("-"));
      const abs = resolvePath(t.getCwd(), pathArg ?? ".");
      const node = getNode(t.fsRoot, abs);
      if (!node) return t.println(`ls: cannot access '${pathArg}': no such file or directory`, "t-err");
      if (node.type === "file") return t.println(node.name);
      const entries = listDir(node, showHidden);
      if (!entries.length) return t.println("(empty)", "t-dim");
      if (long) {
        entries.forEach((e) => {
          const perms = e.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
          const size = e.type === "file" ? String(e.content.length).padStart(6) : "  4096";
          t.print(
            <div>
              <span className="t-dim">{perms} rui rui {size} </span>
              <span className={e.type === "dir" ? "t-cyan" : e.hidden ? "t-dim" : ""}>
                {e.name}
                {e.type === "dir" ? "/" : ""}
              </span>
            </div>
          );
        });
      } else {
        t.print(
          <div className="flex flex-wrap gap-x-5 gap-y-0.5">
            {entries.map((e) => (
              <span key={e.name} className={e.type === "dir" ? "t-cyan" : e.hidden ? "t-dim" : ""}>
                {e.name}
                {e.type === "dir" ? "/" : ""}
              </span>
            ))}
          </div>
        );
      }
      return;
    }

    case "cd": {
      const target = args[0] ?? "~";
      const abs = resolvePath(t.getCwd(), target);
      const node = getNode(t.fsRoot, abs);
      if (!node) return t.println(`cd: no such file or directory: ${target}`, "t-err");
      if (node.type !== "dir") return t.println(`cd: not a directory: ${target}`, "t-err");
      t.setCwd(abs);
      return;
    }

    case "pwd":
      return t.println(t.getCwd());

    case "cat": {
      if (!args[0]) return t.println("cat: meow? (usage: cat <file>)", "t-warn");
      const { node, err } = findFile(t, args[0]);
      if (!node) return t.println(`cat: ${err}`, "t-err");
      return t.print(<pre className="whitespace-pre-wrap break-words">{node.content}</pre>);
    }

    case "tree": {
      const abs = resolvePath(t.getCwd(), args[0] ?? ".");
      const node = getNode(t.fsRoot, abs);
      if (!node || node.type !== "dir") return t.println(`tree: ${args[0] ?? "."}: not a directory`, "t-err");
      t.println(displayPath(abs), "t-cyan");
      return t.printLines(renderTree(node));
    }

    case "vim":
    case "vi": {
      if (!args[0]) {
        t.println("vim: which file? (try `vim README.md` or `vimtutor`)", "t-warn");
        return;
      }
      const abs = resolvePath(t.getCwd(), args[0]);
      const node = getNode(t.fsRoot, abs);
      if (node && node.type === "dir") return t.println(`vim: ${args[0]} is a directory`, "t-err");
      return t.openVim(abs);
    }

    case "nano":
      t.println("nano: not installed. this is a vim household.", "t-warn");
      if (args[0]) {
        t.println(`(fine. opening ${args[0]} in vim. you'll thank me later.)`, "t-dim");
        return execute(`vim ${args[0]}`, t);
      }
      return;

    case "emacs":
      return t.printLines(
        ["emacs: command not found", "(it's a great operating system, but this machine only has 640K of RAM)"],
        "t-warn"
      );

    case "open": {
      if (!args[0]) return t.println("open: usage: open <file|url>", "t-warn");
      if (looksLikeUrl(args[0])) {
        const url = args[0].startsWith("http") ? args[0] : `https://${args[0]}`;
        t.println(`opening ${url} ...`, "t-dim");
        return t.openUrl(url);
      }
      const { node, err } = findFile(t, args[0]);
      if (!node) return t.println(`open: ${err}`, "t-err");
      if (!node.url) return t.println(`open: ${args[0]} has no link attached. try cat.`, "t-warn");
      t.println(`opening ${node.url} ...`, "t-dim");
      return t.openUrl(node.url);
    }

    case "grep": {
      if (args.length < 2) return t.println("grep: usage: grep <pattern> <file>", "t-warn");
      const { node, err } = findFile(t, args[args.length - 1]);
      if (!node) return t.println(`grep: ${err}`, "t-err");
      const pattern = args.slice(0, -1).join(" ");
      const matches = node.content.split("\n").filter((l) => l.toLowerCase().includes(pattern.toLowerCase()));
      if (!matches.length) return t.println("(no matches)", "t-dim");
      matches.forEach((line) => {
        const idx = line.toLowerCase().indexOf(pattern.toLowerCase());
        t.print(
          <div className="whitespace-pre-wrap break-words">
            {line.slice(0, idx)}
            <span className="t-warn font-bold">{line.slice(idx, idx + pattern.length)}</span>
            {line.slice(idx + pattern.length)}
          </div>
        );
      });
      return;
    }

    case "echo": {
      const expanded = rest
        .replace(/\$USER/g, t.getUser())
        .replace(/\$HOME/g, "/home/guest")
        .replace(/\$SHELL/g, "/bin/rsh")
        .replace(/^["']|["']$/g, "");
      return t.println(expanded || "");
    }

    // ---------- info ----------
    case "help": {
      if (args[0]) return execute(`man ${args[0]}`, t);
      const section = (title: string, names: string[]) => {
        t.println("");
        t.println(`  ${title}`, "t-acc");
        names.forEach((n) => {
          const c = COMMANDS.find((x) => x.name === n)!;
          t.print(
            <div>
              {"    "}
              <span className="t-ok">{c.usage.padEnd(22)}</span>
              <span className="t-dim">{c.desc}</span>
            </div>
          );
        });
      };
      t.println("rsh — rui shell, v2.1.0", "t-cyan");
      section("filesystem", ["ls", "cd", "pwd", "cat", "tree", "vim", "open", "grep", "echo"]);
      section("about me", ["neofetch", "contact", "social", "email", "resume", "whoami"]);
      section("games", ["play", "snake", "tictactoe", "guess", "typing"]);
      section("session", ["theme", "clear", "history", "man", "gui", "exit"]);
      t.println("");
      t.println("  Tab completes commands & paths · ↑/↓ history · Ctrl+L clear · Ctrl+C cancel", "t-dim");
      t.println("  psst: hidden commands exist. `ls -a` knows things.", "t-dim");
      return;
    }

    case "man": {
      if (!args[0]) return t.println("What manual page do you want? (try `man vim`)", "t-warn");
      const spec = COMMANDS.find((c) => c.name === args[0].toLowerCase());
      if (!spec) return t.println(`No manual entry for ${args[0]}`, "t-err");
      t.println(`NAME`, "t-acc");
      t.println(`    ${spec.name} — ${spec.desc || "undocumented. spooky."}`);
      t.println(`SYNOPSIS`, "t-acc");
      t.println(`    ${spec.usage}`);
      if (spec.name === "vim") {
        t.println(`NOTES`, "t-acc");
        t.println("    :q quit · :w save · :wq both · i insert · Esc normal · hjkl move");
        t.println("    full crash course: `vimtutor`");
      }
      return;
    }

    case "neofetch":
    case "fetch": {
      const mins = Math.floor((Date.now() - t.bootTime) / 60000);
      const secs = Math.floor(((Date.now() - t.bootTime) % 60000) / 1000);
      const info: [string, string][] = [
        [`${t.getUser()}@ruivalente.com`, ""],
        ["─".repeat(22), ""],
        ["OS", "ruiOS 2.1.0 LTS (web edition)"],
        ["Host", "ruivalente.com"],
        ["Kernel", "next.js 13.5"],
        ["Uptime", `${mins}m ${secs}s`],
        ["Shell", "rsh 2.1.0"],
        ["Theme", t.getThemeName()],
        ["Role", profile.role],
        ["Bio", profile.bio],
        ["Email", profile.email],
        ["Editor", "vim (this is not up for debate)"],
        ["Fuel", "coffee, dangerously over the limit"],
      ];
      const logo = NEOFETCH_LOGO;
      const height = Math.max(logo.length, info.length);
      const out: React.ReactNode[] = [];
      for (let i = 0; i < height; i++) {
        const l = logo[i] ?? " ".repeat(logo[0].length);
        const item = info[i];
        out.push(
          <div key={i} className="whitespace-pre">
            <span className="t-acc">{l}</span>
            {"  "}
            {item ? (
              item[1] ? (
                <>
                  <span className="t-ok">{item[0]}</span>
                  <span className="t-dim">: </span>
                  {item[1]}
                </>
              ) : (
                <span className="t-cyan">{item[0]}</span>
              )
            ) : null}
          </div>
        );
      }
      return t.print(<div className="my-1">{out}</div>);
    }

    case "whoami":
      if (t.getUser() === "root") return t.println("root. happy now?", "t-warn");
      if (t.getUser() === "vader") return t.println("vader. your father, probably.", "t-err");
      return t.println("guest — a developer with excellent taste in portfolios.");

    case "contact":
      t.println("reach me at:", "t-acc");
      t.print(
        <div className="ml-2">
          <div>
            <span className="t-dim">email     </span>
            <ExtLink href={`mailto:${profile.email}`}>{profile.email}</ExtLink>
          </div>
          {social.map((s: any) => (
            <div key={s.url}>
              <span className="t-dim">{s.icon.toLowerCase().padEnd(10)}</span>
              <ExtLink href={s.url}>{s.url}</ExtLink>
            </div>
          ))}
        </div>
      );
      return;

    case "social":
      social.forEach((s: any) =>
        t.print(
          <div>
            <span className="t-dim">{s.icon.toLowerCase().padEnd(10)}</span>
            <ExtLink href={s.url}>{s.url}</ExtLink>
          </div>
        )
      );
      return;

    case "email":
      t.println(`opening mailto:${profile.email} ...`, "t-dim");
      return t.openUrl(`mailto:${profile.email}`);

    case "resume":
    case "cv":
      t.println("opening resume.pdf ...", "t-dim");
      return t.openUrl("/resume.pdf");

    case "date":
      return t.println(new Date().toString());

    case "uptime": {
      const s = Math.floor((Date.now() - t.bootTime) / 1000);
      return t.println(
        `up ${Math.floor(s / 60)}m ${s % 60}s, 1 user, load average: ☕ ${(Math.random() * 2 + 1).toFixed(2)}`
      );
    }

    case "history":
      t.getHistory().forEach((h, i) => t.println(`  ${String(i + 1).padStart(3)}  ${h}`));
      return;

    case "uname":
      return t.println(
        args[0] === "-a" ? "ruiOS ruivalente.com 2.1.0-web #1 SMP x86_64 GNU/JSON" : "ruiOS"
      );

    case "hostname":
      return t.println("ruivalente.com");

    // ---------- appearance ----------
    case "theme":
    case "themes": {
      if (!args[0]) {
        t.println("available themes (theme <name>):", "t-acc");
        TERM_THEMES.forEach((th) => {
          const locked = th.hidden && !t.isThemeUnlocked(th.name);
          const current = th.name === t.getThemeName();
          t.print(
            <div>
              {"  "}
              <span className={current ? "t-ok" : locked ? "t-dim" : ""}>
                {current ? "● " : "  "}
                {locked ? "???".padEnd(12) : th.name.padEnd(12)}
              </span>
              <span className="t-dim">{locked ? "locked — find the easter egg" : th.desc}</span>
            </div>
          );
        });
        return;
      }
      const name = args[0].toLowerCase();
      const th = TERM_THEMES.find((x) => x.name === name);
      if (!th) return t.println(`theme: unknown theme '${args[0]}'. run \`theme\` to list.`, "t-err");
      if (!t.setThemeByName(name)) {
        return t.println(`theme '${name}' is locked. it can be... earned.`, "t-warn");
      }
      return t.println(`theme set to ${name}`, "t-ok");
    }

    // ---------- games ----------
    case "play": {
      if (!args[0]) {
        t.println("games:", "t-acc");
        GAMES.forEach((g) => t.println(`  ${g}`));
        t.println("usage: play <game>  (or just type the game name)", "t-dim");
        return;
      }
      if (GAMES.includes(args[0])) return execute(args[0], t);
      return t.println(`play: unknown game '${args[0]}'`, "t-err");
    }

    case "snake":
      t.println("loading snake... (q to quit)", "t-dim");
      return t.startSnake();

    case "tictactoe":
      return startTicTacToe(t);

    case "guess":
      return startGuess(t);

    case "typing":
      return startTyping(t);

    // ---------- session ----------
    case "clear":
      return t.clear();

    case "gui": {
      const pages = ["projects", "experience", "education", "stack", "certificates", "easter-eggs"];
      const page = args[0]?.toLowerCase();
      const route = page && pages.includes(page) ? `/${page}` : "/";
      t.println(`switching to gui mode → ${route}`, "t-dim");
      return t.schedule(() => t.navigate(route), 400);
    }

    case "exit":
    case "logout":
      t.println("logout", "t-dim");
      t.println("(returning you to the boring-but-pretty version)", "t-dim");
      return t.schedule(() => t.navigate("/"), 600);

    case "reboot":
    case "restart": {
      const lines = [
        "broadcast message from root@ruivalente.com: system going down NOW",
        "unmounting /dev/portfolio ...",
        "saving 0 unsaved changes ...",
        "rebooting.",
      ];
      lines.forEach((l, i) => t.schedule(() => t.println(l, "t-warn"), i * 350));
      return t.schedule(() => window.location.reload(), lines.length * 350 + 400);
    }

    // ---------- easter eggs ----------
    case "sudo": {
      if (args[0] === "su" || (args[0] === "-i" && !args[1])) {
        t.setUser("root");
        t.println("you are now root.", "t-ok");
        return t.println("with great power comes a great electricity bill.", "t-dim");
      }
      if (args.join(" ").startsWith("rm -rf /")) return execute(args.join(" "), t);
      if (args.length === 0) return t.println("usage: sudo <command> (or `sudo su` if you're feeling brave)", "t-warn");
      if (t.getUser() === "root") return execute(args.join(" "), t);
      t.println(`${t.getUser()} is not in the sudoers file. This incident will be reported.`, "t-err");
      return t.schedule(() => t.println("(reported to /dev/null)", "t-dim"), 900);
    }

    case "rm": {
      const flat = args.join(" ");
      if (/-[rf]{2}\s+\/\s*$/.test(flat) || flat === "-rf /" || flat === "-fr /") {
        RM_RF_LINES.forEach((l, i) =>
          t.schedule(() => t.println(l, l.startsWith("removed") || l.includes("panic") ? "t-err" : "t-dim"), i * 280)
        );
        t.schedule(() => t.toggleEffect("glitch", true), 2200);
        t.schedule(() => t.toggleEffect("glitch", false), 3400);
        return;
      }
      return t.println("rm: cannot remove: read-only file system (it's a website, relax)", "t-err");
    }

    case "mkdir":
    case "touch":
    case "mv":
    case "cp":
    case "chmod":
    case "chown": {
      const jokes: Record<string, string> = {
        mkdir: "mkdir: permission denied. this museum has a strict no-construction policy.",
        touch: "touch: please don't touch the exhibits.",
        mv: "mv: everything is exactly where I want it, thanks.",
        cp: "cp: piracy is a crime. (read-only filesystem)",
        chmod: "chmod: nice try. 444 forever.",
        chown: "chown: this is MY portfolio. all files belong to rui.",
      };
      return t.println(jokes[cmd], "t-warn");
    }

    case "sl":
      t.print(
        <div className="term-sl-track w-full">
          <pre className="term-sl-train t-acc">{TRAIN}</pre>
        </div>
      );
      return t.println("you meant `ls`. the train forgives you.", "t-dim");

    case "cowsay":
      return t.print(<pre className="whitespace-pre">{cowsay(rest || "moo")}</pre>);

    case "fortune":
      return t.println(FORTUNES[Math.floor(Math.random() * FORTUNES.length)], "t-warn");

    case "cmatrix":
    case "matrix":
      t.toggleEffect("matrix");
      return t.println("there is no spoon. (run again to wake up)", "t-ok");

    case "crt":
      t.toggleEffect("crt");
      return t.println("CRT mode toggled. now with 100% more nostalgia.", "t-dim");

    case "flip":
      t.toggleEffect("flip");
      return t.println("(╯°□°)╯︵ ┻━┻  (run `flip` again or `reset` to fix the table)", "t-warn");

    case "glitch":
      t.toggleEffect("glitch");
      return t.println("r̸e̵a̷l̸i̵t̷y̸.̵e̶x̷e̸ has stopped responding (`reset` to fix)", "t-err");

    case "reset":
      t.resetEffects();
      return t.println("all effects cleared. order restored.", "t-ok");

    case "hack": {
      const target = args[0] || "the mainframe";
      t.println(`initiating attack on ${target} ...`, "t-err");
      HACK_LINES.forEach((l, i) =>
        t.schedule(() => t.println(l, l.includes("OK") || l.includes("granted") ? "t-ok" : "t-dim"), 400 + i * 380)
      );
      return;
    }

    case "coffee":
    case "☕":
      t.print(<pre className="t-warn whitespace-pre">{COFFEE}</pre>);
      return t.println("productivity +200%. jitters +400%.", "t-dim");

    case "darkside":
    case "vader": {
      t.unlockTheme("sith");
      t.setThemeByName("sith");
      t.setUser("vader");
      t.print(<pre className="t-err whitespace-pre">{VADER}</pre>);
      t.println("welcome to the dark side. we have cookies. 🍪", "t-err");
      return t.println("(run `jedi` to return to the light)", "t-dim");
    }

    case "jedi":
    case "lightside":
      t.setUser("guest");
      t.setThemeByName("matrix");
      return t.println("balance restored. may the source be with you. ✨", "t-ok");

    case "uuddlrlrba":
    case "konami": {
      t.unlockTheme("synthwave");
      t.unlockTheme("sith");
      t.setThemeByName("synthwave");
      t.println("⭐ KONAMI CODE ACCEPTED — +30 lives", "t-mag");
      return t.println("hidden themes unlocked: synthwave, sith. flex responsibly.", "t-dim");
    }

    case "vimtutor":
      return t.openVim("/home/guest/.vimtutor");

    case "ping": {
      const host = args[0] || "ruivalente.com";
      t.println(`PING ${host} 56(84) bytes of data.`);
      for (let i = 0; i < 4; i++) {
        const ms = (10 + Math.random() * 30).toFixed(1);
        t.schedule(
          () => t.println(`64 bytes from ${host}: icmp_seq=${i + 1} ttl=42 time=${ms} ms`),
          (i + 1) * 500
        );
      }
      return t.schedule(
        () => t.println(`--- ${host} ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss`, "t-dim"),
        2400
      );
    }

    case "top":
    case "htop":
      return t.printLines([
        "  PID USER   %CPU %MEM  COMMAND",
        "    1 rui    12.0  3.2  next dev",
        "   42 rui    88.1 64.0  chrome --tab-count=147",
        "   99 rui     4.2  1.1  vim README.md",
        "  137 rui     0.1  0.2  coffee.service (running)",
        "  404 rui     0.0  0.0  motivation (not found)",
        " 1337 rui    99.9  0.1  snake --hiscore-attempt",
      ]);

    case ":q":
    case ":q!":
    case ":wq":
    case ":x":
      return t.println("this is not vim. but I respect the muscle memory.", "t-warn");

    case "whois":
      return execute("cat ~/about.txt", t);

    case "42":
      return t.println("the answer to life, the universe, and everything. you already knew.", "t-mag");

    case "hello":
    case "hi":
      return t.println(`hello, ${t.getUser()}! 👋  type \`help\` to look around.`, "t-ok");

    default:
      t.println(`rsh: command not found: ${cmd}`, "t-err");
      const near = COMMANDS.filter((c) => !c.hidden && c.name.startsWith(cmd[0] ?? "")).slice(0, 3);
      if (near.length) t.println(`did you mean: ${near.map((c) => c.name).join(", ")}?`, "t-dim");
      return;
  }
}

// ---------- interactive mini games ----------

function startGuess(t: TermAPI) {
  const target = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  t.println("I'm thinking of a number between 1 and 100. (q to give up)", "t-acc");
  t.setInteractive({
    prompt: "guess> ",
    onCtrlC: () => t.println(`it was ${target}. quitter.`, "t-dim"),
    onLine: (line) => {
      const v = line.trim().toLowerCase();
      if (v === "q" || v === "quit" || v === "exit") {
        t.setInteractive(null);
        return t.println(`it was ${target}. quitter. 😏`, "t-dim");
      }
      const n = parseInt(v, 10);
      if (isNaN(n)) return t.println("numbers only, friend.", "t-warn");
      attempts++;
      if (n < target) return t.println("higher ↑", "t-cyan");
      if (n > target) return t.println("lower ↓", "t-cyan");
      t.setInteractive(null);
      const rating =
        attempts <= 7 ? "binary search detected. respect. 🫡" : "linear search?? we need to talk.";
      t.println(`🎉 got it in ${attempts} ${attempts === 1 ? "try" : "tries"}! ${rating}`, "t-ok");
    },
  });
}

const TTT_WINS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function startTicTacToe(t: TermAPI) {
  const board: (null | "X" | "O")[] = Array(9).fill(null);

  const winner = (): "X" | "O" | "draw" | null => {
    for (const [a, b, c] of TTT_WINS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return board.every(Boolean) ? "draw" : null;
  };

  const draw = () => {
    const cell = (i: number) =>
      board[i] === "X" ? (
        <span className="t-ok"> X </span>
      ) : board[i] === "O" ? (
        <span className="t-err"> O </span>
      ) : (
        <span className="t-dim"> {i + 1} </span>
      );
    t.print(
      <div className="my-1 leading-tight">
        {[0, 3, 6].map((r) => (
          <React.Fragment key={r}>
            <div>
              {cell(r)}<span className="t-dim">│</span>{cell(r + 1)}<span className="t-dim">│</span>{cell(r + 2)}
            </div>
            {r < 6 && <div className="t-dim">───┼───┼───</div>}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const aiMove = () => {
    const lines = TTT_WINS;
    const tryFind = (mark: "X" | "O") => {
      for (const [a, b, c] of lines) {
        const cells = [board[a], board[b], board[c]];
        if (cells.filter((x) => x === mark).length === 2 && cells.includes(null)) {
          return [a, b, c][cells.indexOf(null)];
        }
      }
      return -1;
    };
    let move = tryFind("O");
    if (move < 0) move = tryFind("X");
    if (move < 0 && board[4] === null) move = 4;
    if (move < 0) {
      const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
      if (corners.length) move = corners[Math.floor(Math.random() * corners.length)];
    }
    if (move < 0) {
      const free = board.map((v, i) => (v === null ? i : -1)).filter((i) => i >= 0);
      move = free[Math.floor(Math.random() * free.length)];
    }
    board[move] = "O";
  };

  const finish = (w: "X" | "O" | "draw") => {
    t.setInteractive(null);
    if (w === "X") t.println("you win?! impossible. I demand a rematch.", "t-ok");
    else if (w === "O") t.println("I win. as foretold by the prophecy. 😎", "t-err");
    else t.println("a draw. the only winning move is not to play. — WOPR", "t-warn");
  };

  t.println("tic-tac-toe — you are X. pick a cell (1-9), q to quit.", "t-acc");
  draw();
  t.setInteractive({
    prompt: "move> ",
    onLine: (line) => {
      const v = line.trim().toLowerCase();
      if (v === "q" || v === "quit") {
        t.setInteractive(null);
        return t.println("rage quit logged. 📋", "t-dim");
      }
      const n = parseInt(v, 10);
      if (isNaN(n) || n < 1 || n > 9) return t.println("pick a number 1-9.", "t-warn");
      if (board[n - 1]) return t.println("that cell is taken. eyes on the board!", "t-warn");
      board[n - 1] = "X";
      let w = winner();
      if (!w) {
        aiMove();
        w = winner();
      }
      draw();
      if (w) finish(w);
    },
  });
}

function startTyping(t: TermAPI) {
  const quote = TYPING_QUOTES[Math.floor(Math.random() * TYPING_QUOTES.length)];
  t.println("typing test — type this line and hit Enter:", "t-acc");
  t.println(`  ${quote}`, "t-cyan");
  const start = Date.now();
  t.setInteractive({
    prompt: "type> ",
    onLine: (line) => {
      t.setInteractive(null);
      const seconds = (Date.now() - start) / 1000;
      const typed = line.trim();
      let correct = 0;
      for (let i = 0; i < Math.min(typed.length, quote.length); i++) {
        if (typed[i] === quote[i]) correct++;
      }
      const accuracy = Math.round((correct / quote.length) * 100);
      const wpm = Math.round(typed.length / 5 / (seconds / 60));
      t.println(`time: ${seconds.toFixed(1)}s · wpm: ${wpm} · accuracy: ${accuracy}%`, "t-ok");
      if (accuracy < 80) t.println("accuracy is a feature, not a bug. try again!", "t-warn");
      else if (wpm > 80) t.println("mechanical keyboard detected. 🔥", "t-mag");
      else t.println("not bad! run `typing` for another round.", "t-dim");
    },
  });
}
