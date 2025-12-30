import { HeroSection } from "./components/hero-section";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <HeroSection />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}
