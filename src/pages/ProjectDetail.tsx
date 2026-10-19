import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Github, ListChecks, Lightbulb, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { getProjectById, projects } from '@/data/projects';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProjectById(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl font-bold text-foreground">Project not found</h1>
        <p className="text-muted-foreground">The project you are looking for does not exist.</p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/#projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 md:pt-32">
        {/* Header */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-primary mb-6 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {project.category}
              </Badge>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {project.year}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{project.description}</p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
              <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Source Code
                </a>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Hero Image */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
            <img src={project.image} alt={project.title} className="w-full max-h-[480px] object-cover" />
          </div>
        </motion.section>

        {/* Body */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-10"
            >
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
              </div>

              {/* Key Features */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ListChecks className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Key Features</h2>
                </div>
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Challenges & Solutions</h2>
                </div>
                <div className="space-y-4">
                  {project.challenges.map((challenge, i) => (
                    <div
                      key={i}
                      className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors"
                    >
                      <p className="text-muted-foreground leading-relaxed">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">My Role</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.role}</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">Details</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="text-foreground font-medium">{project.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Year</dt>
                    <dd className="text-foreground font-medium">{project.year}</dd>
                  </div>
                </dl>
              </div>
            </motion.aside>
          </div>
        </section>

        {/* Prev / Next navigation */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/projects/${prevProject.id}`)}
              className="h-auto py-4 justify-start border-border hover:border-primary/50 hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 mr-3 shrink-0" />
              <span className="text-left">
                <span className="block text-xs text-muted-foreground">Previous project</span>
                <span className="block font-medium text-foreground">{prevProject.title}</span>
              </span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/projects/${nextProject.id}`)}
              className="h-auto py-4 justify-end border-border hover:border-primary/50 hover:bg-primary/10"
            >
              <span className="text-right">
                <span className="block text-xs text-muted-foreground">Next project</span>
                <span className="block font-medium text-foreground">{nextProject.title}</span>
              </span>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Syvolia Mary. Built with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
