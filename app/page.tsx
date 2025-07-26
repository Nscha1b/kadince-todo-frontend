import { StickyNote } from "@/components/sticky-note";
import classNames from "classnames";
import { Tape } from "@/components/tape";
import { AuthForm } from "@/components/login/auth-form";

export default function Home() {
    const bulletPointCss = "relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[5px] before:h-[5px] before:bg-current before:rounded-full";

    return (
        <div className="flex w-full flex-col">
            <h1 className="pt-10 text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground text-center">
                A Whole Latte To{"\u2011"}Do!
            </h1>
            <div className="flex flex-col md:flex-row gap-14 justify-center items-stretch mt-12 px-2 lg:px-8">
                {/* LEFT COL */}
                <div className="flex-1 flex flex-col justify-center items-center lg:items-start">
                    <StickyNote center={true} className="w-full w-[350px] md:w-[400px] flex justify-center outline-2 outline-offset-2 outline-foreground flex-col">
                        <AuthForm />
                    </StickyNote>
                </div>
                {/* RIGHT COL */}
                <div className="flex-1 flex flex-col justify-center items-center lg:items-start">
                    <StickyNote className="rotate-[6deg] w-[300px]" color="accent" folded={true}>
                        <h2 className="text-5xl font-bold pb-2">Featuring</h2>
                        <ul className=" pl-5">
                            <Tape className="absolute top-45 left-32 pl-5 rotate-[26deg] z-10">
                                <li className={classNames(bulletPointCss, "text-xl")}>PDF Exports</li>
                            </Tape>
                            <StickyNote center={true} folded={true} className="!absolute top-25 left-5 h-[60px] w-[200px] p-2! rotate-[-8deg]">
                                <li className={bulletPointCss}>Task Management</li>
                            </StickyNote>
                            <StickyNote center={true} color="secondary" className="!absolute top-40 left-5 h-[60px] w-[100px] p-2! rotate-[-12deg]">
                                <li className={bulletPointCss}>Subtasks</li>
                            </StickyNote>
                            <StickyNote center={true} color="primary" className="!absolute top-53 left-5 h-[60px] w-[200px] p-2! rotate-[-8deg] !text-foreground">
                                <li className={bulletPointCss}>Priority Levels</li>
                            </StickyNote>
                        </ul>
                    </StickyNote>
                </div>
            </div>

            <div className="px-8">
                <h2 className="pt-10 text-4xl md:text-4xl font-sans font-bold text-foreground text-center md:text-left">
                    What our users say
                </h2>

                <div className="pt-10">
                    <div className="flex flex-col md:flex-row gap-14 justify-center items-stretch items-center">
                        <StickyNote center={true} color="secondary" className="h-[200px] w-[400px] rotate-[-4deg] !text-foreground" wrapperClassName="justify-center">
                            <p className="font-handwriting text-4xl lg:text-5xl">
                                I love the simple and intuitive design.
                            </p>
                        </StickyNote>
                        <StickyNote className="h-[200px] w-[200px] rotate-[14deg] !text-foreground" wrapperClassName="justify-center">
                            <div className="font-handwriting text-2xl">
                                <p className="font-handwriting text-2xl">
                                    Really, really great app!
                                </p>
                                <p className="absolute bottom-6">............Seriously.</p>
                            </div>
                        </StickyNote>
                    </div>
                </div>
                <div className="py-8">
                    <div className="flex flex-col md:flex-row gap-14 justify-center items-stretch items-center">
                        <StickyNote className=" !text-foreground" wrapperClassName="justify-center">
                            <div className="font-handwriting text-2xl">
                                <p className="font-handwriting text-7xl">
                                    SIGN UP!
                                </p>
                                <Tape className="!bg-white/38">
                                    <p className="text-center">
                                        <span className="px-5 text-center">what are you waiting for?</span>
                                    </p>
                                </Tape>
                            </div>
                        </StickyNote>
                    </div>
                </div>
            </div>
        </div>
    )
}
