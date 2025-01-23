import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiNodedotjs,
  SiGraphql,
  SiDocker,
  SiAmazon,
  SiJest,
  SiStackblitz as DefaultIcon,
  SiBootstrap,
  SiIonic,
  SiAngular,
  SiJavascript,
  SiServerless,
  SiJira,
  SiGitkraken,
  SiSonarqube,
  SiDbeaver,
  SiJenkins,
  SiDarkreader,
  SiRetroarch
} from "react-icons/si";
import { DiLinux } from "react-icons/di";
import { GiLightSabers, GiSpaceship, GiMeepleArmy, GiMightyForce, GiDeathStar, GiVampireDracula } from "react-icons/gi";
import { FaFistRaised } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { Sun, Moon, Laptop, Terminal, Palette, Sparkles, Wand2 } from "lucide-react";

type IconMap = {
  [key: string]: React.ComponentType;
};

const map: IconMap = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  bootstrap: SiBootstrap,
  ionic: SiIonic,
  angular: SiAngular,
  javascript: SiJavascript,
  nodejs: SiNodedotjs,
  graphql: SiGraphql,
  rest: SiServerless,
  jira: SiJira,
  gitkraken: SiGitkraken,
  docker: SiDocker,
  aws: SiAmazon,
  sonarqube: SiSonarqube,
  jest: SiJest,
  vscode: VscVscode,
  dbeaver: SiDbeaver,
  linux: DiLinux,
  jenkins: SiJenkins,
  lightsaber: GiLightSabers,
  choke: FaFistRaised,
  fleet: GiSpaceship,
  army: GiMeepleArmy,
  force: GiMightyForce,
  sith: SiDarkreader,
  deathstar: GiDeathStar,
  sun: Sun,
  moon: Moon,
  laptop: Laptop,
  terminal: Terminal,
  palette: Palette,
  sparkles: Sparkles,
  wand: Wand2,
  dracula: GiVampireDracula,
  retro: SiRetroarch
};
export const useIconMap = () => {
  return map;
};

export const getIcon = (iconName: string) => {
    return map[iconName] || Palette;
}