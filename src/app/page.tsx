"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

export default function BirthdayGift() {
  const [text, setText] = useState("")
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showContinue, setShowContinue] = useState(false)

  const dialogues = [
    "FRANCIIIIIIIIIIS!!!!!!",
    "So I've been making this for you since kanina lang (after work)",
    "and I just want to greet you...",
    "Merry Chr-             ay mali",
    "HAPPY BIRTHDAY!!! WOOO HOOOOO",
    "You've been nothing but a great friend to me",
    "and I just want to say that I appreciate you",
    "..and I hope you have a great day today",
    "and I hope you get to spend time with your minamahalz",
    "...           and I hope you get to eat a lot of cake ^_^",
    "I'm always here for you no matter what, and I hope you know that",
    "This is my first time making something like this for someone",
    "I'm doing this for you because you deserve it!",
    "Kahit na hindi tayo nagkikita, I want you to know that I care about you",
    "Sana magkita na tayo soon! Let's eat nang marami HAHAHAHA",
    "Wag naman natin paabutin sa graduation XD",
    "Anyway, I hope you like this...                   Maliligo muna ako LOL",
    "[end]",
  ]

  const typewriterEffect = (text: string, callback: () => void) => {
    let i = 0
    let currentText = ""
  
    setText("")
    setIsTyping(true)
    setShowContinue(false)
  
    const typing = setInterval(() => {
      if (i < text.length) {
        currentText += text.charAt(i)
        setText(currentText)
        i++
      } else {
        clearInterval(typing)
        setIsTyping(false)
        setShowContinue(true)
        callback()
      }
    }, 50)
  
    return () => clearInterval(typing)
  }
  

  const nextDialogue = () => {
    if (isTyping) {
      // do nothing
      return
    }

    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex((prev) => prev + 1)
    } else {
      // Restart from the beginning when reach the end
      setCurrentDialogueIndex(0)
    }
  }

  useEffect(() => {
    const cleanup = typewriterEffect(dialogues[currentDialogueIndex], () => {})
    return cleanup
  }, [currentDialogueIndex])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4 overflow-hidden">

      <div className="relative w-full max-w-3xl">


        {showContinue && (
            <motion.div
              className="absolute bottom-10 right-149 flex items-center text-sm text-amber-900/70 z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
            >
              Press to continue <ChevronRight size={16} />
            </motion.div>
          )}

        <div className="relative w-full">
          <Image src="dialogue_box.png" alt="Dialogue Box" width={900} height={300} className="w-full h-auto" />


          <div className="absolute top-0 left-5 w-[58%] h-full flex font-semibold items-center p-6">
            <div className="font-pixel text-2xl text-amber-900">
              {text}
              {isTyping && <span className="animate-pulse">▌</span>}
            </div>
          </div>

          <div className="absolute top-[9%] right-[9.5%] w-[23%] aspect-square">
            <div className="relative w-full h-full">
              <Image
                src="nikos.png"
                alt="Character Portrait"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>


          <div className="absolute bottom-[11%] right-[11%] w-[20%] text-center">
            <p className="font-pixel text-amber-900 text-lg font-bold">Nikos</p>
          </div>

        </div>

        <button
          onClick={nextDialogue}
          className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
          aria-label="Continue dialogue"
        />
      </div>

    </div>
  )
}
