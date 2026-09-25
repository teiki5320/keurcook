import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Administration", template: "%s | Administration" },
  robots: { index: false, follow: false },
};

/** L'admin reprend le thème sombre « Braise » du site (couleurs remappées par nuage.css). */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="nuage-theme min-h-dvh text-[#fbeee2]" style={{ fontFamily: "var(--font-manrope), sans-serif", background: "#140a07" }}>
      {children}
    </div>
  );
}
