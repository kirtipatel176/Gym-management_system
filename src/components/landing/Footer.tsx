import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Dumbbell } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-black py-16 border-t border-gray-100 dark:border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Dumbbell className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground">FitCore</span>
                        </Link>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            The modern operating system for forward-thinking fitness businesses.
                            Scale your gym with confidence.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-start-3">
                        <h3 className="font-bold text-foreground mb-6">Product</h3>
                        <ul className="space-y-4 text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Testimonials</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">API Docs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-foreground mb-6">Company</h3>
                        <ul className="space-y-4 text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <div>
                        &copy; {new Date().getFullYear()} FitCore. All rights reserved.
                    </div>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
