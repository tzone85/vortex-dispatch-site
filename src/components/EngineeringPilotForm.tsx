import { useRef, useState, type FormEvent } from "react";
import { getFirstTouchAttribution } from "../core/attribution";
import {
  trackEngineeringPilotError,
  trackEngineeringPilotLead,
  trackEngineeringPilotStart,
} from "../core/analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";

type ApiResult = {
  ok?: boolean;
  ignored?: boolean;
  error?: string;
  code?: string;
};

const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-void/65 px-4 py-3 text-bone outline-none transition placeholder:text-bone-dim focus:border-accent focus:ring-1 focus:ring-accent";

export function EngineeringPilotForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const startedTracked = useRef(false);
  const formStartedAt = useRef(Date.now());

  const markStarted = () => {
    if (startedTracked.current) return;
    startedTracked.current = true;
    trackEngineeringPilotStart();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();

    try {
      const response = await fetch("/api/engineering-pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          email: value("email"),
          company: value("company"),
          role: value("role"),
          stack: value("stack"),
          pilotGoal: value("pilotGoal"),
          message: value("message"),
          website: value("website"),
          formStartedAt: formStartedAt.current,
          attribution: getFirstTouchAttribution(),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as ApiResult;

      if (!response.ok || !result.ok || result.ignored) {
        const code = result.code ?? `http_${response.status}`;
        trackEngineeringPilotError(code);
        setErrorMessage(
          result.error ??
            "We could not submit the enquiry. Please email hello@vortexdispatch.co.za.",
        );
        setStatus("error");
        return;
      }

      trackEngineeringPilotLead();
      setStatus("success");
      form.reset();
      formStartedAt.current = Date.now();
    } catch {
      trackEngineeringPilotError("network_error");
      setErrorMessage(
        "We could not reach the lead service. Please email hello@vortexdispatch.co.za.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        id="pilot-form"
        className="rounded-2xl border border-accent/40 bg-panel/30 p-7 sm:p-9"
        aria-live="polite"
      >
        <p className="mono-meta text-accent-bright">ENQUIRY RECEIVED</p>
        <h2 className="mt-4 font-display text-3xl font-bold text-bone">
          Thanks. We have your pilot brief.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-bone-muted">
          We&apos;ll review the repository context, ticket shape and engineering controls you described before replying. No need to send source code or credentials through this form.
        </p>
      </div>
    );
  }

  return (
    <form
      id="pilot-form"
      className="rounded-2xl border border-line bg-panel/25 p-6 sm:p-8"
      onSubmit={handleSubmit}
      onFocusCapture={markStarted}
    >
      <div className="mb-8">
        <p className="mono-meta text-accent-bright">PILOT INTAKE</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-bone sm:text-4xl">
          Tell us what you want to test.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-bone-muted">
          Give us enough context to judge whether 3–5 real tickets will make a useful pilot. Please do not paste source code, credentials, customer data or other secrets here.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-bone-muted">
          Name <span className="text-accent-bright">*</span>
          <input
            className={inputClass}
            name="name"
            autoComplete="name"
            maxLength={120}
            required
          />
        </label>

        <label className="text-sm text-bone-muted">
          Work email <span className="text-accent-bright">*</span>
          <input
            className={inputClass}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            maxLength={254}
            required
          />
        </label>

        <label className="text-sm text-bone-muted">
          Company <span className="text-accent-bright">*</span>
          <input
            className={inputClass}
            name="company"
            autoComplete="organization"
            maxLength={160}
            required
          />
        </label>

        <label className="text-sm text-bone-muted">
          Role <span className="text-accent-bright">*</span>
          <input
            className={inputClass}
            name="role"
            autoComplete="organization-title"
            placeholder="CTO, Engineering Manager, Founder..."
            maxLength={160}
            required
          />
        </label>
      </div>

      <label className="mt-5 block text-sm text-bone-muted">
        Stack / repository context
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          name="stack"
          maxLength={800}
          placeholder="For example: Java 21 + React, ~20 services, GitHub Actions, good automated test coverage."
        />
      </label>

      <label className="mt-5 block text-sm text-bone-muted">
        What do you want the pilot to prove? <span className="text-accent-bright">*</span>
        <textarea
          className={`${inputClass} min-h-32 resize-y`}
          name="pilotGoal"
          maxLength={2400}
          placeholder="Describe the kind of 3–5 tickets you have in mind and what would make the pilot useful to your team."
          required
        />
      </label>

      <label className="mt-5 block text-sm text-bone-muted">
        Anything else we should know?
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          name="message"
          maxLength={4000}
          placeholder="Security constraints, review requirements, delivery expectations, timing..."
        />
      </label>

      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-6 text-bone-dim">
          By submitting, you agree that Vortex Dispatch may use these details to respond to your enquiry. See our <a className="underline hover:text-accent-bright" href="/privacy">Privacy Policy</a>.
        </p>
        <button
          type="submit"
          className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Request the pilot"}
        </button>
      </div>

      {status === "error" ? (
        <p className="mt-5 rounded-xl border border-accent/30 bg-void/60 px-4 py-3 text-sm text-bone-muted" role="alert">
          {errorMessage}{" "}
          <a className="text-accent-bright underline" href="mailto:hello@vortexdispatch.co.za">
            Email us instead
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
