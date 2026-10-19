import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Code2 } from 'lucide-react';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: Code2,
      title: '50+ Projects',
      description: 'Successfully delivered across web development and data analysis',
    },
    {
      icon: Briefcase,
      title: '8+ Years',
      description: 'Professional experience in full-stack development',
    },
    {
      icon: Award,
      title: 'Certified',
      description: 'Data Analyst certification with proven expertise',
    },
    {
      icon: GraduationCap,
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and methodologies',
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate developer and analyst combining creativity with data-driven insights
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="prose prose-lg">
              <p className="text-muted-foreground leading-relaxed">
                I'm a Full Stack Developer and Certified Data Analyst with a passion for creating innovative
                digital solutions. My journey in tech started with a curiosity about how things work, which
                evolved into a career building scalable applications and extracting meaningful insights from
                data.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With expertise spanning modern web technologies and data analysis tools, I bridge the gap
                between user experience and data-driven decision making. I believe in writing clean,
                maintainable code and creating solutions that not only work but make a real impact.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source
                projects, or sharing knowledge with the developer community.
              </p>
            </div>
          </motion.div>

          {/* Right Content - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:card-glow group"
              >
                <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
