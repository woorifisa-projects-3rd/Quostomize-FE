'use client'


import { useInView } from "react-intersection-observer";

function FadeInSection({ children }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <div
            ref={ref}
            className={`w-full transition-all duration-700 ease-in-out transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            {children}
        </div>
    );
};

export default FadeInSection;