import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CleanLayout from '@/components/CleanLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

const products = [
  { to: '/anvira', name: 'Anvira', tag: 'Modular AI architecture', desc: 'The reference product line that ships the full LocalHouseLLM stack end-to-end. Available in personal, enterprise, and embedded editions.' },
  { to: '/nomi', name: 'Nomi', tag: 'Persona & memory infrastructure', desc: 'A user-owned identity and memory layer that travels across AI systems. Plug Nomi into any modular AI and your context comes with you.' },
  { to: '/inkflow', name: 'InkFlow', tag: 'Early access · Writing', desc: 'A focused AI writing assistant built on the modular stack — clarity, tone, and structure for everyday work.' },
  { to: '/devquill', name: 'DevQuill', tag: 'Early access · Developers', desc: 'A development environment tuned for building, testing, and shipping modular AI systems.' },
];

const Products = () => (
  <CleanLayout>
    <SEO
      title="Products — LocalHouseLLM"
      description="Products built on the LocalHouseLLM modular AI stack: Anvira (personal, enterprise, and embedded modular AI), Nomi (user-owned persona and memory), InkFlow (writing), DevQuill (developers)."
      canonical="https://localhousellm.lovable.app/products"
      keywords="LocalHouseLLM products, Anvira, Nomi, InkFlow, DevQuill, modular AI products, decentralized AI products"
      schema={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'LocalHouseLLM Products', url: 'https://localhousellm.com/products' }}
    />
    <Breadcrumbs items={[{ name: 'Products', to: '/products' }]} />

    <section className="pt-10 pb-16">
      <div className="max-container max-w-4xl">
        <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Products</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">
          Systems built on the stack.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Each product is a demonstration of what the LocalHouseLLM stack makes possible: composable, owned, and grounded AI — packaged for a specific audience.
        </p>
      </div>
    </section>

    <section className="border-t border-border/40 py-16 md:py-24">
      <div className="max-container">
        <div className="grid sm:grid-cols-2 gap-4">
          {products.map((p, i) => (
            <motion.div key={p.to} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.05, duration: 0.5 }}>
              <Link to={p.to} className="group block p-7 rounded-xl border border-border/40 hover:border-border transition-colors h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">{p.tag}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-border/40 py-20 md:py-28">
      <div className="max-container max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">Build your own.</h2>
        <p className="text-muted-foreground mb-8">The same stack that powers Anvira and Nomi is open infrastructure. The docs walk through how to compose your own product on top of it.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/docs"><Button className="bg-foreground text-background hover:bg-foreground/90 h-11 px-6">Read the docs <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          <Link to="/stack"><Button variant="outline" className="border-border bg-transparent h-11 px-6">Explore the stack</Button></Link>
        </div>
      </div>
    </section>
  </CleanLayout>
);

export default Products;
