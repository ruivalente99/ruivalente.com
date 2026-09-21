import {
  projects,
  experiences,
  education,
  certificates,
  profile,
  social,
  hobbies,
  stack,
} from "@/lib/data";
import { VDir, VFile, dir, file, slugify } from "./filesystem";

/**
 * Build the virtual filesystem for the terminal from the same data that
 * powers the rest of the website. `contentMap` maps a contentPath
 * (e.g. "/content/projects/lazylife.md") to its raw markdown, read
 * server-side.
 */
export function buildFileSystem(contentMap: Record<string, string>): VDir {
  const md = (path?: string) => (path && contentMap[path]) || "";

  const projectFiles: VFile[] = projects.map((p: any) =>
    file(
      `${p.id}.md`,
      [
        `# ${p.title}`,
        "",
        p.description,
        "",
        `demo:    ${p.demo}`,
        `github:  ${p.github}`,
        "",
        `skills:  ${p.skills.join(", ")}`,
        "",
        "---",
        "",
        md(p.contentPath).trim(),
      ].join("\n"),
      { url: p.demo }
    )
  );

  const experienceFiles: VFile[] = experiences.map((e: any) =>
    file(
      `${e.id}.md`,
      [
        `# ${e.role} @ ${e.company}`,
        "",
        `period:  ${e.year}`,
        `company: ${e.companyUrl}`,
        "",
        `skills:  ${e.skills.join(", ")}`,
        "",
        "---",
        "",
        md(e.contentPath).trim(),
      ].join("\n"),
      { url: e.companyUrl }
    )
  );

  const educationFiles: VFile[] = education.map((e: any) =>
    file(
      `${e.id}.md`,
      [
        `# ${e.degree}`,
        "",
        `school:  ${e.school}`,
        `period:  ${e.year}`,
        `url:     ${e.url}`,
        "",
        `skills:  ${e.skills.join(", ")}`,
        "",
        "---",
        "",
        md(e.contentPath).trim(),
      ].join("\n"),
      { url: e.url }
    )
  );

  const certificateFiles: VFile[] = certificates.map((c: any) =>
    file(
      `${slugify(c.name)}.md`,
      [
        `# ${c.name}`,
        "",
        `issuer:  ${c.issuer}`,
        `year:    ${c.year}`,
        `url:     ${c.url}`,
        "",
        "tip: `open` this file to view the certificate",
      ].join("\n"),
      { url: c.url }
    )
  );

  const stackFiles: VFile[] = stack.map((cat: any) =>
    file(
      `${slugify(cat.category)}.txt`,
      [
        `# ${cat.category}`,
        "",
        ...cat.items.flatMap((i: any) => [
          `* ${i.name}`,
          `  ${i.description}`,
          `  why: ${i.reason}`,
          "",
        ]),
      ].join("\n")
    )
  );

  const aboutTxt = file(
    "about.txt",
    [
      `name:  ${profile.name}`,
      `role:  ${profile.role}`,
      `bio:   ${profile.bio}`,
      `email: ${profile.email}`,
      "",
      "Software engineer from Portugal 🇵🇹 building things for the web.",
      "Check ./projects, ./experience and ./education for the full story,",
      "or run `neofetch` for the fancy version.",
    ].join("\n")
  );

  const contactTxt = file(
    "contact.txt",
    [
      `email:    ${profile.email}`,
      ...social.map((s: any) => `${s.icon.toLowerCase().padEnd(9)} ${s.url}`),
      "",
      "tip: run `email` to open your mail client, `social` for clickable links.",
    ].join("\n")
  );

  const hobbiesDir = dir("hobbies", [
    file(
      "playlist.txt",
      [
        `# ${hobbies.playlist.title}`,
        "",
        hobbies.playlist.description,
        hobbies.playlist.url,
        "",
        "tip: `open hobbies/playlist.txt` to start the music 🎵",
      ].join("\n"),
      { url: hobbies.playlist.url }
    ),
    file(
      "watching.txt",
      [
        `# ${hobbies.watching.title}`,
        "",
        hobbies.watching.description,
        hobbies.watching.url,
      ].join("\n"),
      { url: hobbies.watching.url }
    ),
  ]);

  const readme = file("README.md", README);

  const resume = file(
    "resume.pdf",
    "%PDF-1.7 — binary file.\nThis is a PDF, you nerd. Run `open resume.pdf` to view it.",
    { url: "/resume.pdf", readOnly: true }
  );

  const secrets = dir(
    ".secrets",
    [
      file(
        "easter-eggs.txt",
        [
          "well well well... someone knows about `ls -a` 👀",
          "",
          "things you may want to try:",
          "  sl                    you WILL typo `ls` eventually",
          "  cowsay moo            a classic",
          "  fortune               wisdom of the ancients",
          "  cmatrix               follow the white rabbit",
          "  crt / flip / glitch   mess with the display",
          "  rm -rf /              what could possibly go wrong",
          "  sudo su               become root",
          "  darkside              join us. we have cookies.",
          "  uuddlrlrba            ↑↑↓↓←→←→BA",
          "  vim secret.txt        wait, that file doesn't exi— oh.",
          "  coffee                mandatory developer fuel",
          "  hack ruivalente.com   hollywood mode",
          "",
          "and yes, there are more. keep digging.",
        ].join("\n"),
        { hidden: false }
      ),
      file("do-not-open.txt", "you opened it.\n\n🐛\n\nnow you have a bug. it's yours. take care of it.", {}),
    ],
    true
  );

  const bashrc = file(
    ".bashrc",
    [
      "# guest shell config",
      'alias work="cd ~/experience && ls"',
      'alias coffee="echo ☕ && echo back to work"',
      'alias up="echo no. use cd .."',
      "export PS1='guest@ruivalente:\\w$ '",
      "export EDITOR=vim  # obviously",
    ].join("\n"),
    { hidden: true }
  );

  const vimtutor = file(
    ".vimtutor",
    [
      "===  v i m t u t o r  (pocket edition)  ===",
      "",
      "Lesson 1: you are in NORMAL mode. keys are commands, not text.",
      "  h j k l   move left / down / up / right (arrows work too)",
      "  w / b     jump forward / back a word",
      "  gg / G    top / bottom of file",
      "  0 / $     start / end of line",
      "",
      "Lesson 2: editing",
      "  i         insert before cursor      a   insert after",
      "  o         open a new line below     O   above",
      "  x         delete a character        dd  delete a line",
      "  yy        yank (copy) a line        p   paste",
      "  u         undo",
      "  Esc       back to NORMAL mode",
      "",
      "Lesson 3: the part everyone googles",
      "  :w        save        :q   quit",
      "  :wq       save+quit   :q!  quit without saving",
      "",
      "Lesson 4: searching",
      "  /word     search      n / N   next / previous match",
      "",
      "Now try it: delete this line with dd. Saved edits last until refresh.",
      "When you're done, :q and go check out the games. You earned snake.",
    ].join("\n"),
    { hidden: true }
  );

  const home = dir("guest", [
    readme,
    vimtutor,
    aboutTxt,
    contactTxt,
    resume,
    dir("projects", projectFiles),
    dir("experience", experienceFiles),
    dir("education", educationFiles),
    dir("certificates", certificateFiles),
    dir("stack", stackFiles),
    hobbiesDir,
    secrets,
    bashrc,
  ]);

  const etc = dir("etc", [
    file(
      "motd",
      "Welcome to ruiOS. Unauthorized access is mandatory.\nReport bugs to /dev/null.",
      {}
    ),
    file("hostname", "ruivalente.com"),
  ]);

  const varDir = dir("var", [
    dir("log", [
      file(
        "coffee.log",
        Array.from({ length: 8 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (7 - i));
          return `${d.toISOString().slice(0, 10)} 0${(i % 3) + 7}:1${i}:00 [OK] coffee consumed (cup ${i + 1}/∞)`;
        }).join("\n")
      ),
    ]),
  ]);

  const root = dir("/", []);
  root.children["home"] = dir("home", [home]);
  root.children["etc"] = etc;
  root.children["var"] = varDir;
  root.children["dev"] = dir("dev", [file("null", "", { readOnly: true })]);
  return root;
}

const README = `# ruivalente.com — terminal edition

Hi, fellow developer 👋  You found the terminal view of my portfolio.
Everything on the regular website lives here too, as a tiny fake unix.

## quick start

  ls                  look around
  cd projects         hop into a directory (tab-completion works!)
  cat lazy-life.md    read a file
  vim about.txt       or read it the hard way (:q to leave, you know the drill)
  open resume.pdf     files with links open in a new tab
  neofetch            mandatory system flex
  theme               list color schemes, e.g. \`theme dracula\`
  help                full command list

## keyboard

  Tab        autocomplete commands, paths, themes
  ↑ / ↓      command history
  Ctrl+L     clear screen
  Ctrl+C     cancel current line / game
  Ctrl+U     erase line

## games

  snake       the classic, arrow keys / wasd
  tictactoe   you vs. a very smug AI
  guess       number guessing, 1-100
  typing      wpm test for keyboard warriors

## boring version

If you'd rather click things: type \`gui\` to go back to ruivalente.com.

There are easter eggs. \`ls -a\` is your friend.
`;
