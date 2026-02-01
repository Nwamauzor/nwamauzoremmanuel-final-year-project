import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import uiLogo from "@/assets/ui-logo.png";
const History = () => {
  return <Layout>
      {/* Hero Banner */}
      <section className="relative py-24 lg:py-32 bg-gradient-sky overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="flex flex-col items-center text-center">
            <img alt="UI Logo" className="w-24 h-24 object-contain mb-6" src="/lovable-uploads/cf23c246-01cc-4cba-802f-6f65ffa20f33.png" />
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Computing UI History
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              A journey through the establishment and growth of computing education at the University of Ibadan
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="prose prose-lg max-w-none">
              <div className="space-y-8 text-muted-foreground">
                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    The Beginning
                  </h2>
                  <p className="leading-relaxed">
                    The Faculty of Computing at the University of Ibadan represents a significant milestone in the advancement of computing education in Nigeria. Established to address the growing demand for skilled computing professionals in the country and beyond, the faculty has grown to become one of the premier institutions for computing education in West Africa.
                  </p>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Early Development
                  </h2>
                  <p className="leading-relaxed">
                    Computing education at the University of Ibadan has its roots in the early adoption of computer technology in Nigerian universities. What began as a small department within the Faculty of Science has evolved into a full-fledged faculty with multiple specialized departments, each focusing on different aspects of computing and information technology.
                  </p>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Expansion and Growth
                  </h2>
                  <p className="leading-relaxed">
                    Over the years, the faculty has expanded its academic programs to include undergraduate, postgraduate, and doctoral programs across four specialized departments: Computer Science and Artificial Intelligence, Data Science, Information and Communication Technology, and Software Technology. This expansion reflects the evolving landscape of the computing industry and the need for specialized skills in various domains.
                  </p>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Research and Innovation
                  </h2>
                  <p className="leading-relaxed">
                    The Faculty of Computing has established itself as a center for research excellence, with faculty members and students contributing to groundbreaking research in areas such as artificial intelligence, machine learning, cybersecurity, data analytics, and software engineering. The faculty maintains strong partnerships with industry leaders and international academic institutions.
                  </p>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Present Day
                  </h2>
                  <p className="leading-relaxed">
                    Today, the Faculty of Computing stands as a beacon of excellence in computing education, producing graduates who are making significant contributions to the technology sector both in Nigeria and internationally. With state-of-the-art facilities, a distinguished faculty, and a comprehensive curriculum, the faculty continues to shape the future of computing in Africa and beyond.
                  </p>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Vision for the Future
                  </h2>
                  <p className="leading-relaxed">
                    Looking ahead, the Faculty of Computing is committed to remaining at the forefront of computing education and research. With plans to expand programs, enhance research capabilities, and strengthen industry partnerships, the faculty aims to continue producing world-class graduates who will drive technological innovation and development in Nigeria and across the globe.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>;
};
export default History;