"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type DragEvent } from "react";

interface Props {
  id: string;
  title: string;
  handleDragStart: (event: DragEvent<HTMLLIElement>) => void;
}

export default function TaskCard({
  id,
  title,
  handleDragStart,
}: Readonly<Props>) {
  return (
    <AnimatePresence>
      <motion.div
        layout
        layoutId={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <li
          draggable
          onDragStart={handleDragStart}
          className="cursor-grab rounded bg-white px-4 py-2"
        >
          {title}
        </li>
      </motion.div>
    </AnimatePresence>
  );
}
