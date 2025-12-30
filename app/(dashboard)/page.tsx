export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 p-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-display-large font-bold text-on-surface">
          Material 3 Dashboard
        </h1>
        <p className="text-body-large text-on-surface-variant">
          Your modern, accessible, and dynamic workspace.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-secondary-container p-6 text-on-secondary-container transition-transform hover:scale-[1.02]">
          <h2 className="mb-2 text-headline-small font-semibold">Stats Overview</h2>
          <p className="text-body-medium opacity-80">
            Check your latest performance metrics and analytics.
          </p>
        </div>

        <div className="rounded-3xl bg-tertiary-container p-6 text-on-tertiary-container transition-transform hover:scale-[1.02]">
          <h2 className="mb-2 text-headline-small font-semibold">Recent Activity</h2>
          <p className="text-body-medium opacity-80">
            Review your latest code commits and project updates.
          </p>
        </div>
      </div>

      <button className="h-10 px-6 rounded-full bg-primary text-on-primary font-medium hover:opacity-90 transition-opacity">
        Get Started
      </button>
    </div>
  );
}
