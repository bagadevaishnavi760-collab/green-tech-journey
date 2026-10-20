import { useEffect, useRef, useState, type DragEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Battery,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Cpu,
  Gamepad2,
  Gauge,
  Headphones,
  Keyboard,
  Laptop,
  Lightbulb,
  Monitor,
  Pause,
  Play,
  Recycle,
  RotateCcw,
  Smartphone,
  Sparkles,
  Tablet,
  Trophy,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { Card, Section, SiteLayout } from "./SiteLayout";

type BinId = "recycle" | "reuse" | "hazardous" | "regular";
type GameStatus = "ready" | "playing" | "paused" | "results";

type WasteItem = {
  name: string;
  description: string;
  category: BinId;
  disposal: string;
  fact: string;
  icon: LucideIcon;
  color: string;
};

export const SORTING_BINS: ReadonlyArray<{
  id: BinId;
  label: string;
  hint: string;
  icon: LucideIcon;
  color: string;
}> = [
  {
    id: "recycle",
    label: "E-Waste Recycling",
    hint: "Certified recycler",
    icon: Recycle,
    color: "bg-teal-600",
  },
  {
    id: "reuse",
    label: "Reuse / Donate",
    hint: "Still works well",
    icon: Upload,
    color: "bg-emerald-600",
  },
  {
    id: "hazardous",
    label: "Hazardous Waste",
    hint: "Special handling",
    icon: Battery,
    color: "bg-amber-600",
  },
  {
    id: "regular",
    label: "Regular Waste",
    hint: "Not electronic",
    icon: X,
    color: "bg-slate-600",
  },
];

export const WASTE_ITEMS: ReadonlyArray<WasteItem> = [
  {
    name: "Old laptop",
    description: "A working laptop that has been replaced by a newer model.",
    category: "reuse",
    disposal: "Back up your data, wipe it securely, then donate it to a school or community group.",
    fact: "Extending a laptop's life by just one year helps avoid the resources needed to make a replacement.",
    icon: Laptop,
    color: "text-teal-700",
  },
  {
    name: "Cracked smartphone",
    description: "A phone with a broken screen and a battery that still holds a charge.",
    category: "recycle",
    disposal:
      "Take it to an authorised e-waste collection point so its metals and battery can be recovered safely.",
    fact: "Smartphones contain small amounts of gold, silver, copper and other recoverable materials.",
    icon: Smartphone,
    color: "text-emerald-700",
  },
  {
    name: "Loose lithium battery",
    description: "A swollen or damaged battery removed from a device.",
    category: "hazardous",
    disposal:
      "Never place it in a household bin. Tape the terminals and use a battery or hazardous-waste drop-off.",
    fact: "Damaged lithium batteries can ignite when crushed, punctured or short-circuited.",
    icon: Battery,
    color: "text-amber-700",
  },
  {
    name: "USB charger",
    description: "A working charger left over after upgrading to a new phone.",
    category: "reuse",
    disposal: "Pass it on to someone with a compatible device or donate it before recycling it.",
    fact: "Sharing chargers reduces demand for new accessories and keeps useful electronics in circulation.",
    icon: Zap,
    color: "text-cyan-700",
  },
  {
    name: "Circuit board",
    description: "A small board removed from an outdated electronic appliance.",
    category: "recycle",
    disposal: "Give it to a certified e-waste recycler for controlled material recovery.",
    fact: "Circuit boards are valuable urban mines, but they should never be burned to recover metals.",
    icon: Cpu,
    color: "text-green-700",
  },
  {
    name: "Wired headphones",
    description: "Headphones with a damaged cable and no useful parts for reuse.",
    category: "recycle",
    disposal: "Place them in an e-waste collection box rather than sending them to landfill.",
    fact: "Even small electronics contain plastics and metals that can be separated and recovered.",
    icon: Headphones,
    color: "text-violet-700",
  },
  {
    name: "Mechanical keyboard",
    description: "A fully functional keyboard from a completed home-office setup.",
    category: "reuse",
    disposal: "Clean it and offer it to a friend, school or local reuse centre.",
    fact: "Reuse is usually better than recycling because it avoids the energy needed to make a replacement.",
    icon: Keyboard,
    color: "text-blue-700",
  },
  {
    name: "Broken monitor",
    description: "A monitor that no longer displays an image.",
    category: "recycle",
    disposal:
      "Use an authorised electronics recycler that can handle screens and separate their components.",
    fact: "Screens need careful processing because some older display technologies contain hazardous substances.",
    icon: Monitor,
    color: "text-indigo-700",
  },
  {
    name: "Tablet",
    description: "A lightly used tablet that works but is no longer needed.",
    category: "reuse",
    disposal: "Erase personal data and donate it, or offer it through a trusted reuse programme.",
    fact: "Donating a working device can improve digital access while reducing e-waste.",
    icon: Tablet,
    color: "text-sky-700",
  },
  {
    name: "Fluorescent tube",
    description: "A spent tube light from a home or classroom.",
    category: "hazardous",
    disposal: "Keep it intact and use a lighting or hazardous-waste collection service.",
    fact: "Some fluorescent lamps contain mercury, so they should not be broken or placed in general waste.",
    icon: Lightbulb,
    color: "text-yellow-700",
  },
  {
    name: "Game console",
    description: "An older console that still turns on but is no longer played.",
    category: "reuse",
    disposal: "Reset it and donate or sell it so another player can enjoy it.",
    fact: "Repair and resale keep the materials and energy already invested in a device in use.",
    icon: Gamepad2,
    color: "text-fuchsia-700",
  },
  {
    name: "Power bank",
    description: "A portable charger with a failing internal battery.",
    category: "hazardous",
    disposal: "Do not put it in a bin or dismantle it; take it to a battery collection point.",
    fact: "Power banks use lithium-ion cells that need fire-safe collection and transport.",
    icon: Battery,
    color: "text-orange-700",
  },
  {
    name: "Smart watch",
    description: "A wearable device with a dead battery and a sealed body.",
    category: "recycle",
    disposal: "Send it to an e-waste recycler that accepts small devices and embedded batteries.",
    fact: "Small devices are easy to forget, yet millions of them add up to significant e-waste.",
    icon: Gauge,
    color: "text-rose-700",
  },
  {
    name: "Printer cartridge",
    description: "An empty ink cartridge from a home printer.",
    category: "recycle",
    disposal:
      "Return it through a cartridge take-back programme or an electronics collection point.",
    fact: "Many cartridges can be refilled or dismantled, keeping plastic and residual ink out of landfill.",
    icon: Upload,
    color: "text-teal-700",
  },
  {
    name: "Damaged USB cable",
    description: "A frayed cable that is no longer safe to use.",
    category: "recycle",
    disposal: "Collect it with other small electronics and take it to a certified recycler.",
    fact: "Cables contain copper, which can be recovered when they are processed properly.",
    icon: Zap,
    color: "text-lime-700",
  },
];

const shuffleItems = (items: ReadonlyArray<WasteItem>) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex]!, shuffled[index]!];
  }
  return shuffled;
};

export function EcoSortGame() {
  const [status, setStatus] = useState<GameStatus>("ready");
  const [items, setItems] = useState<WasteItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    bin: (typeof SORTING_BINS)[number];
  } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const feedbackTimer = useRef<number | null>(null);

  const currentItem = items[currentIndex];
  const answered = correct + incorrect;

  useEffect(() => {
    if (status !== "playing") return;
    const timer = window.setInterval(() => {
      setSecondsLeft((time) => {
        if (time <= 1) {
          setStatus("results");
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(
    () => () => {
      if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    },
    [],
  );

  const startGame = () => {
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    setItems(shuffleItems(WASTE_ITEMS));
    setCurrentIndex(0);
    setScore(0);
    setCorrect(0);
    setIncorrect(0);
    setSecondsLeft(60);
    setFeedback(null);
    setDragActive(false);
    setStatus("playing");
  };

  const pauseGame = () => setStatus((value) => (value === "playing" ? "paused" : "playing"));

  const sortItem = (binId: BinId) => {
    if (status !== "playing" || !currentItem || feedback) return;
    const bin = SORTING_BINS.find((entry) => entry.id === binId);
    if (!bin) return;
    const isCorrect = currentItem.category === binId;
    setFeedback({ correct: isCorrect, bin });
    if (isCorrect) {
      setCorrect((value) => value + 1);
      setScore((value) => value + 10);
    } else {
      setIncorrect((value) => value + 1);
    }
    feedbackTimer.current = window.setTimeout(() => {
      setFeedback(null);
      if (currentIndex >= items.length - 1) {
        setStatus("results");
      } else {
        setCurrentIndex((value) => value + 1);
      }
    }, 1100);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>, binId: BinId) => {
    event.preventDefault();
    setDragActive(false);
    sortItem(binId);
  };

  const accuracy = answered ? Math.round((correct / answered) * 100) : 0;

  return (
    <SiteLayout>
      <div className="hero-bg">
        <Section>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-3 py-1.5 text-sm font-semibold text-primary">
                <Gamepad2 className="size-4" />
                EcoSort challenge
              </div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
                Make the right bin your <span className="text-gradient-leaf">superpower.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Sort everyday electronics in 60 seconds. Drag on desktop or tap an item and choose a
                bin on your phone.
              </p>
            </div>
            <div className="relative hidden min-h-44 overflow-hidden rounded-[2rem] border border-primary/10 bg-secondary/60 p-6 sm:block">
              <div className="absolute -right-8 -top-8 size-40 rounded-full bg-leaf/30 blur-2xl" />
              <div className="absolute bottom-5 left-8 size-20 rounded-full bg-bloom/40 blur-2xl" />
              <Recycle className="absolute right-14 top-8 size-20 text-primary/20" />
              <LeafIllustration />
              <p className="relative max-w-xs text-sm font-medium text-secondary-foreground">
                Every careful choice keeps valuable materials in circulation.
              </p>
            </div>
          </div>
        </Section>
      </div>

      <Section>
        {status === "ready" && <ReadyScreen onStart={startGame} />}
        {status === "results" && (
          <ResultsScreen
            score={score}
            accuracy={accuracy}
            correct={correct}
            total={answered}
            onPlayAgain={startGame}
          />
        )}
        {(status === "playing" || status === "paused") && currentItem && (
          <div className="space-y-8">
            <div className="grid gap-3 sm:grid-cols-4">
              <Stat icon={Trophy} label="Score" value={`${score} pts`} />
              <Stat
                icon={Clock3}
                label="Time left"
                value={`${secondsLeft}s`}
                urgent={secondsLeft <= 10}
              />
              <Stat icon={Check} label="Correct" value={String(correct)} />
              <Stat icon={X} label="Incorrect" value={String(incorrect)} />
            </div>

            <Card className="overflow-hidden p-0">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 px-5 py-4 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-28 overflow-hidden rounded-full bg-secondary sm:w-48">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${(answered / items.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {Math.min(answered + 1, items.length)} of {items.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={startGame}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
                  >
                    <RotateCcw className="size-4" /> Restart
                  </button>
                  <button
                    type="button"
                    onClick={pauseGame}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
                  >
                    {status === "paused" ? (
                      <Play className="size-4" />
                    ) : (
                      <Pause className="size-4" />
                    )}
                    {status === "paused" ? "Resume" : "Pause"}
                  </button>
                </div>
              </div>

              <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div
                  draggable={status === "playing" && !feedback}
                  onDragStart={() => setDragActive(true)}
                  onDragEnd={() => setDragActive(false)}
                  className={`group relative flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-3xl bg-secondary/70 p-8 text-center transition-transform ${
                    dragActive ? "scale-[1.03] ring-4 ring-primary/20" : ""
                  } ${feedback ? (feedback.correct ? "bg-emerald-100/70" : "bg-amber-100/70") : ""}`}
                >
                  <div className="absolute -right-10 -top-10 size-36 rounded-full bg-white/50" />
                  <div className="relative grid size-28 place-items-center rounded-[2rem] bg-card shadow-soft transition-transform group-hover:-translate-y-1">
                    <currentItem.icon
                      className={`size-14 ${currentItem.color}`}
                      strokeWidth={1.6}
                    />
                  </div>
                  <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {status === "paused" ? "Game paused" : "Sort this item"}
                  </p>
                  <h2 className="relative mt-2 text-2xl font-bold">{currentItem.name}</h2>
                  <p className="relative mt-2 max-w-sm text-sm text-muted-foreground">
                    {currentItem.description}
                  </p>
                </div>

                <div>
                  {status === "paused" ? (
                    <div className="rounded-3xl border border-primary/20 bg-secondary/50 p-8 text-center">
                      <Pause className="mx-auto size-10 text-primary" />
                      <h3 className="mt-4 text-xl font-bold">Take a breath</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Your timer is paused. Resume when you are ready to keep sorting.
                      </p>
                      <button
                        type="button"
                        onClick={pauseGame}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
                      >
                        <Play className="size-4" /> Resume game
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold">Choose a destination</h3>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <CircleHelp className="size-3.5" /> Tap or drag
                        </span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {SORTING_BINS.map((bin) => {
                          const Icon = bin.icon;
                          return (
                            <button
                              key={bin.id}
                              type="button"
                              onClick={() => sortItem(bin.id)}
                              onDragOver={(event) => event.preventDefault()}
                              onDrop={(event) => handleDrop(event, bin.id)}
                              className="group flex min-h-24 items-center gap-3 rounded-2xl border border-border/80 bg-background p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              aria-label={`Sort into ${bin.label}`}
                            >
                              <span
                                className={`grid size-11 shrink-0 place-items-center rounded-xl text-white ${bin.color}`}
                              >
                                <Icon className="size-5" />
                              </span>
                              <span>
                                <span className="block text-sm font-bold">{bin.label}</span>
                                <span className="mt-1 block text-xs text-muted-foreground">
                                  {bin.hint}
                                </span>
                              </span>
                              <ChevronRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {feedback && (
                <div
                  className={`flex items-start gap-3 border-t px-5 py-4 sm:px-8 ${
                    feedback.correct
                      ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                      : "border-amber-200 bg-amber-50 text-amber-950"
                  }`}
                  role="status"
                >
                  {feedback.correct ? (
                    <Sparkles className="mt-0.5 size-5 shrink-0" />
                  ) : (
                    <CircleHelp className="mt-0.5 size-5 shrink-0" />
                  )}
                  <div className="text-sm">
                    <p className="font-bold">
                      {feedback.correct
                        ? "Great choice! +10 points"
                        : `Not quite — ${currentItem.name} belongs in ${SORTING_BINS.find((bin) => bin.id === currentItem.category)?.label}.`}
                    </p>
                    <p className="mt-1 leading-6">{currentItem.disposal}</p>
                    <p className="mt-1 font-medium opacity-80">Did you know? {currentItem.fact}</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </Section>

      <LearningSection />
    </SiteLayout>
  );
}

function ReadyScreen({ onStart }: { onStart: () => void }) {
  return (
    <Card className="relative overflow-hidden border-primary/20 bg-card/90 p-7 sm:p-10">
      <div className="absolute -right-16 -top-16 size-48 rounded-full bg-leaf/20 blur-3xl" />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Ready to play?
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Sort smart. Learn something new.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
            You have 60 seconds to sort 15 everyday items. Correct answers earn 10 points, and every
            answer comes with a practical disposal tip.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-secondary-foreground">
            <span className="rounded-full bg-secondary px-3 py-2">15 items</span>
            <span className="rounded-full bg-secondary px-3 py-2">60 seconds</span>
            <span className="rounded-full bg-secondary px-3 py-2">10 points each</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
        >
          <Play className="size-5 fill-current" /> Start Game
        </button>
      </div>
    </Card>
  );
}

function ResultsScreen({
  score,
  accuracy,
  correct,
  total,
  onPlayAgain,
}: {
  score: number;
  accuracy: number;
  correct: number;
  total: number;
  onPlayAgain: () => void;
}) {
  const badge =
    accuracy >= 85 ? "E-Waste Champion" : accuracy >= 60 ? "Sorting Seedling" : "Eco Explorer";
  return (
    <Card className="overflow-hidden border-primary/20 bg-card/95 p-0 text-center">
      <div className="bg-secondary/60 px-6 py-10 sm:px-10">
        <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-primary text-primary-foreground shadow-soft">
          <Trophy className="size-8" />
        </span>
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Challenge complete
        </p>
        <h2 className="mt-2 text-4xl font-bold sm:text-5xl">{score} points</h2>
        <p className="mt-2 text-muted-foreground">You earned the {badge} badge.</p>
      </div>
      <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
        <ResultStat label="Accuracy" value={`${accuracy}%`} />
        <ResultStat label="Correct answers" value={`${correct}/${total}`} />
        <ResultStat label="Items sorted" value={String(total)} />
      </div>
      <div className="border-t border-border/70 px-6 py-6">
        <button
          type="button"
          onClick={onPlayAgain}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          <RotateCcw className="size-4" /> Play Again
        </button>
      </div>
    </Card>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  urgent = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  urgent?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-sm ${urgent ? "border-amber-300 bg-amber-50" : ""}`}
    >
      <Icon className={`size-5 ${urgent ? "text-amber-700" : "text-primary"}`} />
      <span>
        <span className="block text-xs font-medium text-muted-foreground">{label}</span>
        <span className="block font-bold">{value}</span>
      </span>
    </div>
  );
}

function ResultStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary/60 px-4 py-4">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function LearningSection() {
  return (
    <Section eyebrow="Keep learning" title="Small choices, big impact">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          [
            "01",
            "Reuse first",
            "Repair, share or donate working electronics before considering recycling.",
          ],
          [
            "02",
            "Never bin batteries",
            "Lithium and other batteries need separate collection to prevent fires and pollution.",
          ],
          [
            "03",
            "Use authorised recyclers",
            "Certified facilities protect workers and recover materials responsibly.",
          ],
        ].map(([number, title, text]) => (
          <Card key={number} className="bg-secondary/40">
            <span className="text-sm font-bold text-primary">{number}</span>
            <h3 className="mt-5 text-xl font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
          </Card>
        ))}
      </div>
      <div className="mt-8 rounded-3xl border border-primary/15 bg-primary/5 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <BookOpen className="size-5 text-primary" />
          <h3 className="text-xl font-bold">Did You Know?</h3>
        </div>
        <ul className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
          <li className="rounded-2xl bg-card/70 p-4">
            E-waste is one of the fastest-growing waste streams worldwide.
          </li>
          <li className="rounded-2xl bg-card/70 p-4">
            Responsible recycling can recover valuable metals and reduce mining pressure.
          </li>
          <li className="rounded-2xl bg-card/70 p-4">
            Deleting personal data is an important step before donating a device.
          </li>
          <li className="rounded-2xl bg-card/70 p-4">
            Keeping electronics in use longer is one of the simplest sustainability wins.
          </li>
        </ul>
      </div>
    </Section>
  );
}

function LeafIllustration() {
  return (
    <div className="relative mb-3 ml-auto flex w-fit items-end gap-1 text-primary/70">
      <span className="block h-10 w-5 rotate-[-28deg] rounded-[100%_0] bg-primary/40" />
      <span className="block h-14 w-7 rotate-[24deg] rounded-[100%_0] bg-primary/60" />
      <span className="absolute bottom-0 left-1/2 h-12 w-1 -translate-x-1/2 rotate-[12deg] rounded-full bg-primary/60" />
    </div>
  );
}
