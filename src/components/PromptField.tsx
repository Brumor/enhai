import { useState } from "react";


export const PromptField = ({ setCode, setIsLoading, isLoading }: { setCode: (v: string) => void; setIsLoading: (v:boolean) => void; isLoading: boolean }) => {
  const [userInput, setUserInput] = useState('');

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

  const handleInputChange = (value: string) => {
    setUserInput(value);
  };

  return (
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
  )
}