export default function UtilityDock() {
  const chips = [
    'Volume',
    'Brightness',
    'Windows search',
    'Task view',
    'Show desktop',
    'App switcher',
    'Soft keyboard',
  ];

  return (
    <div className="dock" aria-label="Utility dock shortcuts">
      <b>Always in reach</b>
      {chips.map((chip) => (
        <span key={chip}>{chip}</span>
      ))}
    </div>
  );
}
