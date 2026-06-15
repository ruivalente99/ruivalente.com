export const BANNER = String.raw`             _              _            _
  _ __ _   _(_) __   ____ _| | ___ _ __ | |_ ___
 | '__| | | | | \ \ / / _` + "`" + String.raw` | |/ _ \ '_ \| __/ _ \
 | |  | |_| | |  \ V / (_| | |  __/ | | | ||  __/
 |_|   \__,_|_|   \_/ \__,_|_|\___|_| |_|\__\___|`;

export const NEOFETCH_LOGO = [
  "        ▄▄▄▄▄▄▄▄        ",
  "     ▄█▀▀      ▀▀█▄     ",
  "   ▄█▀   ▄████▄   ▀█▄   ",
  "  ██    ██▀  ▀██    ██  ",
  "  ██    ██▄  ▄██    ██  ",
  "  ██     ▀████▀     ██  ",
  "   ▀█▄    ▄██▄    ▄█▀   ",
  "     ▀█▄ ██▀▀██ ▄█▀     ",
  "        ▀▀▀  ▀▀▀        ",
];

export const VADER = String.raw`
        .-.
       |_:_|
      /(_Y_)\
     ( \/M\/ )
      '. _.'-/'.
        '-  \  \
          \  \\
          |\\/\\
          | _ -\\
          |     )
          |    /
   I find your lack of
   light theme disturbing.`;

export const TRAIN = String.raw`      ====        ________                ___________
  _D _|  |_______/        \__I_I_____===__|_________|
   |(_)---  |   H\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|__
__/ =| o |=-~~\  /~~\  /~~\  /~~\ ____Y___________|__
 |/-=|___|=    ||    ||    ||    |_____/~\___/
  \_/      \O=====O=====O=====O_/      \_/`;

export const COFFEE = String.raw`      ( (
       ) )
    ........
    |      |]
    \      /
     '----'
  coffee.exe loaded`;

export function cowsay(message: string): string {
  const msg = message || "moo";
  const lines: string[] = [];
  const words = msg.split(/\s+/);
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > 38) {
      lines.push(cur.trim());
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  const width = Math.max(...lines.map((l) => l.length));
  const pad = (s: string) => s + " ".repeat(width - s.length);
  const bubble =
    lines.length === 1
      ? [`< ${pad(lines[0])} >`]
      : lines.map((l, i) => {
          const [o, c] =
            i === 0 ? ["/", "\\"] : i === lines.length - 1 ? ["\\", "/"] : ["|", "|"];
          return `${o} ${pad(l)} ${c}`;
        });
  return [
    " " + "_".repeat(width + 2),
    ...bubble,
    " " + "-".repeat(width + 2),
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ].join("\n");
}

export const FORTUNES = [
  "There are only two hard things in computer science: cache invalidation, naming things, and off-by-one errors.",
  "It works on my machine. — every developer, moments before disaster",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I JOIN you?'",
  "99 little bugs in the code, 99 little bugs. Take one down, patch it around... 127 little bugs in the code.",
  "Weeks of coding can save you hours of planning.",
  "The best error message is the one that never shows up. The worst is 'undefined is not a function'.",
  "Documentation is a love letter you write to your future self.",
  "Programmer (n.): a machine that turns coffee into code.",
  "Real programmers count from 0.",
  "If debugging is the process of removing bugs, then programming must be the process of putting them in. — Dijkstra",
  "git commit -m 'fix' && git commit -m 'actually fix' && git commit -m 'please work'",
  "There is no place like 127.0.0.1",
  "Software and cathedrals are much the same — first we build them, then we pray.",
  "A user interface is like a joke: if you have to explain it, it's not that good.",
  "Why do Java developers wear glasses? Because they don't C#.",
];

export const TYPING_QUOTES = [
  "talk is cheap show me the code",
  "premature optimization is the root of all evil",
  "simplicity is the ultimate sophistication",
  "first solve the problem then write the code",
  "programs must be written for people to read",
  "any sufficiently advanced bug is indistinguishable from a feature",
  "the most disastrous thing you can learn is your first programming language",
  "code never lies comments sometimes do",
];

export const HACK_LINES = [
  "initializing exploit framework v4.2.0...",
  "scanning ports... 22 80 443 1337 open",
  "bypassing firewall............ OK",
  "spoofing MAC address.......... OK",
  "injecting payload [██████████░░░░░] 67%",
  "injecting payload [████████████████] 100%",
  "cracking RSA-4096 with a for-loop... OK (?)",
  "downloading mainframe......... OK",
  "enhancing... enhancing... ENHANCED",
  "access granted. welcome, agent.",
  "",
  "(disclaimer: absolutely nothing happened)",
];

export const RM_RF_LINES = [
  "rm: descending into '/usr'...",
  "removed '/usr/bin/node'",
  "removed '/usr/bin/vim'  (no!)",
  "removed '/usr/lib/libc.so.6'  (uh oh)",
  "rm: descending into '/home'...",
  "removed '/home/guest/projects'",
  "removed '/home/guest/resume.pdf'",
  "rm: descending into '/boot'...",
  "removed '/boot/vmlinuz'",
  "kernel panic - not syncing: attempted to kill init!",
  "",
  "...",
  "",
  "just kidding 😄 this filesystem is read-only and made of JSON.",
  "but maybe don't run that on your real machine.",
];
