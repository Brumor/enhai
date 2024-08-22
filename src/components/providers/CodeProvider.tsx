"use client"
import { createContext, PropsWithChildren, useContext, useState } from "react"

const CodeContext = createContext<[string, (v: string) => void] | null>(null)

export const useCode = () => {
  const context = useContext(CodeContext)
  if (!context) {
    throw "No context for code theme"

  }
  return context
}

export const CodeProvider = ({ children }: PropsWithChildren<{}>) => {

  const state = useState<string>("")

  return <CodeContext.Provider value={state} >
    {children}
  </CodeContext.Provider>
}