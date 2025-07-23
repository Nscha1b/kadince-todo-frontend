import classNames from "classnames";

interface TapeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Tape({ children, className }: TapeProps) {
    return (
        <div
            className={classNames(
                "inline-block bg-white/18 backdrop-blur-sm border border-white/20 rounded-sm px-2 py-1 shadow-inner shadow-white/20 text-foreground",
                className
            )}
            style={{
                clipPath: `
                    polygon(
                        10% 0%, 0% 5%, 10% 10%, 0% 15%, 10% 20%, 0% 25%, 10% 30%, 0% 35%, 10% 40%, 0% 45%,
                        10% 50%, 0% 55%, 10% 60%, 0% 65%, 10% 70%, 0% 75%, 10% 80%, 0% 85%, 10% 90%, 0% 95%,
                        10% 100%,

                        90% 100%, 100% 95%, 90% 90%, 100% 85%, 90% 80%, 100% 75%, 90% 70%, 100% 65%, 90% 60%, 100% 55%,
                        90% 50%, 100% 45%, 90% 40%, 100% 35%, 90% 30%, 100% 25%, 90% 20%, 100% 15%, 90% 10%, 100% 5%,
                        90% 0%
                    )
                `,
            }}
        >
            {children}
        </div>
    );
}
