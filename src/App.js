import React, { useState, usePrevious, useEffect } from 'react'
import './App.scss'

const App = () => {
  const [messages, setMessages] = useState([
    { text: <p>
      Hi! My name is Kimo <br />
       Before we start, tell me your name.
    </p>, from: 'kimo' },
  ])
  const [userName, setUserName] = useState('')
  const [userProgress, setUserProgress] = useState(0)
  const [step, setStep] = useState(0)
  const [selectedSkills, setSelectedSkills] = useState([])
  const [kimoIsTyping, setKimoIsTyping] = useState(false)
  
  useEffect(() => {
        setTimeout(() => {  
         const inputName = document.getElementById("inputName")
         inputName.focus()
        }, 6005)
        let  mainContent = document.getElementById("main-content");
        mainContent.style.display = "none"
        setTimeout(() => {
          mainContent.style.display = "block"
        }, 4500)
        setTimeout(() => {
          nextStep()
        }, 6000)
    },[]);
  
  useEffect(() => {
     let btn = document.getElementById("nextStepBtn")
    
    
    if (step === 1 && userName || selectedSkills.length) {
      btn.disabled = false
    } else {
      btn.disabled = true
    }
  },[userName, selectedSkills, step]);
  
  const scrollBottom = () => window.scrollTo(0,document.body.scrollHeight)
  const nextStep = () => setStep(old => old + 1)
  

  const onNameChange = (event) => {
    setUserName(event.target.value)
  }
  
  const submitName = () => {
    nextStep()
    setKimoIsTyping(true)
    const newUserMessage = { text: userName, from: "user" }
    const newKimoMessage = { text: <p>Nice to meet you <strong>{userName}</strong>! 👋</p>, from: 'kimo' };
                            
                           
    
    setMessages(oldArray => [...oldArray, newUserMessage]);
    scrollBottom()
    
    
    setTimeout(() => {
      setMessages(oldArray => [...oldArray, newKimoMessage]);
      scrollBottom()
    }, 1000)
    
    setTimeout(() => {
      
      setMessages(oldArray => [...oldArray, { text: "As you may know, we focus on skills to thrive in a digital world. Is there any domain you'd like to study in particular?", from: 'kimo' }])
      scrollBottom()
    }, 2000)
    
    setTimeout(() => { 
      nextStep() 
      setKimoIsTyping(false) }, 4000)
    
    setUserProgress(old => old + 10)
  }
 
  return (
    <div className="container">
      <div className="splash">
        <div className="content">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.9998 7.99978C20.4178 7.99978 23.9998 11.5818 23.9998 15.9998C23.9998 20.4178 20.4178 23.9998 15.9998 23.9998C11.5818 23.9998 7.99981 20.4178 7.99981 15.9998C7.99981 11.5818 11.5818 7.99978 15.9998 7.99978ZM3.90081 22.9868C7.78781 29.7198 12.7088 31.9998 15.9998 31.9998C19.2918 31.9998 24.2118 29.7198 28.0998 22.9868C31.9868 16.2538 31.5008 10.8528 29.8548 8.00179C28.2098 5.15079 23.7748 2.02979 15.9998 2.02979C8.22581 2.02979 3.79081 5.15079 2.14481 8.00179C0.498809 10.8528 0.0138093 16.2538 3.90081 22.9868Z" fill="url(#paint0_linear)" fillOpacity="0.7"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M15.9998 24C11.5818 24 7.99981 20.418 7.99981 16C7.99981 11.582 11.5818 8 15.9998 8C20.4178 8 23.9998 11.582 23.9998 16C23.9998 20.418 20.4178 24 15.9998 24ZM28.0998 9.013C24.2118 2.28 19.2918 0 15.9998 0C12.7088 0 7.78781 2.28 3.90081 9.013C0.0138093 15.746 0.498809 21.147 2.14481 23.998C3.79081 26.849 8.22581 29.97 15.9998 29.97C23.7748 29.97 28.2098 26.849 29.8548 23.998C31.5008 21.147 31.9868 15.746 28.0998 9.013Z" fill="url(#paint1_linear)" fillOpacity="0.7"/>
                            
              <defs>
              <linearGradient id="paint0_linear" x1="31.0802" y1="2.02975" x2="0.919809" y2="2.02975" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00E9D4"/>
              <stop offset="1" stopColor="#5459E6"/>
              </linearGradient>
              <linearGradient id="paint1_linear" x1="0.919816" y1="29.97" x2="31.0802" y2="29.97" gradientUnits="userSpaceOnUse">
              <stop stop-color="#00E9D4"/>
              <stop offset="1" stopColor="#5459E6"/>
              </linearGradient>
              </defs>
            </svg>
          </div>
        
          <div className="text"><h1>Hello!</h1></div>
        </div>
      </div>
      
      <div id="main-content">
        {messages.map((message, idx) => (
          <div key={idx} className={message.from === 'kimo' ? 'kimoMessage message' : 'userMessage message'}>
            <p>{message.text}</p>
          </div>
        ))}

        
        {kimoIsTyping && <div className="kimoMessage message typing">
          <div className="circle">&nbsp;</div>
          <div className="circle">&nbsp;</div>
          <div className="circle">&nbsp;</div>
        </div>}
        
        {step === 1 && <div className="name">
            <input type="text" id="inputName" placeholder="Write your name" onChange={onNameChange} />
        </div>}
        
        {step === 3 && 
          <div>
            <p></p>
          </div>
        }
      </div>
      
      
      <footer>
        <div className="progress">
          <div className="bar" style={{
              width: `${userProgress}%` 
            }} />
        </div>
        
        <button onClick={submitName} className="primary" id="nextStepBtn">
          Next step
        </button>
      </footer>
      
    </div>
  )
}

export default App;