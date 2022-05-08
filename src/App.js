
import React, {useEffect, useState} from 'react';
import './output.css'
import Images from './images';



function App() {

    return (
      <div style={{height: window.innerHeight, width: window.innerWidth}} className="font-default">
        <header>

        </header>

        <main className='flex flex-col h-full justify-center items-center text-center'>
          <Images title={'tailwind'} classes={'h-28'} />
          <Images title={'react'} classes={'h-14'} />
        </main>

        <footer>

        </footer>
  
      </div>
    );
 

}

export default App;
