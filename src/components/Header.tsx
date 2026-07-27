import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const SUMMARY =
`I've always had mixed feelings watching 'I built GPT from scratch' tutorials. Coming from a pretty different background, I didn't understand half the jargon. So instead of frontloading it and coding along blindly, I decided to build my own inference engine. In plain terms, a transformer written in C with a FastAPI layer on top for serving it. This devlog is my daily progress, from brushing up on C to going down the PyTorch and ML math rabbit-hole.`
export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-copy">
        <p className="eyebrow">development log</p>
        <h1>tinyc-llm</h1>
        <p className="subtitle">{SUMMARY}</p>
      </div>
      <div className="header-actions">
        <span className="status-pill">Read-only</span>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}