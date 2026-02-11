"use client";

import { motion } from "framer-motion";

const gyms = [
    "Iron Paradise",
    "MetroFlex",
    "Gold's Gym",
    "Anytime Fitness",
    "Equinox",
    "Planet Fitness",
];

export function TrustedBy() {
    return (
        <section className="py-20 bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
                    Trusted by top gyms worldwide
                </h2>
                <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {gyms.map((gym, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900"
                        >
                            {gym}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
