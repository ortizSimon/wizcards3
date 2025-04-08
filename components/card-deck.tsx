"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type CardDeckProps = {
  type: "common" | "epic" | "legendary"
  title: string
  cardImages: string[]
}

export default function CardDeck({ type, title, cardImages }: CardDeckProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [focusedCard, setFocusedCard] = useState<number | null>(null)
  const [clickedCard, setClickedCard] = useState<number | null>(null)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>(
    [],
  )

  // Deck styles based on magical theme
  const deckStyles = {
    common: {
      bg: "bg-gradient-to-br from-blue-700 to-blue-900",
      border: "border-blue-400",
      glow: "0 0 15px rgba(96, 165, 250, 0.7)",
      innerGlow: "inset 0 0 20px rgba(96, 165, 250, 0.4)",
      text: "text-blue-200",
      symbol: "/cards/comun1.png",
      pattern: "bg-[url('/wizard-patterns/blue-pattern.png')]",
    },
    epic: {
      bg: "bg-gradient-to-br from-purple-700 to-purple-900",
      border: "border-purple-400",
      glow: "0 0 15px rgba(192, 132, 252, 0.7)",
      innerGlow: "inset 0 0 20px rgba(192, 132, 252, 0.4)",
      text: "text-purple-200",
      symbol: "/cards/Epico1.png",
      pattern: "bg-[url('/wizard-patterns/purple-pattern.png')]",
    },
    legendary: {
      bg: "bg-gradient-to-br from-amber-600 to-amber-900",
      border: "border-amber-400",
      glow: "0 0 15px rgba(251, 191, 36, 0.7)",
      innerGlow: "inset 0 0 20px rgba(251, 191, 36, 0.4)",
      text: "text-amber-200",
      symbol: "/cards/legendaria1.jpg",
      pattern: "bg-[url('/wizard-patterns/gold-pattern.png')]",
    },
  }

  const style = deckStyles[type]

  // Generate sparkle effect when hovered
  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setSparkles((current) => {
          // Add a new sparkle
          const newSparkle = {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 1.5 + 0.5,
          }

          // Remove old sparkles to prevent too many
          const updatedSparkles = [...current, newSparkle]
          if (updatedSparkles.length > 20) {
            return updatedSparkles.slice(updatedSparkles.length - 20)
          }
          return updatedSparkles
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      setSparkles([])
    }
  }, [isHovered])

  const handleClick = () => {
    setIsOpen(!isOpen)
    // Reset focused and clicked cards when closing the deck
    if (isOpen) {
      setFocusedCard(null)
      setClickedCard(null)
    }
  }

  const handleCardClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent closing the deck
    if (clickedCard === index) {
      // If clicking the already clicked card, unselect it
      setClickedCard(null)
    } else {
      // Otherwise, select this card
      setClickedCard(index)
    }
  }

  return (
    <div className="relative">
      {/* Deck */}
      <motion.div
        className={`relative w-64 h-96 rounded-xl border-2 ${style.bg} ${style.border} cursor-pointer overflow-hidden ${style.pattern} bg-blend-overlay bg-cover`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -10 : 0,
          boxShadow: isHovered ? style.glow : "none",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          boxShadow: isHovered ? style.glow : "none",
        }}
      >
        {/* Magical sparkles */}
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: sparkle.duration,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              setSparkles((current) => current.filter((s) => s.id !== sparkle.id))
            }}
          />
        ))}

        {/* Deck Cover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className={`text-2xl font-bold uppercase ${style.text} text-center mb-4 font-serif tracking-wider`}>
            {title}
          </div>

          <div className="w-24 h-24 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"></div>
            <Image
              src={style.symbol || `/placeholder.svg?height=60&width=60&text=${type}`}
              alt={`${type} symbol`}
              width={60}
              height={60}
              className="relative z-10"
            />

            {/* Magical glow effect */}
            <div className="absolute inset-0 rounded-full animate-pulse-slow" style={{ boxShadow: style.glow }}></div>
          </div>

          <div className={`text-sm ${style.text} mt-6 text-center font-serif italic`}>Presiona para ver la magia</div>

          {/* Decorative elements */}
          <div className="absolute bottom-4 left-4 w-12 h-12 opacity-30">
            <Image src="/wizard-decorations/rune1.png" alt="Magical rune" width={48} height={48} />
          </div>
          <div className="absolute top-4 right-4 w-12 h-12 opacity-30">
            <Image src="/wizard-decorations/rune2.png" alt="Magical rune" width={48} height={48} />
          </div>
        </div>

        {/* Card Stack Effect with magical glow */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute inset-0 rounded-xl border ${style.border}`}
              style={{
                transform: `translate(${i * 1}px, ${i * 1}px)`,
                zIndex: -i,
                opacity: 1 - i * 0.15,
                boxShadow: style.innerGlow,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Cards Spread Animation */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={(e) => {
              // Only close if clicking the background and no card is clicked
              if (clickedCard === null) {
                handleClick()
              } else {
                // If a card is clicked, just unselect it
                setClickedCard(null)
              }
            }}
          >
            {/* Magical circle */}
            <motion.div
              className="absolute w-[800px] h-[800px] rounded-full border-2 border-white/20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <div
                className="absolute inset-0 rounded-full border border-white/10"
                style={{ boxShadow: "inset 0 0 40px rgba(255, 255, 255, 0.1)" }}
              ></div>
            </motion.div>

            {/* Magical runes */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: 60,
                  height: 60,
                  transformOrigin: "center center",
                  rotate: i * 45,
                  translateX: 350,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
              >
                <Image src={`/wizard-decorations/rune${(i % 3) + 1}.png`} alt="Magical rune" width={60} height={60} />
              </motion.div>
            ))}

            <div className="relative w-full h-full">
              {/* Regular cards */}
              {cardImages.map((card, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${clickedCard === index ? "z-30" : "z-10"}`}
                  initial={{
                    x: "calc(50vw - 100px)",
                    y: "calc(50vh - 150px)",
                    rotate: 0,
                    scale: 0.1,
                    opacity: 0,
                  }}
                  animate={{
                    // If this card is clicked or hovered, center it and make it bigger
                    x:
                      clickedCard === index
                        ? "calc(50vw - 150px)"
                        : focusedCard === index
                          ? `calc(${30 + index * 10}vw - 120px)`
                          : `calc(${30 + index * 10}vw - 100px)`,
                    y:
                      clickedCard === index
                        ? "calc(50vh - 225px)"
                        : focusedCard === index
                          ? "calc(50vh - 180px)"
                          : "calc(50vh - 150px)",
                    rotate: clickedCard === index ? 0 : focusedCard === index ? (index - 2) * 2 : (index - 2) * 5,
                    scale: clickedCard === index ? 1.5 : focusedCard === index ? 1.2 : 1,
                    opacity: 1,
                    zIndex: clickedCard === index ? 30 : focusedCard === index ? 20 : 10,
                  }}
                  exit={{
                    x: "calc(50vw - 100px)",
                    y: "calc(50vh - 150px)",
                    rotate: 0,
                    scale: 0.1,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: clickedCard === index ? 0 : index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  onClick={(e) => handleCardClick(index, e)}
                  onMouseEnter={() => {
                    if (clickedCard === null) {
                      setFocusedCard(index)
                    }
                  }}
                  onMouseLeave={() => {
                    if (clickedCard === null) {
                      setFocusedCard(null)
                    }
                  }}
                >
                  {/* Magical glow behind card - stronger when focused/clicked */}
                  <motion.div
                    className="absolute inset-0 rounded-xl blur-md"
                    style={{
                      background:
                        type === "common"
                          ? "rgba(96, 165, 250, 0.5)"
                          : type === "epic"
                            ? "rgba(192, 132, 252, 0.5)"
                            : "rgba(251, 191, 36, 0.5)",
                      transform: "scale(1.05)",
                      opacity: 0,
                    }}
                    animate={{
                      opacity:
                        clickedCard === index
                          ? [0.5, 0.9, 0.7]
                          : focusedCard === index
                            ? [0.3, 0.8, 0.6]
                            : [0, 0.7, 0.5],
                      scale: clickedCard === index ? 1.1 : focusedCard === index ? 1.08 : 1.05,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`w-[200px] h-[300px] rounded-xl border-2 ${style.border} overflow-hidden cursor-pointer transition-transform`}
                    style={{
                      boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), ${
                        clickedCard === index
                          ? style.glow.replace("0.7", "1")
                          : focusedCard === index
                            ? style.glow.replace("0.7", "0.9")
                            : style.glow
                      }`,
                    }}
                  >
                    <Image
                      src={card || `/placeholder.svg?height=300&width=200&text=${type}+${index + 1}`}
                      alt={`${type} card ${index + 1}`}
                      width={200}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Magical particles around focused/clicked card */}
                  {(focusedCard === index || clickedCard === index) &&
                    [...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-white/70"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, (Math.random() - 0.5) * 50],
                          y: [0, (Math.random() - 0.5) * 50],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                </motion.div>
              ))}
            </div>

            {/* Return button - only show if no card is clicked */}
            <AnimatePresence>
              {clickedCard === null && (
                <motion.button
                  className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full font-serif text-lg ${
                    type === "common"
                      ? "bg-blue-700 text-blue-100 border-blue-400"
                      : type === "epic"
                        ? "bg-purple-700 text-purple-100 border-purple-400"
                        : "bg-amber-700 text-amber-100 border-amber-400"
                  } border-2 backdrop-blur-sm z-50`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClick()
                  }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  style={{
                    boxShadow:
                      type === "common"
                        ? "0 0 15px rgba(96, 165, 250, 0.7)"
                        : type === "epic"
                          ? "0 0 15px rgba(192, 132, 252, 0.7)"
                          : "0 0 15px rgba(251, 191, 36, 0.7)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      type === "common"
                        ? "0 0 20px rgba(96, 165, 250, 0.9)"
                        : type === "epic"
                          ? "0 0 20px rgba(192, 132, 252, 0.9)"
                          : "0 0 20px rgba(251, 191, 36, 0.9)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Volver
                  </div>

                  {/* Magical particles around button */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-white/70"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 30],
                        y: [0, (Math.random() - 0.5) * 30],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.button>
              )}
            </AnimatePresence>

            {/* Close button for clicked card view */}
            <AnimatePresence>
              {clickedCard !== null && (
                <motion.button
                  className={`fixed top-10 right-10 p-3 rounded-full ${
                    type === "common"
                      ? "bg-blue-700 text-blue-100 border-blue-400"
                      : type === "epic"
                        ? "bg-purple-700 text-purple-100 border-purple-400"
                        : "bg-amber-700 text-amber-100 border-amber-400"
                  } border-2 backdrop-blur-sm z-50`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setClickedCard(null)
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow:
                      type === "common"
                        ? "0 0 15px rgba(96, 165, 250, 0.7)"
                        : type === "epic"
                          ? "0 0 15px rgba(192, 132, 252, 0.7)"
                          : "0 0 15px rgba(251, 191, 36, 0.7)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow:
                      type === "common"
                        ? "0 0 20px rgba(96, 165, 250, 0.9)"
                        : type === "epic"
                          ? "0 0 20px rgba(192, 132, 252, 0.9)"
                          : "0 0 20px rgba(251, 191, 36, 0.9)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
