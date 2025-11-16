import { Header } from "@/components/main";
import { Pattern } from "@/components/ui";

export default function Wrapper({ children, title }: { children: React.ReactNode, title?: string }) {
  return (
    <>
        <Header />
      <Pattern>
        <main className="layout space-y-6 pt-[70px]">
           {title&& <h3 className="text-lg md:text-2xl font-space font-medium ">{title}</h3>}
            {children}
            </main>
      </Pattern>
    </>
  );
}
