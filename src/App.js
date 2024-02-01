import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import PageScroller from 'react-page-scroller';
import './page.css';
import { useMediaQuery } from 'react-responsive'

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 708px)'
  })

  console.log(isDesktopOrLaptop)
  let reconnectAttempts = useRef(0);
  const lines = [
    'When you want something, ',
    'all the universe conspires ',
    'Paulo Coelho',
    'Feed is that conspiracy:',
    'the conspiracy of trust.',
    'Trust is the single',
    'most important ingredient ',
    '',
    '',
    'missing from digital relationships.',
    'Boston Consulting Group ',
    'and the World Economic Forum ',
    'forecast the digital economy ',
    'to be worth between ',
    '1.5 and 2.5 trillion dollars',
    'by 2016.',
    '',
    '',
    'The difference ',
    'between those numbers ',
    'Feed is a digital mechanism of ',
    '',
    '',
  ];
  const containerRef = useRef();
  const contentRef = useRef();
  const handleBeforePageChange = num => {
    console.log(num)
    setCurrentPage(num);
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const init = () => {
    const divs = Array.from(containerRef.current.children);
    divs.forEach((div, index) => {
      div.style.transform = `translate(0%, ${index * 100 - reconnectAttempts.current}%)`;
      const distance = Math.abs(div.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
      // console.log(distance)
      const opacity = 1 - distance / 250
      div.style.opacity = opacity;
    });

  };
  const handleWheel = (event) => {
    const divs = Array.from(containerRef.current.children);
    if (isDesktopOrLaptop) {
      if (!(divs[0].getBoundingClientRect().top >= 365 && event.deltaY < 0) && currentPage === 0) {
        reconnectAttempts.current = reconnectAttempts.current + event.deltaY
        console.log(reconnectAttempts.current)
        setProgress(reconnectAttempts.current / 3500 * 100)
        if (reconnectAttempts.current > 3500) {
          // setCurrentPage(1)
          return
        }
        // else {
        //   setCurrentPage(1)
        // }
        divs.forEach((div, index) => {
          const distance = Math.abs(div.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
          div.style.transform = `translate(0%, ${index * 100 - reconnectAttempts.current}%)`;
          const opacity = 1 - distance / 250
          div.style.opacity = opacity;
        });
      } else {
        // reconnectAttempts.current = 0
        init()
      }
    } else {
      if (!(divs[0].getBoundingClientRect().top >= 365 && event.deltaY < 0) && currentPage === 0) {
        reconnectAttempts.current = reconnectAttempts.current + event.deltaY
        console.log(reconnectAttempts.current)
        setProgress(reconnectAttempts.current / 4900 * 100)
        if (reconnectAttempts.current > 4900) {
          // setCurrentPage(1)
          return
        }
        // else {
        //   setCurrentPage(1)
        // }
        divs.forEach((div, index) => {
          const distance = Math.abs(div.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top);
          div.style.transform = `translate(0%, ${index * 100 - reconnectAttempts.current}%)`;
          const opacity = 1 - distance / 250
          div.style.opacity = opacity;
        });
      } else {
        // reconnectAttempts.current = 0
        init()
      }
    }



    event.stopPropagation()
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        init()
      }
    }, 100);
    return () => clearTimeout(timer); // 清除定时器

  }, []);
  return (
    <div className="App">
      <PageScroller pageOnChange={handlePageChange} customPageNumber={currentPage} onBeforePageScroll={handleBeforePageChange}>
        <div className='page1 component'>
          <div className='progress-border'>
            <div className='progress-line' style={{ width: `${progress >= 0 ? progress : 0}%` }} ></div>
          </div>
          <div className='videobg-container'>
            <div className='video'>
              <video autoPlay loop muted id="background-video" src={'/video/intro.mp4'}>
                {/* <source  type="video/mp4"></source> */}
                {/* Your browser does not support the video tag. */}
              </video>
            </div>
            <div className='videobg-shadow'></div>
          </div>
          {isDesktopOrLaptop&&<div className='intro-paragraph' style={{opacity: reconnectAttempts.current > 250 ? '0': '1'}}>
            <p>
              Feed is an intelligent property rights and payments platform, using intelligent software and digital security that goes well beyond 'military-grade' to give users true ownership of their data and IP.
            </p>
            <p>
              Feed facilitates trusted exchanges of users' progressively-perfecting data assets with businesses, researchers, and governments in a
              <b>trusted</b>
              , audited, and independently verifiable manner; on their own terms and conditions.
            </p>
          </div>}
          
          <div className='content' ref={contentRef} onWheel={handleWheel} >
            <div className="my-div" ref={containerRef}>
              {lines.map((line, index) => (
                <div style={{ marginBottom: '10px', fontSize: isDesktopOrLaptop?'48px': '22px', top: `${index * 40}px` }} key={index}>
                  {line}
                </div>
              ))}
            </div>
          </div>
          <a href="#" className='scroll-down' onClick={() => {setCurrentPage(1)}}>
            <i className="icon"></i>
            <span>scroll down</span>
          </a>

        </div>
        <div className='page2 component'>
          {/* <div>第二页</div> */}
        </div>
      </PageScroller>
    </div>
  );
}

export default App;
