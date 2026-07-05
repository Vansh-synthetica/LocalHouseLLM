import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Cpu, Camera, Mic, Navigation, Radio, Hand, 
  Zap, Shield, Eye, Bot, Plane, ArrowRight, CheckCircle2
} from 'lucide-react';

const AnviraH1 = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const targetHardware = [
    { name: 'Nvidia Jetson Family', desc: 'Nano, Xavier, Orin — full support' },
    { name: 'Coral Edge TPU', desc: 'Optimized for Google Coral devices' },
    { name: 'Raspberry Pi 5', desc: 'Supported with performance caveats' },
    { name: 'ARM NPU Devices', desc: 'Custom ARM-based neural accelerators' },
  ];

  const sensors = [
    { icon: Camera, name: 'Camera' },
    { icon: Mic, name: 'Microphone' },
    { icon: Navigation, name: 'IMU' },
    { icon: Radio, name: 'LiDAR' },
    { icon: Zap, name: 'Proximity' },
    { icon: Hand, name: 'Touch' },
  ];

  const safetyTiers = [
    { level: 'Safety Core', desc: 'Frozen — critical safety constraints never change', status: 'locked' },
    { level: 'Perception', desc: 'Learning allowed — adapts to environment', status: 'learning' },
    { level: 'Skills', desc: 'Controlled updates — human approval required', status: 'controlled' },
  ];

  const learningSteps = ['collect', 'verify', 'train (LoRA)', 'canary', 'deploy'];

  const integrationExamples = [
    {
      title: 'Robot Pickup',
      flow: ['Vision', 'Grasping Specialist', 'Motion Planner', 'Safety Supervisor'],
      icon: Bot
    },
    {
      title: 'Drone Mapping',
      flow: ['Sensor Fusion', 'Local Mapping', 'Path Plan', 'Execution'],
      icon: Plane
    },
  ];

  return (
    <Layout>
      <SEO
        title="anvira h1 — embedded edition | LocalHouseLLM"
        description="anvira h1 is a compact, low-power on-device AI brain for robotics and embedded systems – optimized for real-time perception, planning and safe adaptation."
        keywords="anvira h1, embedded AI, robotics AI, edge AI, IoT AI, on-device AI, real-time AI, LocalHouseLLM"
        canonical="https://localhousellm.com/anvira/h1"
      />

      {/* Hero */}
      <section className="min-h-[70vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        
        <div className="max-container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <Link to="/anvira" className="text-primary text-sm hover:underline mb-4 inline-block">
              ← back to anvira
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">anvira h1</h1>
            <p className="text-xl text-muted-foreground mb-2">embedded edition</p>
            <p className="text-2xl font-medium mb-6">intelligence for the real world</p>
            
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              anvira h1 is a compact, low-power AI brain designed for robotics, automation systems, and embedded devices. optimized for edge deployment, h1 operates without internet, learns from real-world interactions, and supports real-time perception, planning, and adaptation. it brings on-device intelligence to robots, IoT systems, drones, and custom hardware — enabling autonomous behavior without cloud dependency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button 
                  size="lg"
                  className="group transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                  aria-label="Request hardware brief for anvira h1"
                >
                  request hardware brief
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="transition-all duration-300 hover:scale-[1.03]"
                  aria-label="Partner for integration"
                >
                  partner for integration
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target Hardware */}
      <section className="py-20 bg-secondary/30">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-4"
          >
            target hardware
          </motion.h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            optimized for leading edge compute platforms
          </p>
          
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {targetHardware.map((hw) => (
              <motion.div
                key={hw.name}
                variants={fadeInUp}
                className="glass rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Cpu className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{hw.name}</h3>
                <p className="text-sm text-muted-foreground">{hw.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Supported Sensors */}
      <section className="py-20">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            supported sensors
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            {sensors.map((sensor, i) => (
              <motion.div
                key={sensor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="glass rounded-xl p-6 text-center w-28 cursor-default"
                tabIndex={0}
                role="article"
                aria-label={sensor.name}
              >
                <sensor.icon className="w-8 h-8 text-primary mx-auto mb-2 transition-transform hover:animate-pulse" />
                <p className="text-sm font-medium">{sensor.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Control */}
      <section className="py-20 bg-secondary/30">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-4"
          >
            safety & control
          </motion.h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            tiered control with human-in-the-loop adaptation
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {safetyTiers.map((tier, i) => (
              <motion.div
                key={tier.level}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  {tier.status === 'locked' && <Shield className="w-5 h-5 text-red-500" />}
                  {tier.status === 'learning' && <Eye className="w-5 h-5 text-green-500" />}
                  {tier.status === 'controlled' && <CheckCircle2 className="w-5 h-5 text-yellow-500" />}
                  <h3 className="font-semibold">{tier.level}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{tier.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Learning Flow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 max-w-3xl mx-auto"
          >
            <p className="text-sm text-muted-foreground mb-4 text-center">on-device adaptation flow:</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {learningSteps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-2"
                >
                  <span className="px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                    {step}
                  </span>
                  {i < learningSteps.length - 1 && (
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="text-primary"
                    >
                      →
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="py-20">
        <div className="max-container">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            integration examples
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {integrationExamples.map((example, i) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <example.icon className="w-8 h-8 text-primary" />
                  <h3 className="text-lg font-semibold">{example.title}</h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {example.flow.map((step, j) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded bg-secondary text-sm">{step}</span>
                      {j < example.flow.length - 1 && <span className="text-muted-foreground">→</span>}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer & Partner Program */}
      <section className="py-20 bg-primary/5">
        <div className="max-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">anvira h1 partner program</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              we invite hardware partners and system integrators to join our partner program. 
              get early access, technical support, and co-development opportunities.
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                aria-label="Apply to anvira h1 partner program"
              >
                apply to partner program
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">ready to embed anvira h1?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button 
                size="lg"
                className="transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              >
                request hardware brief
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="transition-all duration-300 hover:scale-[1.03]"
              >
                partner for integration
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default AnviraH1;
