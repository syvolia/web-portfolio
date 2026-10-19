import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const titles = ['Full Stack Developer', 'Certified Data Analyst', 'Problem Solver'];
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-teal/5 to-accent/5 -z-10" />
      
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Hi, I'm <span className="gradient-text">Syvolia Mary</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-12 sm:h-14"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary">
                {titles[currentTitle]}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl"
            >
              Building reliable, production-grade web applications end to end — from database design and APIs to interfaces people actually enjoy using.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                onClick={() => handleScroll('#projects')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground group"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleScroll('#contact')}
                className="border-primary text-primary hover:bg-primary/10"
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Code Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-teal opacity-20 blur-3xl rounded-full" />
              <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl card-glow">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-teal" />
                  <span className="ml-auto text-xs text-muted-foreground">portfolio.tsx</span>
                </div>
                
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-start gap-2">
                    <Code2 className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-muted-foreground">
                        <span className="text-accent">const</span>{' '}
                        <span className="text-foreground">skills</span> ={' '}
                        <span className="text-teal">{'{'}</span>
                      </p>
                      <p className="text-muted-foreground pl-4">
                        frontend: <span className="text-primary">['React', 'TypeScript']</span>,
                      </p>
                      <p className="text-muted-foreground pl-4">
                        backend: <span className="text-primary">['Node.js', 'Python']</span>,
                      </p>
                      <p className="text-muted-foreground">
                        <span className="text-teal">{'}'}</span>;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <Database className="h-5 w-5 text-teal mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-muted-foreground">
                        <span className="text-accent">const</span>{' '}
                        <span className="text-foreground">databases</span> ={' '}
                        <span className="text-primary">['MongoDB', 'MySQL']</span>;
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-muted-foreground">
                      <span className="text-accent">export</span>{' '}
                      <span className="text-foreground">default</span>{' '}
                      <span className="text-primary">FullStackDeveloper</span>;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
