import Image from "next/image";
import gif from  "./assets/ezgif-6-4738b038d8.gif"

const jokes = [
  "Almost there—just adding a dash of nectar to sweeten the deal.",
  "Hold tight! We’re gathering nectar faster than a bee at an all-you-can-eat flower buffet.",
  "This page is bee-ing loaded, please wait a moment.",
  "Hold tight, bee-cause the page is almost ready.",
  "Don't worry, we're buzz-ily preparing your content.",
  "Buzzzzzz... we're working on it."
]

export const LoadingAnimation = () => {

  return (
    <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", height: "80vh", flexDirection: 'column' }}>
      <Image src={gif.src} alt={gif.src} height={120} width={120} />
      <sinch-text type="m">{jokes[Math.floor((Math.random() * jokes.length))]}</sinch-text>
    </div>
  )
}