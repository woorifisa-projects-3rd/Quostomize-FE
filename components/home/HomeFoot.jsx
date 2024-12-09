"use client";

import MyFullButton from '../button/full-button';
import FadeInSection from "../fade-in/fade-in-section";
import confetti from 'canvas-confetti';
import { useEffect, useRef } from "react";

const shootConfetti = () => {
    confetti({
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
        particleCount: 40,
        scalar: 1.0,
        shapes: ['star']
    });

    confetti({
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
        particleCount: 10,
        scalar: 0.5,
        shapes: ['circle']
    });
};

const HomeFoot = () => {
    const bodyRef = useRef(null);

    useEffect(() => {
        if (!bodyRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    shootConfetti();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(bodyRef.current);

        return () => {
            if (bodyRef.current) {
                observer.unobserve(bodyRef.current);
            }
        };
    }, []);

    return (
            <FadeInSection>
                <div ref={bodyRef} className="flex justify-center">
                    <MyFullButton href='/create-card'>카드 만들기</MyFullButton>
                </div>
            </FadeInSection>
    );
};

export default HomeFoot;