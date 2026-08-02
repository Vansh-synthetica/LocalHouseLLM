import p01 from '@/assets/papers/01_LocalHouseLLM_Highest-Impact_Optimization_Layers.pdf.asset.json';
import p02 from '@/assets/papers/02_LocalHouseLLM_The_Hidden_Layer.pdf.asset.json';
import p03 from '@/assets/papers/03_LocalHouseLLM_Historical_Evolution_GPU_Inference.pdf.asset.json';
import p04 from '@/assets/papers/04_LocalHouseLLM_KV_Cache_Optimization.pdf.asset.json';
import p05 from '@/assets/papers/05_LocalHouseLLM_Niche_Local_Acceleration_Techniques.pdf.asset.json';
import p06 from '@/assets/papers/06_LocalHouseLLM_Five-Layer_Execution_Stack.pdf.asset.json';
import master from '@/assets/papers/LocalHouseLLM_MASTER_REPORT.pdf.asset.json';

export type ArchiveCategory =
  | 'Modular AI'
  | 'Agentic Systems'
  | 'Runtime & Orchestration'
  | 'Local AI'
  | 'GPU & Inference Optimization'
  | 'Memory Systems'
  | 'Communication Protocols'
  | 'Reasoning'
  | 'Distributed Intelligence';

export type ArchiveEntry = {
  slug: string;
  title: string;
  series: 'LocalHouseLLM Research Collection' | 'SSRN Publication' | 'Technical Report';
  source: string;
  year: string;
  date: string;
  category: ArchiveCategory;
  tags: string[];
  abstract: string;
  /** Local PDF served from the site — enables in-browser reading. */
  pdfUrl?: string;
  /** External canonical source (SSRN, ResearchGate, etc.). */
  externalUrl?: string;
  pages?: number;
  readingMinutes?: number;
  featured?: boolean;
  reportNumber?: string;
};

/**
 * Single source of truth for the Archive.
 * To publish new work, append an entry here — no page changes required.
 */
export const archive: ArchiveEntry[] = [
  {
    slug: 'localhousellm-master-report',
    title: 'LocalHouseLLM Master Report: The Complete Local Inference Compendium',
    series: 'Technical Report',
    source: 'LocalHouseLLM Research',
    year: '2026',
    date: '2026-07-14',
    category: 'Local AI',
    tags: ['Local inference', 'Optimization', 'Systems', 'Compendium'],
    abstract:
      'A consolidated 49-page compendium of the LocalHouseLLM research programme on local AI inference — quantization, attention kernels, KV-cache systems, graph compilers, scheduling, and the five-layer execution stack. It unifies six technical reports into one reference for engineers building local-first, modular intelligence.',
    pdfUrl: master.url,
    pages: 49,
    readingMinutes: 95,
    featured: true,
    reportNumber: 'Master',
  },
  {
    slug: 'highest-impact-optimization-layers',
    title: 'The Highest-Impact Optimization Layers for Local AI Inference',
    series: 'LocalHouseLLM Research Collection',
    source: 'LocalHouseLLM Research',
    year: '2026',
    date: '2026-07-14',
    category: 'GPU & Inference Optimization',
    tags: ['Quantization', 'Attention kernels', 'Batching', 'Compilers'],
    abstract:
      'A survey of the optimization layers that matter most for low-latency, low-memory inference on local hardware: low-precision quantization (GPTQ, AWQ, SmoothQuant, AQLM, HQQ, BitNet), specialized attention kernels, graph compilers, prefix caching, continuous batching, chunked prefill, and speculative decoding.',
    pdfUrl: p01.url,
    pages: 7,
    readingMinutes: 18,
    reportNumber: '01',
  },
  {
    slug: 'the-hidden-layer',
    title: 'The Hidden Layer: Niche Techniques for Local LLM Inference',
    series: 'LocalHouseLLM Research Collection',
    source: 'LocalHouseLLM Research',
    year: '2026',
    date: '2026-07-14',
    category: 'Memory Systems',
    tags: ['KV eviction', 'Speculative decoding', 'Token pruning'],
    abstract:
      'Beyond the well-known optimizations lies a hidden layer of under-the-radar methods — HashEvict, Counter-Causal Surprise, LazyLLM, SpecDiff, Token Recycling, DecoQuant — that solve narrow bottlenecks with unusual approximations and hardware tricks, sometimes yielding 2x speedups or 90%+ KV compression.',
    pdfUrl: p02.url,
    pages: 7,
    readingMinutes: 17,
    reportNumber: '02',
  },
  {
    slug: 'historical-evolution-gpu-inference',
    title: 'Historical Evolution of GPU Inference Optimization',
    series: 'LocalHouseLLM Research Collection',
    source: 'LocalHouseLLM Research',
    year: '2026',
    date: '2026-07-14',
    category: 'GPU & Inference Optimization',
    tags: ['FlashAttention', 'vLLM', 'TensorRT-LLM', 'torch.compile'],
    abstract:
      'From naive cuBLAS/cuDNN transformer layers to FasterTransformer, FlashAttention 1–3, PagedAttention and continuous batching, overlap schedulers, and modern compiler stacks — a taxonomy of how GPU inference reached hardware limits, and what each generation actually changed.',
    pdfUrl: p03.url,
    pages: 8,
    readingMinutes: 20,
    reportNumber: '03',
  },
  {
    slug: 'kv-cache-optimization',
    title: 'KV Cache Optimization for Large Language Model Inference',
    series: 'LocalHouseLLM Research Collection',
    source: 'LocalHouseLLM Research',
    year: '2026',
    date: '2026-07-14',
    category: 'Memory Systems',
    tags: ['KV cache', 'Compression', 'Offloading', 'Long context'],
    abstract:
      'An exhaustive handbook on how KV caches are organized, compressed, quantized, evicted, prefetched, offloaded, and accelerated — the dominant memory bottleneck for long-context and multi-request inference on constrained devices.',
    pdfUrl: p04.url,
    pages: 8,
    readingMinutes: 21,
    reportNumber: '04',
  },
  {
    slug: 'niche-local-acceleration-techniques',
    title: 'Niche Techniques for Locally Accelerating Large Models',
    series: 'LocalHouseLLM Research Collection',
    source: 'LocalHouseLLM Research',
    year: '2026',
    date: '2026-07-14',
    category: 'Local AI',
    tags: ['1-bit weights', 'PagedAttention', 'Early exit', 'WebGPU'],
    abstract:
      'Emerging and experimental methods for local acceleration: radical quantization (OneBit, SpinQuant, QuaRot), speculative prefetching (SpeCache), KV distillation, self-speculative decoding (SWIFT, LayerSkip), and in-browser WebGPU inference reaching ~80% of native speed.',
    pdfUrl: p05.url,
    pages: 6,
    readingMinutes: 15,
    reportNumber: '05',
  },
  {
    slug: 'five-layer-execution-stack',
    title: 'AI Optimization for Local Inference: The Five-Layer Execution Stack',
    series: 'LocalHouseLLM Research Collection',
    source: 'LocalHouseLLM Research',
    year: '2026',
    date: '2026-07-14',
    category: 'Runtime & Orchestration',
    tags: ['Execution stack', 'Scheduling', 'Runtime', 'Throughput'],
    abstract:
      'A layered analysis of the local execution stack — model representation, kernels, runtime scheduling, memory management, and system integration — identifying where performance is actually won and how the layers must cooperate.',
    pdfUrl: p06.url,
    pages: 11,
    readingMinutes: 26,
    reportNumber: '06',
  },
  {
    slug: 'adaptive-modular-ai',
    title:
      'Adaptive Modular AI: A New Paradigm for Scalable, Safe, and Efficient Language Models',
    series: 'SSRN Publication',
    source: 'SSRN',
    year: '2026',
    date: '2026-01-15',
    category: 'Modular AI',
    tags: ['AMAI', 'Modularity', 'Safety', 'Scalability'],
    abstract:
      'Introduces AMAI — a modular architecture that replaces parameter bloat with composable expert modules, structured communication, and built-in verification.',
    externalUrl: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5695122',
    readingMinutes: 30,
  },
  {
    slug: 'shadow-amai',
    title: 'Shadow AMAI: An Architecture for Unconstrained Adaptive Modular Intelligence',
    series: 'SSRN Publication',
    source: 'SSRN',
    year: '2026',
    date: '2026-02-10',
    category: 'Distributed Intelligence',
    tags: ['Shadow execution', 'Exploration', 'Parallel hypotheses'],
    abstract:
      'Extends AMAI with a shadow execution layer that enables exploratory reasoning, parallel hypothesis generation, and safer experimentation.',
    externalUrl: 'https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=7748829',
    readingMinutes: 28,
  },
  {
    slug: 'cot-looping-systems',
    title: 'CoT Looping Systems, Continuous Hypothesis Propagation, and Predictability Ratios',
    series: 'SSRN Publication',
    source: 'SSRN',
    year: '2026',
    date: '2026-03-06',
    category: 'Reasoning',
    tags: ['Chain-of-thought', 'Hypotheses', 'Predictability'],
    abstract:
      'A framework for iterative chain-of-thought reasoning, where hypotheses are propagated, evaluated, and refined under measurable predictability constraints.',
    externalUrl: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6041794',
    readingMinutes: 26,
  },
  {
    slug: 'adapt-parallel-task-execution',
    title:
      'ADAPT: Adaptive Decomposition and Parallel Task Execution for Memory-Efficient Large Language Model Inference',
    series: 'SSRN Publication',
    source: 'SSRN',
    year: '2026',
    date: '2026-04-02',
    category: 'Agentic Systems',
    tags: ['Decomposition', 'Parallelism', 'Memory efficiency'],
    abstract:
      'Proposes a decomposition strategy that breaks inference into parallel sub-tasks, lowering memory overhead while preserving reasoning fidelity.',
    externalUrl: 'https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=7748829',
    readingMinutes: 24,
  },
];

export const getEntry = (slug: string) => archive.find((e) => e.slug === slug);

export const categories = Array.from(new Set(archive.map((e) => e.category))).sort();

export const repos = [
  {
    name: 'AICL',
    desc: 'Adaptive Inter-Module Communication Language — packets, routing, safety filters, module management.',
    url: 'https://github.com/LocalHouseLLM/AICL',
  },
  {
    name: 'Orcha',
    desc: 'Orchestration runtime for parallel expert execution, selection, retries, and coherent final answers.',
    url: 'https://github.com/LocalHouseLLM/orcha01',
  },
];
