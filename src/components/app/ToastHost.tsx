import { useDemo } from '../../context/DemoContext'
import Icon from './Icon'

export default function ToastHost() {
  const { toasts, dismissToast } = useDemo()
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4 lg:bottom-8"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-full bg-ink py-2.5 pl-4 pr-2 text-sm font-medium text-paper shadow-lg animate-rise"
        >
          <Icon name="check" className="size-4 text-volt" />
          <span>{t.message}</span>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            className="flex size-7 items-center justify-center rounded-full text-paper/60 hover:bg-paper/10 hover:text-paper"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  )
}
