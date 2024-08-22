'use client'
import { type FC, type Element, useState } from "react";
import styled from "styled-components";
import { LiveEditor, LivePreview, LiveError, withLive } from "react-live";
import '@nectary/components/standalone'


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

type CodePreviewProps = {
  code: string;
  error: string;
  onError: () => void;
  onChange: () => void;
  element: Element;
}
const CodePreview: FC<CodePreviewProps> = ({ error, code }) => {
  return <MainWrapper>
    <EditorWrapper>
      <sinch-segment
        caption="Code preview"
      >
        <div slot="content">
          <LiveEditor />
        </div>
      </sinch-segment>
    </EditorWrapper>
    <PreviewWrapper>
      
      <sinch-segment
        caption="Live preview"
      >
        <div slot="content">
          <LivePreview />
          {code && <LiveError />}
        </div>
      </sinch-segment>
    </PreviewWrapper>
  </MainWrapper >;
};

export const LiveCodePreview = withLive(CodePreview)