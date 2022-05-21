import Key from "./keys";


function KeyBoard({handleLetters, results}) {
    
    const keys = 'q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,next,z,x,c,v,b,n,m,<<'
    const keyArr = keys.toUpperCase().split(',')
    const length = keyArr.length



    return (<div onClick={(e) => handleLetters(e)}
    className="w-full flex flex-wrap  justify-center items-center">
        {keyArr.map((data,index) => <Key key={index} data={data} index={index} length={length} results={results} />)}
    
    </div>)
}

export default KeyBoard