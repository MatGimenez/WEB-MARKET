export function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm border
            ${cat === active ? "bg-black text-white" : "bg-white"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
