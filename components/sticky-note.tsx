import classNames from "classnames";

export function StickyNote({
    children,
    className,
    wrapperClassName,
    color = "surface",
    folded = false,
    center = false,
}: {
    children?: React.ReactNode;
    className?: string;
    wrapperClassName?: string;
    folded?: boolean;
    color?: "surface" | "primary" | "secondary" | "accent";
    center?: boolean;
}) {

    const colors = {
        surface: "bg-surface text-foreground",
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-foreground",
        accent: "bg-accent text-foreground",
    };

    const foldSize = 40;
    const foldClipPath = `polygon(0 0, 100% 0, 100% calc(100% - ${foldSize}px), calc(100% - ${foldSize}px) 100%, 0 100%)`;
    const foldStyles = {
        clipPath: `polygon(0 0, 100% 0, 100% calc(100% + ${foldSize}px), 0 calc(100% + ${foldSize}px))`,
        transform: "rotate(180deg)",
    };

    return (
        <div className={classNames(
            "flex",
            wrapperClassName
        )}>
            <div
                className={classNames(
                    "relative font-sans p-6 inline-block aspect-square shadow-md shadow-xl",
                    colors[color],
                    center ? "items-center content-center" : "",
                    className
                )}
                style={folded ? { clipPath: foldClipPath } : {}}
            >

                {children}

                {folded && (
                    <div
                        className={classNames(
                            "absolute bottom-0 right-0 w-[40px] h-[40px] bg-black/7",
                        )}
                        style={foldStyles}
                    />
                )}
            </div>
        </div>
    );
}