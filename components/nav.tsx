export function Nav() {
  return (
    <nav aria-label="Main navigation" className="fixed top-0 w-full bg-zinc-50 z-50 border-b border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 gap-4">
        <a href="#main" className="text-base sm:text-xl font-bold whitespace-nowrap">Elias Pfeffer</a>
        <div className="flex items-center gap-4 sm:gap-8 text-sm sm:text-base">
          <a href="#projects" className="py-3 hover:underline">Projects</a>
          <a href="#contact" className="py-3 hover:underline">Contact</a>
        </div>
      </div>
    </nav>
  );
}
