"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Owner, Flex Fitness",
        avatar: "/avatars/01.png",
        content: "FitCore transformed how we handle memberships. The automation saved us 20 hours a week! It allows me to focus on what really matters - my clients.",
    },
    {
        name: "Mike Chen",
        role: "Head Trainer, Iron Gym",
        avatar: "/avatars/02.png",
        content: "The workout tracking features are incredible. My clients love seeing their progress in the app, and retention has improved by 25% since we switched.",
    },
    {
        name: "Jessica Williams",
        role: "Manager, Pulse Studio",
        avatar: "/avatars/03.png",
        content: "Best investment we made this year. The revenue analytics helped us identify our most profitable classes and optimize our schedule for maximum growth.",
    },
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 bg-secondary/30 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                        Loved by <span className="text-gradient">gym owners</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Join hundreds of fitness businesses already growing with FitCore.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-background border border-border hover:border-primary/20 transition-all hover:shadow-xl hover:-translate-y-1 group relative"
                        >
                            <Quote className="absolute top-8 right-8 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

                            <div className="flex items-center gap-4 mb-6">
                                <Avatar className="h-12 w-12 border-2 border-background ring-2 ring-primary/10">
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                    <AvatarFallback className="bg-primary/5 text-primary font-bold">{testimonial.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-bold text-foreground">{testimonial.name}</div>
                                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
