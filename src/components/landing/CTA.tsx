"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 bg-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 opacity-30" />
            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                    Ready to scale your gym?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Join thousands of gym owners who trust FitCore to power their business.
                </p>
                <Button size="lg" className="h-14 px-8 text-lg bg-white text-gray-900 hover:bg-gray-100">
                    Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </section>
    );
}
