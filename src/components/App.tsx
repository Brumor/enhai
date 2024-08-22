'use client'
import React, { useState } from 'react';
import { LiveProvider } from "react-live";
import styled from 'styled-components';
import { LiveCodePreview } from "../components/CodePreview";
import Markdown from 'react-markdown'
import "@nectary/components/button";
import '@nectary/components/input';
import '@nectary/components/title';
import '@nectary/components/spinner'
import { LoadingAnimation } from './LoadingAnimation';
import { themes } from "prism-react-renderer";
import { useCodeEditTheme, useCode } from './providers';


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
  const [responseData, setResponseData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [code, setCode] = useCode();
  const [theme] = useCodeEditTheme()

  const handleInputChange = (value: string) => {
    setUserInput(value);
  };

  const handleSendClick = () => {
    setIsLoading(true);
    const data = { question: userInput };
    fetch('/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        // Handle the response from the chatbot
        // setResponseData(responseData);
        setCode(responseData?.extractedCode || "")
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      }).finally(() => setIsLoading(false));
  };

  return (
    <Container>
      <TitleWrapper>
        <sinch-title type="xl" level="1" text="Nectary Playground" />
        <sinch-title type="s" level="3" style={{ maxWidth: "80ch" }} text="Add your plain code to Nectarify, or simply prompt a composition (e.g., create a form with 3 input fields) to build it seamlessly with Nectary components." />
      </TitleWrapper>
      <FlexContainer>
        <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
          <sinch-textarea aria-label="Input"
            placeholder="Enter your message"
            value={userInput}
            on-change={(e) => handleInputChange(e.detail ?? "")} style={{ width: "100%" }}>
            <sinch-button
              slot="bottom"
              type="primary"
              aria-label="Send"
              text="Send"
              on-click={handleSendClick}
              disabled={isLoading}
              style={{ marginLeft: 'auto' }}
            >
              {isLoading && <sinch-spinner slot="icon"></sinch-spinner>}
              <sinch-icon slot="right-icon" name="send" />
            </sinch-button>
          </sinch-textarea>

        </div>
        {/* <div>
          {responseData !== null && (
            <Markdown>
              {responseData.extractedOutput}
            </Markdown>
          )}
        </div> */}
        <Flex>
          {isLoading ? <LoadingAnimation /> : (
            <LiveProvider code={code} noInline scope={{ useState }} theme={themes[theme]}>
              <LiveCodePreview />
            </LiveProvider>
          )}
        </Flex>
      </FlexContainer>
    </Container>
  );
};
