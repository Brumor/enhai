'use client'
import React, { useEffect, useState } from 'react';
import { LiveProvider } from "react-live";
import styled from 'styled-components';
import { LiveCodePreview } from "../components/CodePreview";
import Markdown from 'react-markdown'
import { LoadingAnimation } from './LoadingAnimation';
import { themes } from "prism-react-renderer";
import { useCodeEditTheme, useCode } from './providers';
import { PromptField } from './PromptField';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
  padding: 24px;
`;

const TitleWrapper = styled.div`
  display: flex;  
  flex-direction: column;
  padding-bottom: 12px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px
`;

const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
`;


export const App = () => {
  const [userInput, setUserInput] = useState('');
  const [appLoading, setAppLoading] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    import('@nectary/components/standalone').then(() => setAppLoading(false))
  }, [])

  const [code, setCode] = useCode();
  const [theme] = useCodeEditTheme()

  const handleInputChange = (value: string) => {
    setUserInput(value);
  };

  if (appLoading) {
    return <LoadingAnimation />

  }

  return (
    <Container>
      <TitleWrapper>
        <sinch-title type="xl" level="1" text="Nectary Playground" />
        <sinch-title type="s" level="3" style={{ maxWidth: "80ch" }} text="Add your plain code to Nectarify, or simply prompt a composition (e.g., create a form with 3 input fields) to build it seamlessly with Nectary components." />
      </TitleWrapper>
      <FlexContainer>
        <PromptField setCode={setCode} setIsLoading={setIsLoading} isLoading={isLoading} />
        <Flex>
          {isLoading ? <LoadingAnimation /> : (
            <LiveProvider code={code} noInline scope={{ useState, useEffect }} theme={themes[theme]}>
              <LiveCodePreview />
            </LiveProvider>
          )}
        </Flex>
      </FlexContainer>
    </Container>
  );
};
