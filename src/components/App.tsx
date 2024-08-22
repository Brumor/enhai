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
import gif from  "./ezgif-6-4738b038d8.gif"
import Image from "next/image";


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
        setResponseData(responseData);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      }).finally(() => setIsLoading(false));
  };

  return (
    <Container>
      <TitleWrapper>
        <sinch-title type="xl" level="1" text="Build my compositions" />
        <sinch-title type="m" level="2" text="Generate and preview composition made with Nectary components" />
      </TitleWrapper>
      <FlexContainer>
        <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
          <sinch-input aria-label="Input"
            placeholder="Enter your message"
            value={userInput}
            on-change={(e) => handleInputChange(e.detail ?? "")} />
          <sinch-button text="Send" type="primary" on-click={handleSendClick} disabled={isLoading} aria-label='Send'>
            {isLoading && <sinch-spinner slot="icon"></sinch-spinner>}
          </sinch-button>
            
        </div>
        {/* <div>
          {responseData !== null && (
            <Markdown>
              {responseData.extractedOutput}
            </Markdown>
          )}
        </div> */}
        <Flex>
          {isLoading ? <Image src={gif.src} alt={gif.src} height={120} width={120} /> : <LiveProvider code={responseData?.extractedCode} noInline scope={{ useState }}>
            <LiveCodePreview />
          </LiveProvider>}
        </Flex>
      </FlexContainer>
    </Container>
  );
};
