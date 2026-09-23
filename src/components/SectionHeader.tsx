export function SectionHeader({ title, index }: { title: string; index: string }) {
  return (
    <div className="section-header">
      <h2 className="section-title" data-split="chars">{title}</h2>
      <p className="eyebrow" data-reveal>{index}</p>
      <div className="rule section-rule" data-rule />
    </div>
  );
}
