import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.div
      className="flex items-center space-x-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <span className="text-sm text-muted-foreground">Theme</span>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        role="switch"
        aria-checked={theme === 'dark'}
        aria-label="Toggle theme"
      >
        <motion.span
          className="inline-block h-4 w-4 transform rounded-full bg-background shadow-lg transition-transform duration-300 flex items-center justify-center"
          animate={{
            x: theme === 'dark' ? 24 : 4,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {theme === 'dark' ? (
            <Moon className="h-3 w-3 text-foreground" />
          ) : (
            <Sun className="h-3 w-3 text-foreground" />
          )}
        </motion.span>
      </button>
    </motion.div>
  )
}