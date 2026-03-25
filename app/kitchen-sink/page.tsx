export default function KitchenSinkPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f5", padding: "40px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#18181b", marginBottom: 8 }}>
        Kitchen Sink
      </h1>
      <p style={{ fontSize: 14, color: "#71717a", marginBottom: 40 }}>
        Internal UI component preview for the sandbox chat panel.
      </p>

      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        {/* ── Full chat panel mock ── */}
        <Section title="Chat Panel (expanded)">
          <ChatPanelMock collapsed={false} />
        </Section>

        <Section title="Chat Panel (collapsed)">
          <div style={{ display: "flex", gap: 16 }}>
            <div
              style={{
                width: 0,
                height: 500,
                borderLeft: "none",
                background: "#fff",
                transition: "width 0.25s ease",
                overflow: "hidden",
                opacity: 0,
                borderRadius: 0,
              }}
            />
            <div style={{ fontSize: 13, color: "#71717a", alignSelf: "center" }}>
              Panel is collapsed (width: 0, opacity: 0)
            </div>
          </div>
        </Section>

        {/* ── Individual components ── */}
        <Section title="Message Bubbles">
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 340 }}>
            <MessageBubble role="user" text="Make the navbar background blue" />
            <MessageBubble role="assistant" text="Done — changed: src/components/Navbar.tsx" />
            <MessageBubble role="user" text="Also add a dropdown menu to the user avatar" />
            <MessageBubble
              role="assistant"
              text="Done — changed: src/components/Navbar.tsx, src/components/UserMenu.tsx"
            />
          </div>
        </Section>

        <Section title="Input Pill">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <InputPillMock disabled={false} placeholder="Describe a change…" />
            <InputPillMock disabled={true} placeholder="Describe a change…" />
          </div>
        </Section>

        <Section title="Send Button States">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <SendButton disabled={false} />
            <span style={{ fontSize: 12, color: "#71717a" }}>Enabled</span>
            <SendButton disabled={true} />
            <span style={{ fontSize: 12, color: "#71717a" }}>Disabled</span>
          </div>
        </Section>

        <Section title="Submit PR Section">
          <SubmitSectionMock />
        </Section>

        <Section title="Status Line">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <StatusLine text="Initialising…" />
            <StatusLine text="Ready — the app is running live. Describe a change below." />
            <StatusLine text="Applying changes…" />
            <StatusLine text="Changes applied. Review the app above, then submit your PR." />
          </div>
        </Section>
      </div>
    </div>
  )
}

/* ── Helper components ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 14, fontWeight: 600, color: "#18181b", marginBottom: 12 }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function MessageBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isUser = role === "user"
  return (
    <div
      style={{
        padding: "10px 14px",
        fontSize: 13,
        lineHeight: 1.5,
        maxWidth: "88%",
        background: isUser ? "#18181b" : "#f4f4f5",
        color: isUser ? "#fff" : "#18181b",
        alignSelf: isUser ? "flex-end" : "flex-start",
        borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
      }}
    >
      {text}
    </div>
  )
}

function SendButton({ disabled }: { disabled: boolean }) {
  return (
    <button
      disabled={disabled}
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: disabled ? "#e4e4e7" : "#18181b",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 13V3M8 3L3 8M8 3L13 8"
          stroke={disabled ? "#a1a1aa" : "#fff"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

function InputPillMock({ disabled, placeholder }: { disabled: boolean; placeholder: string }) {
  return (
    <div
      style={{
        width: 340,
        border: "1px solid #e4e4e7",
        borderRadius: 18,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        minHeight: 104,
        display: "flex",
        flexDirection: "column",
        background: "#fff",
      }}
    >
      <textarea
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        readOnly
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "none",
          resize: "none",
          padding: "16px 16px 8px",
          fontSize: 13,
          fontFamily: "inherit",
          lineHeight: 1.5,
          color: "#18181b",
          opacity: disabled ? 0.5 : 1,
        }}
      />
      <div style={{ alignSelf: "flex-end", margin: "0 12px 12px 0" }}>
        <SendButton disabled={disabled} />
      </div>
    </div>
  )
}

function SubmitSectionMock() {
  return (
    <div
      style={{
        borderTop: "1px solid #f4f4f5",
        padding: 12,
        display: "flex",
        gap: 8,
        alignItems: "center",
        background: "#fff",
        borderRadius: 8,
        width: 340,
      }}
    >
      <input
        type="email"
        placeholder="Your email"
        readOnly
        style={{
          flex: 1,
          border: "1px solid #e4e4e7",
          borderRadius: 10,
          padding: "7px 11px",
          fontSize: 13,
          fontFamily: "inherit",
          outline: "none",
        }}
      />
      <input
        type="number"
        placeholder="Bounty (pts)"
        readOnly
        style={{
          width: 110,
          border: "1px solid #e4e4e7",
          borderRadius: 10,
          padding: "7px 11px",
          fontSize: 13,
          fontFamily: "inherit",
          outline: "none",
        }}
      />
      <button
        style={{
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "8px 16px",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Submit PR →
      </button>
    </div>
  )
}

function StatusLine({ text }: { text: string }) {
  return (
    <div style={{ padding: "6px 16px", fontSize: 11, color: "#a1a1aa", textAlign: "center" }}>
      {text}
    </div>
  )
}

function ChatPanelMock({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      style={{
        width: collapsed ? 0 : 380,
        height: 600,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        borderLeft: collapsed ? "none" : "1px solid #e4e4e7",
        background: "#fff",
        overflow: "hidden",
        opacity: collapsed ? 0 : 1,
        borderRadius: 8,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* Panel header */}
      <div
        style={{
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          borderBottom: "1px solid #e4e4e7",
          flexShrink: 0,
          fontSize: 13,
          fontWeight: 600,
          color: "#18181b",
        }}
      >
        <span>Chat</span>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            opacity: 0.5,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 3L9 7L5 11"
              stroke="#71717a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <MessageBubble role="user" text="Make the navbar background blue" />
        <MessageBubble role="assistant" text="Done — changed: src/components/Navbar.tsx" />
        <MessageBubble role="user" text="Also add a dropdown menu to the user avatar" />
        <MessageBubble
          role="assistant"
          text="Done — changed: src/components/Navbar.tsx, src/components/UserMenu.tsx"
        />
      </div>

      {/* Input pill */}
      <InputPillMock disabled={false} placeholder="Describe a change…" />

      {/* Submit section */}
      <SubmitSectionMock />

      {/* Status */}
      <StatusLine text="Changes applied. Review the app above, then submit your PR." />
    </div>
  )
}
