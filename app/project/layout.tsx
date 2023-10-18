type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <div className="rounded-[0.5rem] w-full px-12">{children}</div>;
}
