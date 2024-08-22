"use client"
import { createContext, PropsWithChildren, useContext, useState } from "react"
import { themes } from "prism-react-renderer";

export type AvailableThemes = keyof typeof themes

const CodeEditTheme = createContext<[AvailableThemes, (v: AvailableThemes) => void] | null>(null)

export const useCodeEditTheme = () => {
  const context =  useContext(CodeEditTheme)
  if (!context) {
    throw "No context for code theme"
    
  }
  return context
}

export const CodeEditorThemeProvider  = ({ children }: PropsWithChildren<{}>)=> {

  const state = useState<AvailableThemes>("vsDark")

  return <CodeEditTheme.Provider value={state} >
    {children}
  </CodeEditTheme.Provider>
}