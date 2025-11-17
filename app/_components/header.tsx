"use client";

import {
  ListBulletIcon,
  MagnifyingGlassIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

const cards = [
  {
    name: "Technical Analysis",
    description:
      "Perform focused technical analysis and requirements discovery.",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Task Breakdown",
    description: "Break the problem into clear, prioritized, actionable tasks.",
    icon: ListBulletIcon,
  },
  {
    name: "Execution",
    description:
      "Execute the plan while monitoring progress and adjusting as needed.",
    icon: PlayIcon,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function Header() {
  return (
    <div className="relative isolate overflow-hidden pt-12 sm:pt-24 w-full">
      <div className="mx-auto max-w-7xl w-full">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl dark:text-white"
            variants={itemVariants}
          >
            Red Rover{" "}
            <span className="text-3xl sm:text-5xl inline-flex items-center mx-2 align-middle">
              ×
            </span>{" "}
            Jon Vunk
          </motion.h2>
          <motion.p
            className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-300"
            variants={itemVariants}
          >
            Solving problems through:
          </motion.p>
        </motion.div>
        <motion.div
          className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 sm:mt-12 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.name}
              className="flex gap-x-4 rounded-xl bg-white/30 p-6 ring-1 ring-gray-900/5 backdrop-blur-sm dark:bg-white/5 dark:inset-ring dark:inset-ring-white/5"
              variants={cardVariants}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              custom={index}
            >
              <card.icon
                aria-hidden="true"
                className="h-7 w-5 flex-none text-indigo-600 "
              />
              <div className="text-base/7">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {card.name}
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
