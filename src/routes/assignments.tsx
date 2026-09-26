import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowUpRight, Download, FileCode2, FileText, FileImage, FileType2, Trash2, UploadCloud } from "lucide-react";
import { SiteLayout, Section, Card } from "@/components/SiteLayout";


const ASSIGNMENT_FILES = [
  {
    title: "E-Waste Data Analysis Challenge",
    description: "India e-waste analysis notebook and interactive dashboard.",
    files: [
      {
        file: "global_ewaste_india_analysis_EWEM.ipynb",
        path: "/assignments/global_ewaste_india_analysis_EWEM.ipynb",
        label: "Jupyter Notebook",
      },
      {
        file: "ewaste_dashboard.html",
        path: "/assignments/ewaste_dashboard.html",
        label: "Interactive Dashboard",
      },
    ],
  },
  {
    title: "Crossword",
    description: "PDF document ready to view and download.",
    files: [{ file: "Crossword.pdf", path: "/assignments/Crossword.pdf", label: "PDF document" }],
  },
  {
    title: "Sustainability Pledge",
    description: "PDF document ready to view and download.",
    files: [{ file: "Sustainability Pledge.pdf", path: "/assignments/Sustainability%20Pledge.pdf", label: "PDF document" }],
  },
  {
    title: "C Footprint Calculator",
    description: "PDF document ready to view and download.",
    files: [{ file: "C-footprint_calculator.pdf", path: "/assignments/C-footprint_calculator.pdf", label: "PDF document" }],
  },
  {
    title: "Device anatomy",
    description: "PDF document ready to view and download.",
    files: [{ file: "Device anatomy.pdf", path: "/assignments/Device%20anatomy.pdf", label: "PDF document" }],
  },
  {
    title: "Clean Kerala Waste Model",
    description: "PDF document ready to view and download.",
    files: [
      {
        file: "Clean Kerala Waste Model_20260923_142018_0000.pdf",
        path: "/assignments/clean-kerala-waste-model.pdf",
        label: "PDF document",
      },
    ],
  },
  {
    title: "Kerala Waste Company Report",
    description: "PDF document ready to view and download.",
    files: [
      {
        file: "Kerala Waste Company Report .pdf",
        path: "/assignments/kerala-waste-company-report.pdf",
        label: "PDF document",
      },
    ],
  },
  {
    title: "Kerala Waste Reference Image",
    description: "Image ready to view and download.",
    files: [
      {
        file: "WhatsApp Image 2026-09-23 at 2.54.44 PM.jpeg",
        path: "/assignments/kerala-waste-reference.jpeg",
        label: "JPEG image",
      },
    ],
  },
  {
    title: "Video Activity",
    description: "Video activity assignment.",
    files: [],
  },
];

export const Route = createFileRoute("/assignments")({
  head: () => ({
    meta: [
      { title: "Upload Assignments · PDFs, Docs & Images" },
      {
        name: "description",
        content:
          "Upload your assignments as PDF, Word documents or images.",
      },
      { property: "og:title", content: "Upload Assignments · E-Waste Portfolio" },
      {
        property: "og:description",
        content: "Upload your assignments as PDF, Word documents or images.",
      },
    ],
  }),
  component: AssignmentsPage,
});

const ACCEPT =
  ".pdf,.doc,.docx,.ipynb,.html,.png,.jpg,.jpeg,.webp,.gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/x-ipynb+json,text/html,image/*";

type Upload = {
  id: string;
  name: string;
  size: number;
  kind: "pdf" | "doc" | "notebook" | "html" | "image" | "other";
  url?: string;
};

function kindOf(file: File): Upload["kind"] {
  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"))
    return "pdf";
  if (file.name.toLowerCase().endsWith(".ipynb")) return "notebook";
  if (file.type === "text/html" || file.name.toLowerCase().endsWith(".html")) return "html";
  if (/\.(docx?|odt)$/i.test(file.name) || file.type.includes("word")) return "doc";
  return "other";
}

function prettySize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function AssignmentsPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const next: Upload[] = [];
    let rejected = 0;
    for (const file of Array.from(files)) {
      const kind = kindOf(file);
      if (kind === "other") {
        rejected += 1;
        continue;
      }
      next.push({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        kind,
        url: URL.createObjectURL(file),
      });
    }
    setError(
      rejected > 0
        ? "Some files were skipped — only PDF, Word documents, notebooks, HTML files and images are accepted."
        : null,
    );
    if (next.length) setUploads((prev) => [...next, ...prev]);
  }

  function remove(id: string) {
    setUploads((prev) => {
      const target = prev.find((u) => u.id === id);
      if (target?.url) URL.revokeObjectURL(target.url);
      return prev.filter((u) => u.id !== id);
    });
  }

  return (
    <SiteLayout>
      <div className="hero-bg">
        <Section eyebrow="⬆️ Upload" title="Add your assignment files">
        <p className="-mt-4 mb-6 text-sm text-muted-foreground">
          Accepted formats: PDF, Word documents, Jupyter notebooks (.ipynb), HTML
          files and images. Files stay on this device in your current session.
        </p>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          className={`rounded-3xl border-2 border-dashed p-10 text-center transition-colors ${
            dragging ? "border-primary bg-secondary/60" : "border-border bg-card"
          }`}
        >
          <UploadCloud className="mx-auto size-10 text-primary" />
          <p className="mt-4 font-display text-lg font-semibold">
            Drag &amp; drop files here
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            or choose them from your device
          </p>
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <UploadCloud className="size-4" /> Choose files
          </button>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ACCEPT}
            className="hidden"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        {error && (
          <p className="mt-4 text-sm font-medium text-destructive">{error}</p>
        )}

        {uploads.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uploads.map((u) => (
              <Card key={u.id} className="flex flex-col gap-3">
                {u.kind === "image" ? (
                  <img
                    src={u.url}
                    alt={u.name}
                    className="h-40 w-full rounded-2xl border border-border/70 object-cover"
                  />
                ) : (
                  <div className="grid h-40 w-full place-items-center rounded-2xl bg-secondary/60">
                    {u.kind === "pdf" ? (
                      <FileText className="size-10 text-primary" />
                    ) : u.kind === "notebook" || u.kind === "html" ? (
                      <FileCode2 className="size-10 text-primary" />
                    ) : (
                      <FileType2 className="size-10 text-primary" />
                    )}
                  </div>
                )}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {u.kind.toUpperCase()} · {prettySize(u.size)}
                    </p>
                  </div>
                  <button
                    onClick={() => remove(u.id)}
                    aria-label={`Remove ${u.name}`}
                    className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <a
                  href={u.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Open preview →
                </a>
              </Card>
            ))}
          </div>
        )}

        {uploads.length === 0 && (
          <Card className="mt-8 flex items-center gap-3 bg-secondary/50 text-sm text-muted-foreground">
            <FileImage className="size-5 text-primary" />
            No files added yet — your uploaded assignments will appear here.
          </Card>
        )}

        <div className="mt-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Available assignments
              </p>
              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                Preview or download your assignment PDFs
              </h3>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ASSIGNMENT_FILES.map((assignment) => (
              <Card key={assignment.title} className="flex h-full flex-col justify-between gap-6">
                <div>
                  <div className="grid h-32 w-full place-items-center rounded-3xl bg-secondary/60">
                    <FileText className="size-10 text-primary" />
                  </div>
                  <p className="mt-5 text-lg font-semibold">{assignment.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{assignment.description}</p>
                </div>

                <div className="grid gap-3">
                  {assignment.files.map((file) => (
                    <div key={file.file} className="grid gap-2 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                      <span className="min-w-0 truncate text-sm font-medium" title={file.file}>
                        {file.label}
                      </span>
                      <a
                        href={file.path}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:text-primary-foreground"
                      >
                        <ArrowUpRight className="size-4" /> View
                      </a>
                      <a
                        href={file.path}
                        download={file.file}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                      >
                        <Download className="size-4" /> Download
                      </a>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      </div>
    </SiteLayout>
  );
}
