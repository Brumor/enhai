'use client'
import { type FC, useState, useEffect, ComponentType } from "react";
import styled from "styled-components";
import { LiveEditor, LivePreview, LiveError, withLive, renderElementAsync } from "react-live";
import { CopyButton } from "./CopyButton";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useCode } from "./providers";


const BoxTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const PreviewButton = styled.button<{ active?: boolean }>`
  font-weight: 600;
  color: ${(props) => (props.active ? '#2563eb' : 'inherit')};
`;



const Logo = styled.img`
  height: 32px;
`;

const PreviewText = styled.span`
  font-weight: 600;
  font-size: 1.125rem;
`;

const Spacer = styled.span`
  margin-left: auto;
`;

const IconButton = styled.button`
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 8px;
`;

const MainWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const EditorWrapper = styled.div`
display: flex;
flex-direction: column;
flex: 1
`
const PreviewWrapper = styled.div`
display: flex;
flex-direction: column;
flex: 1
`

const ErrorWrapper = styled.div`
 pre{
   padding: 12px;
  background-color: #ffd8d6;
  border-radius: 8px;
  color: #1a2126;
 }
`;

export const LiveCodePreview: FC = () => {
  const [code, setCode] = useCode();
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
  }

  return (
  <MainWrapper>
    <EditorWrapper>
      <sinch-segment
        caption="Code preview - feel free to edit!"
      >
        <ThemeSwitcher />
        <CopyButton onClick={copyCodeToClipboard} />
        <div slot="content">
          <LiveEditor onChange={(code) => setCode(code)}  />
        </div>
      </sinch-segment>
    </EditorWrapper>
    <PreviewWrapper>

    <sinch-segment
      caption="Live preview"
    >
      <div slot="content">
        <LivePreview />
        {code && <ErrorWrapper><LiveError /></ErrorWrapper>}
      </div>
    </sinch-segment>
  </PreviewWrapper>
  </MainWrapper >
)
};