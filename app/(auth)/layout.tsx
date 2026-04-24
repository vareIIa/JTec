import InteractiveBackground from "@/components/interactive-background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex grow flex-col">
      <InteractiveBackground />

      {children}
    </main>
  );
}
