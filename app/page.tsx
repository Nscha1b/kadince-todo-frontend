import Image from "next/image";
import { StickyNote } from "@/components/sticky-note";
import { LoginForm } from "@/components/login/login-form";

export default function Home() {
    return (
        <div className="flex w-full flex-col">
            <h1 className="pt-10 text-5xl md:text-7xl font-sans font-bold text-foreground text-center">
                A Whole Latte To{"\u2011"}Do!
            </h1>
            <div className="flex flex-col md:flex-row gap-14 justify-center items-stretch mt-12 px-8">
                <div className="flex-1 flex flex-col justify-center lg:items-end items-center">
                    <StickyNote>
                        <LoginForm />
                    </StickyNote>

                </div>
                <div className="flex-1 flex flex-col justify-center lg:items-start items-center">
                    <StickyNote className="rotate-[6deg]" color="accent" folded={true}>
                        <h1 className="text-2xl font-bold">Stay Organized</h1>
                        <p className="text-muted">Make tasks stick — without the mess.</p>
                        <button className="bg-primary hover:bg-secondary text-white px-4 py-2 mt-4 rounded">
                            Get Started
                        </button>
                    </StickyNote>
                </div>
            </div>
        </div>
    )
}
