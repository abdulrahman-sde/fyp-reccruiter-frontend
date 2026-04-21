type AuthFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
};

export function AuthField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
}: AuthFieldProps) {
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-11 rounded-2xl border border-white/10 bg-white/4 px-4 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition-colors focus:border-emerald-300/45 focus:bg-white/6"
      />
    </label>
  );
}