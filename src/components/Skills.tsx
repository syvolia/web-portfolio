import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Server, Database, BarChart3 } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

const skills: Skill[] = [
  { name: 'React', level: 95, category: 'Frontend', icon: Code2 },
  { name: 'TypeScript', level: 90, category: 'Frontend', icon: Code2 },
  { name: 'Tailwind CSS', level: 92, category: 'Frontend', icon: Code2 },
  { name: 'Node.js', level: 88, category: 'Backend', icon: Server },
  { name: 'Python', level: 85, category: 'Backend', icon: Server },
  { name: 'MongoDB', level: 82, category: 'Database', icon: Database },
  { name: 'MySQL', level: 80, category: 'Database', icon: Database },
  { name: 'PostgreSQL', level: 78, category: 'Database', icon: Database },
  { name: 'Pandas', level: 88, category: 'Data Analysis', icon: BarChart3 },
  { name: 'NumPy', level: 85, category: 'Data Analysis', icon: BarChart3 },
  { name: 'Data Visualization', level: 90, category: 'Data Analysis', icon: BarChart3 },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Frontend':
      return 'text-primary';
    case 'Backend':
      return 'text-green';
    case 'Database':
      return 'text-purple';
    default:
      return 'text-primary';
  }
};

const getCategoryBgColor = (category: string) => {
  switch (category) {
    case 'Frontend':
      return 'bg-primary';
    case 'Backend':
      return 'bg-green';
    case 'Database':
      return 'bg-purple';
    default:
      return 'bg-primary';
  }
};

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Icon = skill.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group"
    >
      <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:card-glow hover:scale-105">
        {/* Progress Circle */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
              animate={
                isInView
                  ? { strokeDashoffset: 2 * Math.PI * 56 * (1 - skill.level / 100) }
                  : { strokeDashoffset: 2 * Math.PI * 56 }
              }
              transition={{ delay: index * 0.1 + 0.2, duration: 1, ease: 'easeOut' }}
              className={getCategoryColor(skill.category)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Icon className={`w-6 h-6 mb-1 ${getCategoryColor(skill.category)}`} />
            <span className="text-xl font-bold text-foreground">{skill.level}%</span>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-base font-semibold text-foreground mb-2">{skill.name}</h3>
          <span className={`inline-block px-3 py-1 text-xs font-medium ${getCategoryBgColor(skill.category)}/10 ${getCategoryColor(skill.category)} rounded-full`}>
            {skill.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across multiple domains
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap gap-2 justify-center">
            {['Frontend', 'Backend', 'Database', 'Data Analysis'].map((category) => (
              <div
                key={category}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full"
              >
                <div className={`w-3 h-3 rounded-full ${getCategoryBgColor(category)}`} />
                <span className="text-sm font-medium text-foreground">{category}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
